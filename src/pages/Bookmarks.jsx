import { Bookmark as BookmarkIcon, Search } from 'lucide-react';
import useStore from '../store/useStore';
import SkillCard from '../components/SkillCard';

const Bookmarks = () => {
  const { skills, bookmarkedSkills, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your bookmarks</h2>
      </div>
    );
  }

  const bookmarkedSkillsData = skills.filter(skill => bookmarkedSkills.includes(skill.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Bookmarks</h1>
        <p className="text-gray-600 mt-2">
          Skills you've saved for later learning
        </p>
      </div>

      {/* Bookmarked Skills */}
      {bookmarkedSkillsData.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Saved Skills ({bookmarkedSkillsData.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedSkillsData.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <BookmarkIcon size={48} className="text-gray-300 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring skills and bookmark the ones you want to learn later.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Browse Skills
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-primary-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">💡 Pro Tips</h3>
        <ul className="space-y-2 text-primary-800">
          <li>• Click the bookmark icon on any skill card to save it</li>
          <li>• Bookmarked skills sync across all your devices</li>
          <li>• Use bookmarks to create your personal learning queue</li>
          <li>• Remove bookmarks by clicking the bookmark icon again</li>
        </ul>
      </div>
    </div>
  );
};

export default Bookmarks;