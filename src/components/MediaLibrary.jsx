import { useState, useEffect } from 'react';
import { Upload, Image, Video, FileText, Search, Grid, List, Trash2, Download, Eye, Folder, Plus } from 'lucide-react';
import useStore from '../store/useStore';

const MediaLibrary = ({ onSelect, selectedMedia = [] }) => {
  const { isAuthenticated } = useStore();
  const [mediaItems, setMediaItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      generateMockMedia();
    }
  }, [isAuthenticated]);

  const generateMockMedia = () => {
    const mockMedia = [
      {
        id: 1,
        name: "react-hooks-diagram.png",
        type: "image",
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        size: "2.4 MB",
        uploadedAt: "2024-01-15",
        category: "diagrams",
        tags: ["react", "hooks", "diagram"],
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop"
      },
      {
        id: 2,
        name: "javascript-basics.mp4",
        type: "video",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        size: "15.2 MB",
        uploadedAt: "2024-01-14",
        category: "tutorials",
        tags: ["javascript", "basics", "video"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
        duration: "3:45"
      },
      {
        id: 3,
        name: "css-flexbox-guide.pdf",
        type: "document",
        url: "#",
        size: "1.8 MB",
        uploadedAt: "2024-01-13",
        category: "guides",
        tags: ["css", "flexbox", "guide"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop"
      },
      {
        id: 4,
        name: "ui-design-principles.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        size: "3.1 MB",
        uploadedAt: "2024-01-12",
        category: "design",
        tags: ["ui", "design", "principles"],
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop"
      },
      {
        id: 5,
        name: "api-integration-tutorial.mp4",
        type: "video",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        size: "28.7 MB",
        uploadedAt: "2024-01-11",
        category: "tutorials",
        tags: ["api", "integration", "tutorial"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
        duration: "8:12"
      },
      {
        id: 6,
        name: "database-schema.sql",
        type: "document",
        url: "#",
        size: "0.5 MB",
        uploadedAt: "2024-01-10",
        category: "code",
        tags: ["database", "sql", "schema"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop"
      }
    ];

    setMediaItems(mockMedia);
  };

  const handleFileUpload = (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowUploadModal(false);
          return 0;
        }
        return prev + 10;
      });
    }, 200);

    // Add new media items
    const newItems = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
      url: URL.createObjectURL(file),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString().split('T')[0],
      category: 'uploads',
      tags: [],
      thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    setMediaItems(prev => [...newItems, ...prev]);
  };

  const handleDelete = (itemId) => {
    setMediaItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const getFilteredItems = () => {
    let filtered = mediaItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-red-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-green-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  const MediaCard = ({ item }) => {
    const isSelected = selectedMedia.some(media => media.id === item.id);

    return (
      <div
        className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
          isSelected
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
        onClick={() => handleSelect(item)}
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {getFileIcon(item.type)}
            </div>
          )}
          
          {/* Video duration overlay */}
          {item.type === 'video' && item.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {item.duration}
            </div>
          )}

          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
              <div className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
            {item.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.size} • {item.uploadedAt}
          </p>
        </div>

        {/* Actions overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.url, '_blank');
              }}
              className="p-2 bg-white rounded-full text-gray-700 hover:text-gray-900"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Download functionality
              }}
              className="p-2 bg-white rounded-full text-gray-700 hover:text-gray-900"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
              className="p-2 bg-white rounded-full text-red-600 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Upload Media</h3>
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn-primary cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowUploadModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Media Library</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to access the media library</p>
      </div>
    );
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Media Library</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your images, videos, and documents
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Media
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="images">Images</option>
            <option value="videos">Videos</option>
            <option value="documents">Documents</option>
            <option value="diagrams">Diagrams</option>
            <option value="tutorials">Tutorials</option>
            <option value="guides">Guides</option>
            <option value="design">Design</option>
            <option value="code">Code</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedMedia.some(media => media.id === item.id)
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleSelect(item)}
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                {getFileIcon(item.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.size} • {item.uploadedAt}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.url, '_blank');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="p-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No media found</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}
    </div>
  );
};

export default MediaLibrary; 