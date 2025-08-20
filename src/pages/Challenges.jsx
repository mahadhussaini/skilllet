import CollaborativeChallenge from '../components/CollaborativeChallenge';

const Challenges = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Collaborative Challenges
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Join community-driven learning challenges and master complex skills together
        </p>
      </div>

      <CollaborativeChallenge />
    </div>
  );
};

export default Challenges; 