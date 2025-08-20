import { useState, useEffect } from 'react';
import { Users, Plus, MessageCircle, BookOpen, Calendar, Star, Settings, UserPlus } from 'lucide-react';
import useStore from '../store/useStore';

const SkillGroups = () => {
  const { isAuthenticated } = useStore();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false,
    maxMembers: 50
  });

  useEffect(() => {
    if (isAuthenticated) {
      generateMockGroups();
    }
  }, [isAuthenticated]);

  const generateMockGroups = () => {
    const mockGroups = [
      {
        id: 1,
        name: "React Developers Club",
        description: "A community for React developers to share knowledge, discuss best practices, and collaborate on projects.",
        category: "Tech",
        memberCount: 127,
        maxMembers: 200,
        isPrivate: false,
        isJoined: true,
        isAdmin: true,
        createdAt: "2024-01-15",
        lastActivity: "2 hours ago",
        skills: ["React", "JavaScript", "TypeScript", "State Management"],
        upcomingEvents: [
          { id: 1, title: "React 18 Workshop", date: "2024-02-15", time: "14:00" },
          { id: 2, title: "State Management Deep Dive", date: "2024-02-20", time: "16:00" }
        ],
        recentDiscussions: [
          { id: 1, user: "Sarah M.", topic: "Best practices for React performance", replies: 12, lastReply: "1 hour ago" },
          { id: 2, user: "Mike R.", topic: "TypeScript with React tips", replies: 8, lastReply: "3 hours ago" }
        ]
      },
      {
        id: 2,
        name: "Productivity Masters",
        description: "Learn and share productivity techniques, tools, and strategies for better time management.",
        category: "Business",
        memberCount: 89,
        maxMembers: 150,
        isPrivate: false,
        isJoined: true,
        isAdmin: false,
        createdAt: "2024-01-20",
        lastActivity: "5 hours ago",
        skills: ["Time Management", "Project Management", "Automation", "Focus"],
        upcomingEvents: [
          { id: 1, title: "Time Blocking Masterclass", date: "2024-02-18", time: "10:00" }
        ],
        recentDiscussions: [
          { id: 1, user: "Alex K.", topic: "Best productivity apps for 2024", replies: 15, lastReply: "5 hours ago" },
          { id: 2, user: "Emma L.", topic: "Dealing with procrastination", replies: 23, lastReply: "1 day ago" }
        ]
      },
      {
        id: 3,
        name: "Creative Designers",
        description: "A space for designers to share inspiration, techniques, and collaborate on creative projects.",
        category: "Creative",
        memberCount: 203,
        maxMembers: 300,
        isPrivate: false,
        isJoined: false,
        isAdmin: false,
        createdAt: "2024-01-10",
        lastActivity: "30 minutes ago",
        skills: ["UI/UX Design", "Graphic Design", "Illustration", "Typography"],
        upcomingEvents: [
          { id: 1, title: "Design System Workshop", date: "2024-02-22", time: "15:00" },
          { id: 2, title: "Creative Portfolio Review", date: "2024-02-25", time: "18:00" }
        ],
        recentDiscussions: [
          { id: 1, user: "David P.", topic: "Color theory in modern design", replies: 18, lastReply: "30 minutes ago" },
          { id: 2, user: "Lisa W.", topic: "Figma tips and tricks", replies: 31, lastReply: "2 hours ago" }
        ]
      },
      {
        id: 4,
        name: "Data Science Enthusiasts",
        description: "Learn data science, machine learning, and analytics with like-minded professionals.",
        category: "Tech",
        memberCount: 156,
        maxMembers: 250,
        isPrivate: true,
        isJoined: false,
        isAdmin: false,
        createdAt: "2024-01-25",
        lastActivity: "1 day ago",
        skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
        upcomingEvents: [
          { id: 1, title: "Python for Data Science", date: "2024-02-28", time: "19:00" }
        ],
        recentDiscussions: [
          { id: 1, user: "Tom H.", topic: "Getting started with TensorFlow", replies: 9, lastReply: "1 day ago" },
          { id: 2, user: "Rachel S.", topic: "Data visualization best practices", replies: 14, lastReply: "2 days ago" }
        ]
      }
    ];

    setGroups(mockGroups);
  };

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description || !newGroup.category) return;

    const group = {
      id: Date.now(),
      ...newGroup,
      memberCount: 1,
      isJoined: true,
      isAdmin: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: "Just now",
      skills: [],
      upcomingEvents: [],
      recentDiscussions: []
    };

    setGroups(prev => [group, ...prev]);
    setNewGroup({ name: '', description: '', category: '', isPrivate: false, maxMembers: 50 });
    setShowCreateModal(false);
  };

  const handleJoinGroup = (groupId) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: true, memberCount: group.memberCount + 1 }
        : group
    ));
  };

  const handleLeaveGroup = (groupId) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: false, memberCount: group.memberCount - 1 }
        : group
    ));
  };

  const GroupCard = ({ group }) => (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{group.name}</h3>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              {group.isPrivate && (
                <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded">
                  Private
                </span>
              )}
              {group.isAdmin && (
                <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{group.description}</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{group.memberCount}/{group.maxMembers}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{group.recentDiscussions.length} talks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{group.upcomingEvents.length} events</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {group.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-1.5 sm:px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
          {group.skills.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">+{group.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {group.lastActivity}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {group.isJoined ? (
              <>
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleLeaveGroup(group.id)}
                  className="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  Leave
                </button>
              </>
            ) : (
              <button
                onClick={() => handleJoinGroup(group.id)}
                className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const GroupDetail = ({ group, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{group.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{group.description}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Events</span>
              </h3>
              <div className="space-y-3">
                {group.upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.date} at {event.time}
                    </p>
                  </div>
                ))}
                {group.upcomingEvents.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Recent Discussions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Recent Discussions</span>
              </h3>
              <div className="space-y-3">
                {group.recentDiscussions.map(discussion => (
                  <div key={discussion.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{discussion.topic}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">by {discussion.user}</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{discussion.replies} replies</span>
                        <span>•</span>
                        <span>{discussion.lastReply}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {group.memberCount} members
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Created {group.createdAt}
                </span>
              </div>
              <button className="btn-primary">
                Start Discussion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateGroupModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New Group</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Enter group name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newGroup.description}
                onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Describe your group"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newGroup.category}
                onChange={(e) => setNewGroup(prev => ({ ...prev, category: e.target.value }))}
                className="input-field"
              >
                <option value="">Select category</option>
                <option value="Tech">Tech</option>
                <option value="Business">Business</option>
                <option value="Creative">Creative</option>
                <option value="Health">Health</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newGroup.isPrivate}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, isPrivate: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Private group</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGroup}
              className="btn-primary"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Skill Groups</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to join and create skill groups</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Skill Groups</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Join interest-based learning communities and collaborate with like-minded learners
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </button>
      </div>

      {/* Groups Grid */}
      <div className="responsive-grid-2">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {/* Modals */}
      {selectedGroup && (
        <GroupDetail group={selectedGroup} onClose={() => setSelectedGroup(null)} />
      )}
      
      {showCreateModal && (
        <CreateGroupModal />
      )}
    </div>
  );
};

export default SkillGroups; 