import { useState, useEffect } from 'react';
import { Activity, Heart, MessageCircle, Share2, Trophy, Star, Target, Users, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';

const SocialFeed = () => {
  const { isAuthenticated } = useStore();
  const [feedItems, setFeedItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      generateMockFeed();
    }
  }, [isAuthenticated]);

  const generateMockFeed = () => {
    const mockFeedItems = [
      {
        id: 1,
        type: 'skill_completed',
        user: {
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
          username: "sarah_dev"
        },
        content: {
          skill: "React Hooks Mastery",
          time: "2 hours ago",
          achievement: "First time completing this skill!"
        },
        likes: 12,
        comments: 3,
        shares: 1,
        isLiked: false,
        isShared: false
      },
      {
        id: 2,
        type: 'achievement_unlocked',
        user: {
          name: "Mike Rodriguez",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mike",
          username: "mike_pm"
        },
        content: {
          achievement: "Product Master",
          description: "Completed 10 product management skills",
          badge: "🏆",
          time: "4 hours ago"
        },
        likes: 28,
        comments: 7,
        shares: 4,
        isLiked: true,
        isShared: false
      },
      {
        id: 3,
        type: 'skill_created',
        user: {
          name: "Emma Thompson",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma",
          username: "emma_design"
        },
        content: {
          skill: "Advanced Figma Prototyping",
          description: "Just published a comprehensive guide on advanced Figma prototyping techniques!",
          time: "6 hours ago",
          views: 45,
          upvotes: 18
        },
        likes: 15,
        comments: 5,
        shares: 2,
        isLiked: false,
        isShared: false
      },
      {
        id: 4,
        type: 'learning_streak',
        user: {
          name: "David Kim",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=David",
          username: "david_data"
        },
        content: {
          streak: 7,
          message: "7-day learning streak! 🚀",
          time: "1 day ago",
          skillsCompleted: ["Python Basics", "Data Cleaning", "SQL Fundamentals"]
        },
        likes: 34,
        comments: 12,
        shares: 8,
        isLiked: true,
        isShared: true
      },
      {
        id: 5,
        type: 'challenge_completed',
        user: {
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
          username: "alex_learner"
        },
        content: {
          challenge: "30-Day JavaScript Challenge",
          completion: "Completed all 30 days!",
          time: "2 days ago",
          finalScore: 95
        },
        likes: 42,
        comments: 15,
        shares: 6,
        isLiked: false,
        isShared: false
      },
      {
        id: 6,
        type: 'mentorship_started',
        user: {
          name: "Lisa Wang",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
          username: "lisa_mentor"
        },
        content: {
          mentee: "Tom Wilson",
          skill: "React Development",
          message: "Started mentoring Tom in React development. Excited to help him grow!",
          time: "3 days ago"
        },
        likes: 8,
        comments: 2,
        shares: 1,
        isLiked: false,
        isShared: false
      }
    ];

    setFeedItems(mockFeedItems);
  };

  const handleLike = (itemId) => {
    setFeedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            isLiked: !item.isLiked 
          }
        : item
    ));
  };

  const handleShare = (itemId) => {
    setFeedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            shares: item.isShared ? item.shares - 1 : item.shares + 1,
            isShared: !item.isShared 
          }
        : item
    ));
  };

  const getFilteredItems = () => {
    if (selectedFilter === 'all') return feedItems;
    return feedItems.filter(item => item.type === selectedFilter);
  };

  const FeedItem = ({ item }) => {
    const renderContent = () => {
      switch (item.type) {
        case 'skill_completed':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> completed{' '}
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    {item.content.skill}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.achievement}
                </p>
              </div>
            </div>
          );

        case 'achievement_unlocked':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> unlocked{' '}
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">
                    {item.content.achievement}
                  </span>
                  <span className="ml-1">{item.content.badge}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.description}
                </p>
              </div>
            </div>
          );

        case 'skill_created':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> created{' '}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {item.content.skill}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.content.views} views</span>
                  <span>{item.content.upvotes} upvotes</span>
                </div>
              </div>
            </div>
          );

        case 'learning_streak':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> achieved a{' '}
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {item.content.streak}-day learning streak!
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.message}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.content.skillsCompleted.map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'challenge_completed':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> completed{' '}
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    {item.content.challenge}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.completion} - Final score: {item.content.finalScore}%
                </p>
              </div>
            </div>
          );

        case 'mentorship_started':
          return (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{item.user.name}</span> started mentoring{' '}
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {item.content.mentee}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content.message}
                </p>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="card">
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={item.user.avatar}
            alt={item.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.user.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                @{item.user.username}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {item.content.time}
              </span>
            </div>
            {renderContent()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleLike(item.id)}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                item.isLiked
                  ? 'text-red-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
              <span>{item.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span>{item.comments}</span>
            </button>
            <button
              onClick={() => handleShare(item.id)}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                item.isShared
                  ? 'text-green-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-green-500'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{item.shares}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Social Feed</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to view the social feed</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Social Feed</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
          Stay connected with your learning community and celebrate achievements together
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg min-w-max">
          {[
            { key: 'all', label: 'All Activity' },
            { key: 'skill_completed', label: 'Skills Completed' },
            { key: 'achievement_unlocked', label: 'Achievements' },
            { key: 'skill_created', label: 'New Skills' },
            { key: 'learning_streak', label: 'Learning Streaks' },
            { key: 'challenge_completed', label: 'Challenges' }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedFilter === filter.key
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-4 sm:space-y-6">
        {getFilteredItems().map(item => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>

      {getFilteredItems().length === 0 && (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No activity to show</p>
        </div>
      )}
    </div>
  );
};

export default SocialFeed; 