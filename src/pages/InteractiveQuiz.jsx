import InteractiveQuiz from '../components/InteractiveQuiz';

const InteractiveQuizPage = () => {
  const handleQuizComplete = (score) => {
    console.log('Quiz completed with score:', score);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <InteractiveQuiz skillId={1} onComplete={handleQuizComplete} />
    </div>
  );
};

export default InteractiveQuizPage; 