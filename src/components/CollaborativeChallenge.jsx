import { useState } from 'react';
import { Users, Plus, CheckCircle, Clock, Trophy, MessageCircle } from 'lucide-react';
import useStore from '../store/useStore';

const CollaborativeChallenge = () => {
  const { currentUser, isAuthenticated } = useStore();

  const [newStep, setNewStep] = useState('');

  // Mock collaborative challenges
  const challenges = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Build a full-stack web application from scratch",
      category: "Tech",
      participants: 12,
      steps: [
        { id: 1, title: "HTML Basics", author: "WebDevPro", completed: true, votes: 8 },
        { id: 2, title: "CSS Styling", author: "StyleMaster", completed: true, votes: 12 },
        { id: 3, title: "JavaScript Fundamentals", author: "CodeNinja", completed: false, votes: 15 },
        { id: 4, title: "React Components", author: "ReactGuru", completed: false, votes: 9 },
        { id: 5, title: "Backend API", author: "BackendDev", completed: false, votes: 7 }
      ],
      progress: 40,
      deadline: "2024-02-15",
      rewards: ["Web Developer Badge", "500 Points", "Featured Profile"]
    },
    {
      id: 2,
      title: "Master Photography Fundamentals",
      description: "Learn essential photography techniques and composition",
      category: "Creative",
      participants: 8,
      steps: [
        { id: 1, title: "Camera Settings", author: "PhotoPro", completed: true, votes: 10 },
        { id: 2, title: "Composition Rules", author: "ArtMaster", completed: true, votes: 14 },
        { id: 3, title: "Lighting Techniques", author: "LightGuru", completed: false, votes: 11 },
        { id: 4, title: "Post-Processing", author: "EditPro", completed: false, votes: 6 }
      ],
      progress: 50,
      deadline: "2024-02-20",
      rewards: ["Photography Expert Badge", "300 Points", "Portfolio Showcase"]
    }
  ];

  const handleAddStep = (challengeId) => {
    if (!newStep.trim()) return;
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      const newStepObj = {
        id: challenge.steps.length + 1,
        title: newStep,
        author: currentUser?.username || "Anonymous",
        completed: false,
        votes: 0
      };
      
      challenge.steps.push(newStepObj);
      setNewStep('');
    }
  };

  const handleVoteStep = (challengeId, stepId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      const step = challenge.steps.find(s => s.id === stepId);
      if (step) {
        step.votes += 1;
      }
    }
  };

  const handleCompleteStep = (challengeId, stepId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      const step = challenge.steps.find(s => s.id === stepId);
      if (step) {
        step.completed = !step.completed;
        
        // Recalculate progress
        const completedSteps = challenge.steps.filter(s => s.completed).length;
        challenge.progress = Math.round((completedSteps / challenge.steps.length) * 100);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Join collaborative challenges
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to participate in community skill challenges
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Collaborative Challenges
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Work together with the community to master complex skills
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="card">
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`badge ${
                    challenge.category === 'Tech' ? 'badge-primary' : 'badge-secondary'
                  }`}>
                    {challenge.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.participants} participants
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {challenge.description}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {challenge.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Steps</h4>
              {challenge.steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    step.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleCompleteStep(challenge.id, step.id)}
                      className={`p-1 rounded-full transition-colors ${
                        step.completed 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      <CheckCircle size={16} fill={step.completed ? 'currentColor' : 'none'} />
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${
                        step.completed 
                          ? 'text-green-800 dark:text-green-200 line-through' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {step.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleVoteStep(challenge.id, step.id)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Trophy size={12} />
                      <span>{step.votes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Step */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="Add a new step..."
                className="input-field flex-1 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStep(challenge.id)}
              />
              <button
                onClick={() => handleAddStep(challenge.id)}
                className="btn-primary text-sm px-3 py-2"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Challenge Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>Due {new Date(challenge.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={14} />
                  <span>{challenge.steps.length} steps</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rewards:</p>
                <div className="flex flex-wrap gap-1">
                  {challenge.rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Challenge */}
      <div className="card text-center">
        <div className="p-6">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Create a New Challenge
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start a collaborative learning journey with the community
          </p>
          <button className="btn-primary">
            <Plus size={16} className="mr-2" />
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeChallenge; 