import { Clock, Heart, Eye, MessageCircle, Bookmark, Play, FileText, Image, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const SkillCard = ({ skill }) => {
  const { upvoteSkill, toggleBookmark, bookmarkedSkills, completedSkills } = useStore();

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteSkill(skill.id);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(skill.id);
  };

  const getTypeIcon = () => {
    switch (skill.type) {
      case 'video':
        return <Play size={14} className="text-red-500" />;
      case 'text':
        return <FileText size={14} className="text-blue-500" />;
      case 'infographic':
        return <Image size={14} className="text-green-500" />;
      default:
        return <FileText size={14} className="text-gray-500" />;
    }
  };

  const getCategoryColor = () => {
    const colors = {
      'Tech': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Lifestyle': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Health': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Business': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Creative': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'DIY': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    };
    return colors[skill.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const isBookmarked = bookmarkedSkills.includes(skill.id);
  const isCompleted = completedSkills.includes(skill.id);

  return (
    <Link to={`/skill/${skill.id}`} className="block h-full">
      <div className="skill-card group h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative mb-3 sm:mb-4">
          <img
            src={skill.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'}
            alt={skill.title}
            className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg"
          />
          
          {/* Type and Category Badges */}
          <div className="absolute top-2 left-2 flex items-center space-x-1">
            <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs">
              {getTypeIcon()}
              <span className="hidden sm:inline capitalize">{skill.type}</span>
            </div>
          </div>

          {/* Completion Status */}
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <CheckCircle size={14} />
            </div>
          )}

          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs flex items-center space-x-1">
            <Clock size={12} />
            <span>{skill.estimatedTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col px-1">
          {/* Title and Category */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1">
              {skill.title}
            </h3>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${getCategoryColor()}`}>
              {skill.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 flex-1">
            {skill.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-1">
                <Eye size={12} className="sm:w-4 sm:h-4" />
                <span>{skill.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle size={12} className="sm:w-4 sm:h-4" />
                <span>{skill.comments?.length || 0}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
              by {skill.author}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleUpvote}
                className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Heart size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{skill.upvotes}</span>
              </button>
            </div>
            
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skill.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
              {skill.tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{skill.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;