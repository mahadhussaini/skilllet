import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, Eye, CheckCircle, Star, Icon } from 'lucide-react';
import useStore from '../store/useStore';

const AnalyticsDashboard = () => {
  const { currentUser } = useStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSkill] = useState('all');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const generateAnalytics = () => {
      // Mock analytics data for demonstration
      const mockAnalytics = {
        overview: {
          totalSkills: 8,
          totalViews: 1247,
          totalUpvotes: 156,
          totalCompletions: 89,
          avgCompletionRate: 78,
          avgViewsPerSkill: 156
        },
        timeSeries: [
          { date: '2024-01-15', views: 45, completions: 23, upvotes: 12 },
          { date: '2024-01-14', views: 52, completions: 28, upvotes: 15 },
          { date: '2024-01-13', views: 38, completions: 19, upvotes: 8 },
          { date: '2024-01-12', views: 61, completions: 31, upvotes: 18 },
          { date: '2024-01-11', views: 44, completions: 22, upvotes: 10 }
        ],
        skillPerformance: [
          { id: 1, title: "React Hooks Basics", views: 234, upvotes: 45, completions: 67, completionRate: 28.6 },
          { id: 2, title: "JavaScript Fundamentals", views: 189, upvotes: 32, completions: 54, completionRate: 28.6 },
          { id: 3, title: "CSS Grid Layout", views: 156, upvotes: 28, completions: 42, completionRate: 26.9 }
        ],
        engagement: {
          comments: 23,
          bookmarks: 45,
          shares: 12
        }
      };
      setAnalytics(mockAnalytics);
    };

    if (currentUser) {
      generateAnalytics();
    }
  }, [currentUser, selectedTimeframe, selectedSkill]);





  const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change && (
            <p className={`text-xs sm:text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} truncate`}>
              {change > 0 ? '+' : ''}{change}% from last period
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30 flex-shrink-0`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const TimeSeriesChart = ({ data, title }) => (
    <div className="card">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">{title}</h3>
      <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-none overflow-y-auto no-scrollbar">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">{item.date}</span>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span className="text-xs sm:text-sm">{item.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">{item.completions}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                <span className="text-xs sm:text-sm">{item.upvotes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillPerformanceTable = ({ skills }) => (
    <div className="card">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Skill Performance</h3>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2 line-clamp-1">{skill.title}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Views: </span>
                <span className="text-gray-900 dark:text-gray-100">{skill.views}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Upvotes: </span>
                <span className="text-gray-900 dark:text-gray-100">{skill.upvotes}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Completions: </span>
                <span className="text-gray-900 dark:text-gray-100">{skill.completions}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Rate: </span>
                <span className="text-gray-900 dark:text-gray-100">{skill.completionRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Skill</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Views</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Upvotes</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Completions</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{skill.title}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{skill.views}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{skill.upvotes}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{skill.completions}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{skill.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to view your analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Track your skill performance and learner engagement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="input-field w-full sm:w-auto text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Skills Created"
          value={analytics.overview?.totalSkills || 0}
          icon={Target}
          color="blue"
        />
        <StatCard
          title="Total Views"
          value={analytics.overview?.totalViews || 0}
          icon={Eye}
          color="green"
          change={12}
        />
        <StatCard
          title="Total Upvotes"
          value={analytics.overview?.totalUpvotes || 0}
          icon={Star}
          color="yellow"
          change={8}
        />
        <StatCard
          title="Avg Completion Rate"
          value={`${analytics.overview?.avgCompletionRate || 0}%`}
          icon={CheckCircle}
          color="purple"
          change={-3}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <TimeSeriesChart
          data={analytics.timeSeries || []}
          title="Engagement Over Time"
        />
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Engagement Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Comments</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {analytics.engagement?.comments || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Bookmarks</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {analytics.engagement?.bookmarks || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Shares</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {analytics.engagement?.shares || 0}
                </span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Your most popular skill is getting {analytics.skillPerformance && analytics.skillPerformance.length > 0 ? Math.max(...analytics.skillPerformance.map(s => s.views)) : 0} views
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Average completion time: {analytics.overview?.avgViewsPerSkill || 0} minutes
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {analytics.overview?.totalCompletions || 0} learners completed your skills
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Performance Table */}
      {analytics.skillPerformance && analytics.skillPerformance.length > 0 ? (
        <SkillPerformanceTable skills={analytics.skillPerformance} />
      ) : (
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Skill Performance</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">No skills created yet. Start creating skills to see performance data!</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard; 