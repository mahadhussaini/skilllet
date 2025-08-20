import { useState } from 'react';
import { Calendar, Trophy, BookOpen, Heart, Eye, Edit3 } from 'lucide-react';
import useStore from '../store/useStore';
import SkillCard from '../components/SkillCard';

const Profile = () => {
  const {
    currentUser,
    isAuthenticated,
    skills,
    completedSkills,
    userProgress
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
      </div>
    );
  }

  const userSkills = skills.filter(skill => skill.author === currentUser.username);
  const completedSkillsData = skills.filter(skill => completedSkills.includes(skill.id));
  
  const totalUpvotes = userSkills.reduce((sum, skill) => sum + skill.upvotes, 0);
  const totalViews = userSkills.reduce((sum, skill) => sum + skill.views, 0);

  const stats = [
    {
      label: 'Skills Created',
      value: userSkills.length,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Skills Completed',
      value: completedSkills.length,
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      label: 'Total Upvotes',
      value: totalUpvotes,
      icon: Heart,
      color: 'text-red-600'
    },
    {
      label: 'Total Views',
      value: totalViews,
      icon: Eye,
      color: 'text-purple-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'created', label: 'Created Skills' },
    { id: 'completed', label: 'Completed Skills' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition-colors">
              <Edit3 size={12} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.username}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Joined {new Date(currentUser.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="btn-secondary">
            Edit Profile
          </button>
        </div>

        {/* Badges */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.badges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                <Trophy size={12} className="mr-1" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-3`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {completedSkillsData.slice(0, 3).map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Trophy className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        Completed <span className="font-medium">{skill.title}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {userProgress[skill.id]?.completedAt && 
                          new Date(userProgress[skill.id].completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {completedSkillsData.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No completed skills yet</p>
                )}
              </div>
            </div>

            {/* Top Created Skills */}
            {userSkills.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Top Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userSkills
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .slice(0, 3)
                    .map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'created' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Created Skills ({userSkills.length})</h3>
            </div>
            {userSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No skills created yet</h3>
                <p className="text-gray-600 mb-4">Share your knowledge with the community</p>
                <button className="btn-primary">Create Your First Skill</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Completed Skills ({completedSkills.length})</h3>
            </div>
            {completedSkillsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedSkillsData.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No completed skills yet</h3>
                <p className="text-gray-600 mb-4">Start learning and track your progress</p>
                <button className="btn-primary">Browse Skills</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={currentUser.username}
                    className="input-field"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    className="input-field"
                    readOnly
                  />
                </div>
                <button className="btn-primary">Update Profile</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates about new skills and comments</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Digest</p>
                    <p className="text-sm text-gray-600">Get a summary of trending skills</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;