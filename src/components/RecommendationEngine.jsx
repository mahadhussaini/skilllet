import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Target } from 'lucide-react';
import useStore from '../store/useStore';
import SkillCard from './SkillCard';

const RecommendationEngine = () => {
  const { skills, completedSkills, isAuthenticated } = useStore();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateRecommendations = () => {
      setIsLoading(true);
      // Mock recommendations
      const mockRecommendations = skills.slice(0, 3).map(skill => ({
        ...skill,
        reason: "Based on your interests"
      }));
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };

    if (isAuthenticated) {
      generateRecommendations();
    }
  }, [isAuthenticated, completedSkills, skills]);



  const analyzeUserInterests = () => {
    const completedSkillsData = skills.filter(skill => 
      completedSkills.includes(skill.id)
    );

    // Analyze user preferences based on completed skills
    const categoryPreferences = {};
    const tagPreferences = {};
    const timePreferences = [];

    completedSkillsData.forEach(skill => {
      // Category analysis
      categoryPreferences[skill.category] = (categoryPreferences[skill.category] || 0) + 1;
      
      // Tag analysis
      skill.tags.forEach(tag => {
        tagPreferences[tag] = (tagPreferences[tag] || 0) + 1;
      });
      
      // Time preference analysis
      timePreferences.push(skill.estimatedTime);
    });

    return {
      categories: categoryPreferences,
      tags: tagPreferences,
      avgTime: timePreferences.length > 0 ? 
        timePreferences.reduce((a, b) => a + b, 0) / timePreferences.length : 5
    };
  };



  const getRecommendationReason = (skill) => {
    const completedSkillsData = skills.filter(s => completedSkills.includes(s.id));
    const userCategories = [...new Set(completedSkillsData.map(s => s.category))];
    const userTags = [...new Set(completedSkillsData.flatMap(s => s.tags))];
    
    if (userCategories.includes(skill.category)) {
      return `Based on your interest in ${skill.category}`;
    }
    
    const matchingTags = skill.tags.filter(tag => userTags.includes(tag));
    if (matchingTags.length > 0) {
      return `Similar to your ${matchingTags[0]} skills`;
    }
    
    return 'Popular in the community';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Recommended for You
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI-powered suggestions based on your learning history
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skill-card animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((skill, index) => (
              <div key={skill.id} className="relative">
                <SkillCard skill={skill} />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                  #{index + 1} Match
                </div>
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {getRecommendationReason(skill)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {recommendations.length === 0 && (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Complete more skills to get personalized recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI learns from your preferences to suggest relevant skills
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recommendation Stats */}
      {!isLoading && recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Learning Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Preferred Categories
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {Object.keys(analyzeUserInterests().categories).slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Average Time
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {Math.round(analyzeUserInterests().avgTime)} minutes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Skills Completed
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {completedSkills.length} skills
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine; 