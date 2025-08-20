import { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Star } from 'lucide-react';
import useStore from '../store/useStore';

const Leaderboard = () => {
  const { skills } = useStore();
  const [activeTab, setActiveTab] = useState('contributors');

  // Calculate contributor stats
  const contributorStats = skills.reduce((acc, skill) => {
    if (!acc[skill.author]) {
      acc[skill.author] = {
        username: skill.author,
        skillsCreated: 0,
        totalUpvotes: 0,
        totalViews: 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.author)}&background=3b82f6&color=fff`
      };
    }
    acc[skill.author].skillsCreated += 1;
    acc[skill.author].totalUpvotes += skill.upvotes;
    acc[skill.author].totalViews += skill.views;
    return acc;
  }, {});

  const topContributors = Object.values(contributorStats)
    .sort((a, b) => b.totalUpvotes - a.totalUpvotes)
    .slice(0, 10);

  const topSkills = [...skills]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 10);

  const trendingSkills = [...skills]
    .sort((a, b) => (b.upvotes + b.views * 0.1) - (a.upvotes + a.views * 0.1))
    .slice(0, 10);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-orange-500" size={20} />;
      default:
        return <span className="text-gray-500 font-bold text-sm">#{rank}</span>;
    }
  };

  const getBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-gray-100 text-gray-800';
      case 3:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const tabs = [
    { id: 'contributors', label: 'Top Contributors', icon: Users },
    { id: 'skills', label: 'Most Popular Skills', icon: Star },
    { id: 'trending', label: 'Trending Now', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-2">
          Celebrating our top contributors and most popular skills
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 mb-3">
            <Users size={24} className="text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{Object.keys(contributorStats).length}</div>
          <div className="text-sm text-gray-600">Active Contributors</div>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-3">
            <Star size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{skills.length}</div>
          <div className="text-sm text-gray-600">Total Skills</div>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mb-3">
            <Trophy size={24} className="text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {skills.reduce((sum, skill) => sum + skill.upvotes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Upvotes</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'contributors' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Contributors</h3>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div
                  key={contributor.username}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900">{contributor.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{contributor.skillsCreated} skills</span>
                      <span>{contributor.totalUpvotes} upvotes</span>
                      <span>{contributor.totalViews} views</span>
                    </div>
                  </div>
                  <div className={`badge ${getBadgeColor(index + 1)}`}>
                    Rank #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Popular Skills</h3>
            <div className="space-y-4">
              {topSkills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <img
                    src={skill.thumbnail}
                    alt={skill.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 line-clamp-1">{skill.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {skill.author}</span>
                      <span>{skill.upvotes} upvotes</span>
                      <span>{skill.views} views</span>
                      <span>{skill.estimatedTime} min</span>
                    </div>
                  </div>
                  <div className={`badge ${skill.category === 'Tech' ? 'badge-primary' : 'badge-secondary'}`}>
                    {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Skills</h3>
            <div className="space-y-4">
              {trendingSkills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    <TrendingUp className={`${index < 3 ? 'text-green-500' : 'text-gray-400'}`} size={16} />
                  </div>
                  <img
                    src={skill.thumbnail}
                    alt={skill.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 line-clamp-1">{skill.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {skill.author}</span>
                      <span>{skill.upvotes} upvotes</span>
                      <span>{skill.views} views</span>
                      <span className="text-green-600 font-medium">
                        {Math.round((skill.upvotes + skill.views * 0.1) * 10) / 10} trend score
                      </span>
                    </div>
                  </div>
                  <div className={`badge ${skill.category === 'Tech' ? 'badge-primary' : 'badge-secondary'}`}>
                    {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievement Badges */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Skill', description: 'Create your first skill', icon: '🎯', color: 'bg-blue-100 text-blue-800' },
            { name: 'Popular Creator', description: 'Get 100+ upvotes', icon: '⭐', color: 'bg-yellow-100 text-yellow-800' },
            { name: 'Quick Learner', description: 'Complete 10 skills', icon: '🚀', color: 'bg-green-100 text-green-800' },
            { name: 'Community Helper', description: 'Help 50+ learners', icon: '💙', color: 'bg-purple-100 text-purple-800' },
            { name: 'Skill Master', description: 'Create 25+ skills', icon: '🏆', color: 'bg-red-100 text-red-800' },
            { name: 'Rising Star', description: 'Get featured skill', icon: '🌟', color: 'bg-pink-100 text-pink-800' },
            { name: 'Explorer', description: 'Learn from 5 categories', icon: '🧭', color: 'bg-indigo-100 text-indigo-800' },
            { name: 'Mentor', description: 'Top contributor of the month', icon: '👨‍🏫', color: 'bg-orange-100 text-orange-800' }
          ].map((badge, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${badge.color}`}>
                {badge.name}
              </div>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;