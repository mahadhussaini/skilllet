import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import useStore from '../store/useStore';

const CreateSkill = () => {
  const navigate = useNavigate();
  const { addSkill, getCategories, currentUser, isAuthenticated } = useStore();
  const categories = getCategories().filter(cat => cat !== 'All');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech',
    estimatedTime: 5,
    type: 'text',
    content: '',
    tags: [],
    thumbnail: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to create skills</h2>
        <button
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Log In
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const skillData = {
        ...formData,
        author: currentUser.username,
        thumbnail: formData.thumbnail || getDefaultThumbnail(formData.category)
      };

      const newSkill = addSkill(skillData);
      navigate(`/skill/${newSkill.id}`);
    } catch (error) {
      console.error('Error creating skill:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDefaultThumbnail = (category) => {
    const thumbnails = {
      'Tech': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      'Lifestyle': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
      'Health': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      'Creative': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
      'DIY': 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop'
    };
    return thumbnails[category] || thumbnails['Tech'];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Skill</h1>
        <p className="text-gray-600 mt-2">
          Share your knowledge with the community. Create a micro-skill that others can learn in under 10 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Basic Excel Formulas"
                className="input-field"
                required
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of what learners will gain from this skill"
                rows={3}
                className="input-field"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Estimated Time */}
            <div>
              <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time (minutes) *
              </label>
              <input
                type="number"
                id="estimatedTime"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                min="1"
                max="15"
                className="input-field"
                required
              />
            </div>

            {/* Content Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Content Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="text">Text Tutorial</option>
                <option value="video">Video Tutorial</option>
                <option value="infographic">Infographic/Visual Guide</option>
              </select>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL (optional)
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use a default thumbnail based on category
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
          
          <div className="space-y-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              {formData.type === 'video' ? 'Video URL or Embed Code' : 
               formData.type === 'infographic' ? 'Content Description or Image URLs' : 
               'Tutorial Content'} *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder={
                formData.type === 'video' ? 'Paste video URL or embed code here...' :
                formData.type === 'infographic' ? 'Describe the visual guide or provide image URLs...' :
                'Write your step-by-step tutorial here...'
              }
              rows={12}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn-secondary"
              >
                <Plus size={16} />
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        {formData.thumbnail && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
            <div className="max-w-sm">
              <img
                src={formData.thumbnail}
                alt="Thumbnail preview"
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = getDefaultThumbnail(formData.category);
                }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Creating...' : 'Create Skill'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSkill;