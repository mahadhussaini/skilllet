import MediaLibrary from '../components/MediaLibrary';

const MediaLibraryPage = () => {
  const handleMediaSelect = (media) => {
    console.log('Selected media:', media);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MediaLibrary onSelect={handleMediaSelect} />
    </div>
  );
};

export default MediaLibraryPage; 