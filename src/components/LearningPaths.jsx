import { useState, useEffect } from 'react';
import { Map, Target, Clock, TrendingUp, ArrowRight, CheckCircle, Play, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';

const LearningPaths = () => {
  const { completedSkills, isAuthenticated } = useStore();
  const [selectedPath, setSelectedPath] = useState(null);
  const [learningPaths, setLearningPaths] = useState([]);
  const [userGoals, setUserGoals] = useState([]);

  useEffect(() => {
    const generateLearningPaths = () => {
      // Generate learning paths based on user interests
      const paths = [
        {
          id: 1,
          title: "Frontend Development Mastery",
          description: "Complete path from beginner to advanced frontend developer",
          difficulty: "Beginner to Advanced",
          estimatedTime: "12 weeks",
          skills: [
            { id: 1, title: "HTML Basics", time: "2 weeks", difficulty: "Beginner", completed: false },
            { id: 2, title: "CSS Fundamentals", time: "3 weeks", difficulty: "Beginner", completed: false },
            { id: 3, title: "JavaScript Essentials", time: "4 weeks", difficulty: "Intermediate", completed: false },
            { id: 4, title: "React Introduction", time: "3 weeks", difficulty: "Intermediate", completed: false }
          ],
          progress: 25
        },
        {
          id: 2,
          title: "Data Science Fundamentals",
          description: "Learn the basics of data analysis and visualization",
          difficulty: "Intermediate",
          estimatedTime: "8 weeks",
          skills: [
            { id: 5, title: "Python Basics", time: "2 weeks", difficulty: "Beginner", completed: false },
            { id: 6, title: "Data Analysis", time: "3 weeks", difficulty: "Intermediate", completed: false },
            { id: 7, title: "Data Visualization", time: "3 weeks", difficulty: "Intermediate", completed: false }
          ],
          progress: 0
        }
      ];
      setLearningPaths(paths);
      setUserGoals([
        { id: 1, title: "Master React", progress: 40, target: 100, deadline: "2024-03-01" },
        { id: 2, title: "Complete 5 Skills", progress: 2, target: 5, deadline: "2024-02-15" },
        { id: 3, title: "Learn Python", progress: 0, target: 100, deadline: "2024-04-01" }
      ]);
    };

    if (isAuthenticated) {
      generateLearningPaths();
    }
  }, [isAuthenticated, completedSkills]);











  const PathCard = ({ path }) => (
    <div className="card cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setSelectedPath(path)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{path.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{path.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`badge ${path.difficulty === 'Beginner' ? 'badge-primary' : path.difficulty === 'Intermediate' ? 'badge-secondary' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'}`}>
            {path.difficulty}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{path.estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{path.skills.length} skills</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${path.progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{path.progress}%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {path.skills.slice(0, 3).map((skill, index) => (
          <span key={skill.id} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
            {skill.title}
          </span>
        ))}
      </div>
    </div>
  );

  const PathDetail = ({ path, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{path.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{path.description}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {path.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  {skill.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{skill.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.time}</span>
                    <span className={`text-xs px-2 py-1 rounded ${skill.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' : skill.difficulty === 'Intermediate' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'}`}>
                      {skill.difficulty}
                    </span>
                  </div>
                </div>
                <button className="btn-primary text-sm px-4 py-2">
                  {skill.completed ? 'Review' : 'Start'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{path.progress}% Complete</p>
              </div>
              <button className="btn-primary">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GoalCard = ({ goal }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{goal.title}</h4>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {goal.progress}/{goal.target}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Learning Paths</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to view personalized learning paths</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learning Paths</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          AI-powered learning sequences tailored to your interests and goals
        </p>
      </div>

      {/* User Goals */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Learning Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userGoals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recommended Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </div>

      {/* Path Detail Modal */}
      {selectedPath && (
        <PathDetail path={selectedPath} onClose={() => setSelectedPath(null)} />
      )}
    </div>
  );
};

export default LearningPaths; 