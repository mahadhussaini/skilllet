import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import SkillCard from '../components/SkillCard';
import RecommendationEngine from '../components/RecommendationEngine';

const Home = () => {
  const {
    filteredSkills,
    selectedCategory,
    searchQuery,
    setCategory,
    setSearchQuery,
    getCategories,
    filterSkills
  } = useStore();
  
  const [sortBy, setSortBy] = useState('trending');
  const categories = getCategories();

  useEffect(() => {
    filterSkills();
  }, [filterSkills]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.upvotes + b.views * 0.1) - (a.upvotes + a.views * 0.1);
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'quick':
        return a.estimatedTime - b.estimatedTime;
      default:
        return 0;
    }
  });

  const trendingSkills = [...filteredSkills]
    .sort((a, b) => (b.upvotes + b.views * 0.1) - (a.upvotes + a.views * 0.1))
    .slice(0, 3);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Learn New Skills in <span className="text-primary-600">10 Minutes</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Discover bite-sized, practical skills created by our community. 
          From Excel formulas to photography tips, master something new today.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search skills, tags, or topics..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="input-field w-auto min-w-[120px]"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="quick">Quickest</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {searchQuery === '' && selectedCategory === 'All' && (
        <RecommendationEngine />
      )}

      {/* Trending Section */}
      {searchQuery === '' && selectedCategory === 'All' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {trendingSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {searchQuery
              ? `Search Results (${sortedSkills.length})`
              : selectedCategory === 'All'
              ? 'All Skills'
              : `${selectedCategory} Skills (${sortedSkills.length})`}
          </h2>
        </div>

        {sortedSkills.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <Search size={48} className="text-gray-300 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No skills found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {sortedSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">{filteredSkills.length}</div>
            <div className="text-primary-100">Skills Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10 min</div>
            <div className="text-primary-100">Average Learning Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {categories.length - 1}
            </div>
            <div className="text-primary-100">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;