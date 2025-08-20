import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Heart, Bookmark, MessageCircle, Share2, Play, FileText, Image, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';
import DiscussionForum from '../components/DiscussionForum';

const SkillDetail = () => {
  const { id } = useParams();
  const {
    getSkillById,
    upvoteSkill,
    bookmarkSkill,
    completeSkill,
    isSkillBookmarked,
    isSkillCompleted
  } = useStore();

  const skill = getSkillById(parseInt(id));

  if (!skill) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill not found</h2>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleUpvote = () => {
    upvoteSkill(skill.id);
  };

  const handleBookmark = () => {
    bookmarkSkill(skill.id);
  };

  const handleComplete = () => {
    completeSkill(skill.id);
  };

  const getTypeIcon = () => {
    switch (skill.type) {
      case 'video':
        return <Play size={20} className="text-red-500" />;
      case 'text':
        return <FileText size={20} className="text-blue-500" />;
      case 'infographic':
        return <Image size={20} className="text-green-500" />;
      default:
        return <FileText size={20} className="text-gray-500" />;
    }
  };

  const getCategoryColor = () => {
    const colors = {
      'Tech': 'bg-blue-100 text-blue-800',
      'Lifestyle': 'bg-purple-100 text-purple-800',
      'Health': 'bg-green-100 text-green-800',
      'Business': 'bg-orange-100 text-orange-800',
      'Creative': 'bg-pink-100 text-pink-800',
      'DIY': 'bg-yellow-100 text-yellow-800',
    };
    return colors[skill.category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to skills</span>
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              <span className={`badge ${getCategoryColor()}`}>
                {skill.category}
              </span>
              <div className="flex items-center space-x-1 text-gray-600">
                {getTypeIcon()}
                <span className="capitalize text-sm">{skill.type}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{skill.title}</h1>
            <p className="text-lg text-gray-600">{skill.description}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{skill.estimatedTime} minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{skill.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{skill.comments} comments</span>
            </div>
            <span>by {skill.author}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg border border-gray-200 hover:border-red-200"
            >
              <Heart size={18} />
              <span>{skill.upvotes}</span>
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg border transition-colors ${
                isSkillBookmarked(skill.id)
                  ? 'text-primary-600 border-primary-200 bg-primary-50'
                  : 'text-gray-400 border-gray-200 hover:text-primary-600 hover:border-primary-200'
              }`}
            >
              <Bookmark size={18} fill={isSkillBookmarked(skill.id) ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thumbnail/Media */}
          <div className="relative">
            <img
              src={skill.thumbnail}
              alt={skill.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
            {skill.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black bg-opacity-70 text-white p-4 rounded-full hover:bg-opacity-80 transition-opacity">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">What you'll learn</h3>
              <div className="whitespace-pre-wrap text-gray-700">
                {skill.content}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
            {isSkillCompleted(skill.id) ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle size={20} />
                <span className="font-medium">Completed!</span>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Ready to learn this skill? Mark it as complete when you're done.
                </p>
                <button
                  onClick={handleComplete}
                  className="btn-primary w-full"
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop"
                alt={skill.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{skill.author}</p>
                <p className="text-sm text-gray-600">Skill Creator</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Views</span>
                <span className="font-medium">{skill.views}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upvotes</span>
                <span className="font-medium">{skill.upvotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Comments</span>
                <span className="font-medium">{skill.comments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{new Date(skill.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Forum */}
      <div className="card">
        <DiscussionForum skillId={skill.id} />
      </div>
    </div>
  );
};

export default SkillDetail;