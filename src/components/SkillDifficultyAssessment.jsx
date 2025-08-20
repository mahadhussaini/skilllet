import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Users, Star, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import useStore from '../store/useStore';

const SkillDifficultyAssessment = () => {
  const { skills, isAuthenticated } = useStore();
  const [userVotes, setUserVotes] = useState({});
  const [difficultyData, setDifficultyData] = useState([]);

  useEffect(() => {
    const generateDifficultyData = () => {
      // Mock difficulty data
      const mockData = skills.map(skill => ({
        ...skill,
        difficultyVotes: { 'Very Easy': 5, 'Easy': 10, 'Medium': 15, 'Hard': 8, 'Very Hard': 3 },
        timeVotes: { 'Under 5 min': 8, '5-10 min': 12, '10-15 min': 10, '15-20 min': 5, 'Over 20 min': 2 },
        totalVotes: 41,
        lastUpdated: new Date().toISOString(),
        comments: Array.isArray(skill.comments) ? skill.comments : [
          {
            id: 1,
            user: "John Doe",
            difficulty: "Medium",
            timeEstimate: "5-10 min",
            comment: "Great skill! Found it challenging but manageable."
          },
          {
            id: 2,
            user: "Jane Smith",
            difficulty: "Easy",
            timeEstimate: "Under 5 min",
            comment: "Perfect for beginners, well explained."
          }
        ]
      }));
      setDifficultyData(mockData);
    };

    if (isAuthenticated) {
      generateDifficultyData();
    }
  }, [isAuthenticated, skills]);





  const calculateAverageDifficulty = (difficultyVotes) => {
    const weights = {
      'Very Easy': 1,
      'Easy': 2,
      'Medium': 3,
      'Hard': 4,
      'Very Hard': 5
    };

    let totalWeight = 0;
    let totalVotes = 0;

    Object.entries(difficultyVotes).forEach(([difficulty, votes]) => {
      totalWeight += weights[difficulty] * votes;
      totalVotes += votes;
    });

    const average = totalWeight / totalVotes;
    
    if (average <= 1.5) return 'Very Easy';
    if (average <= 2.5) return 'Easy';
    if (average <= 3.5) return 'Medium';
    if (average <= 4.5) return 'Hard';
    return 'Very Hard';
  };

  const calculateAverageTime = (timeVotes) => {
    const weights = {
      'Under 5 min': 2.5,
      '5-10 min': 7.5,
      '10-15 min': 12.5,
      '15-20 min': 17.5,
      'Over 20 min': 25
    };

    let totalWeight = 0;
    let totalVotes = 0;

    Object.entries(timeVotes).forEach(([timeRange, votes]) => {
      totalWeight += weights[timeRange] * votes;
      totalVotes += votes;
    });

    const averageMinutes = totalWeight / totalVotes;
    
    if (averageMinutes <= 5) return 'Under 5 min';
    if (averageMinutes <= 10) return '5-10 min';
    if (averageMinutes <= 15) return '10-15 min';
    if (averageMinutes <= 20) return '15-20 min';
    return 'Over 20 min';
  };

  const handleVote = (skillId, type, value) => {
    if (!isAuthenticated) return;

    setUserVotes(prev => ({
      ...prev,
      [skillId]: {
        ...prev[skillId],
        [type]: value
      }
    }));

    // Update the difficulty data
    setDifficultyData(prev => prev.map(skill => {
      if (skill.id === skillId) {
        const newSkill = { ...skill };
        
        if (type === 'difficulty') {
          newSkill.difficultyVotes[value]++;
          newSkill.totalVotes++;
        } else if (type === 'time') {
          newSkill.timeVotes[value]++;
          newSkill.totalVotes++;
        }
        
        return newSkill;
      }
      return skill;
    }));
  };

  const DifficultyCard = ({ skill }) => {
    const avgDifficulty = calculateAverageDifficulty(skill.difficultyVotes);
    const avgTime = calculateAverageTime(skill.timeVotes);
    const userVote = userVotes[skill.id];

    return (
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{skill.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="badge badge-primary">{avgDifficulty}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{avgTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Difficulty Voting */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Difficulty Level</h4>
            <div className="space-y-2">
              {Object.entries(skill.difficultyVotes).map(([difficulty, votes]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <button
                    onClick={() => handleVote(skill.id, 'difficulty', difficulty)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      userVote?.difficulty === difficulty
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{difficulty}</span>
                    <span className="text-gray-500 dark:text-gray-400">({votes})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Time Estimation Voting */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Time Estimate</h4>
            <div className="space-y-2">
              {Object.entries(skill.timeVotes).map(([timeRange, votes]) => (
                <div key={timeRange} className="flex items-center justify-between">
                  <button
                    onClick={() => handleVote(skill.id, 'time', timeRange)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      userVote?.time === timeRange
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{timeRange}</span>
                    <span className="text-gray-500 dark:text-gray-400">({votes})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Feedback */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Community Feedback</h4>
          <div className="space-y-3">
            {Array.isArray(skill.comments) && skill.comments.slice(0, 2).map(comment => (
              <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{comment.user}</span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{comment.difficulty}</span>
                    <span>•</span>
                    <span>{comment.timeEstimate}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{comment.comment}</p>
              </div>
            ))}
            {(!Array.isArray(skill.comments) || skill.comments.length === 0) && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No community feedback yet</p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{skill.totalVotes} total votes</span>
            <span>Last updated: {new Date(skill.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  };

  const DifficultyStats = () => {
    const totalSkills = Array.isArray(difficultyData) ? difficultyData.length : 0;
    const difficultyDistribution = {
      'Very Easy': 0,
      'Easy': 0,
      'Medium': 0,
      'Hard': 0,
      'Very Hard': 0
    };

    if (Array.isArray(difficultyData)) {
      difficultyData.forEach(skill => {
        const avgDifficulty = calculateAverageDifficulty(skill.difficultyVotes);
        difficultyDistribution[avgDifficulty]++;
      });
    }

    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Difficulty Distribution</h3>
        <div className="space-y-3">
          {Object.entries(difficultyDistribution).map(([difficulty, count]) => (
            <div key={difficulty} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{difficulty}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${(count / totalSkills) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Skill Difficulty Assessment</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to participate in difficulty assessments</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Skill Difficulty Assessment</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Help improve skill accuracy by voting on difficulty levels and time estimates
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{difficultyData.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <ThumbsUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Array.isArray(difficultyData) ? difficultyData.reduce((sum, skill) => sum + skill.totalVotes, 0) : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Community Feedback</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Array.isArray(difficultyData) ? difficultyData.reduce((sum, skill) => sum + (Array.isArray(skill.comments) ? skill.comments.length : 0), 0) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Distribution */}
      <DifficultyStats />

      {/* Skills for Assessment */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Skills Needing Assessment</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.isArray(difficultyData) && difficultyData.slice(0, 6).map(skill => (
            <DifficultyCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDifficultyAssessment; 