import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Target, Star, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import useStore from '../store/useStore';

const InteractiveQuiz = ({ skillId, onComplete }) => {
  const { isAuthenticated } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const generateQuizData = () => {
      // Mock quiz data based on skill ID
      const mockQuizzes = {
        1: {
          title: "React Hooks Fundamentals Quiz",
          description: "Test your knowledge of React Hooks with these 5 questions",
          timeLimit: 300, // 5 minutes
          questions: [
            {
              id: 1,
              type: 'multiple_choice',
              question: "What is the primary purpose of the useState hook in React?",
              options: [
                "To manage component lifecycle",
                "To add state to functional components",
                "To handle side effects",
                "To optimize performance"
              ],
              correctAnswer: 1,
              explanation: "useState allows functional components to have state, which was previously only possible with class components."
            }
          ]
        }
      };

      const quiz = mockQuizzes[skillId] || mockQuizzes[1];
      setQuizData(quiz);
      setTimeLeft(quiz.timeLimit);
    };

    if (isAuthenticated && skillId) {
      generateQuizData();
    }
  }, [isAuthenticated, skillId]);

  const handleSubmit = React.useCallback(() => {
    if (!quizData) return;

    let correctAnswers = 0;
    quizData.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'multiple_choice' || question.type === 'true_false') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      } else if (question.type === 'fill_blank') {
        if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase()) {
          correctAnswers++;
        }
      }
    });

    const finalScore = Math.round((correctAnswers / quizData.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    setShowResults(true);

    if (onComplete) {
      onComplete(finalScore);
    }
  }, [quizData, answers, onComplete]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, handleSubmit]);



  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };



  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(quizData.timeLimit);
    setIsSubmitted(false);
    setShowResults(false);
    setScore(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionComponent = (question) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  answers[question.id] === index
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswer(question.id, index)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                  answers[question.id] === index
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {answers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="space-y-3">
            {[
              { value: true, label: 'True' },
              { value: false, label: 'False' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  answers[question.id] === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => handleAnswer(question.id, option.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                  answers[question.id] === option.value
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {answers[question.id] === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'fill_blank':
        return (
          <div>
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder="Type your answer..."
              className="input-field w-full"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return { message: "Excellent! You've mastered this skill!", icon: Trophy, color: "text-yellow-500" };
    if (score >= 80) return { message: "Great job! You have a solid understanding.", icon: Star, color: "text-blue-500" };
    if (score >= 70) return { message: "Good work! Keep practicing to improve.", icon: Target, color: "text-green-500" };
    return { message: "Keep learning! Review the material and try again.", icon: RefreshCw, color: "text-orange-500" };
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Interactive Quiz</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to take the quiz</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Loading quiz...</p>
      </div>
    );
  }

  if (showResults) {
    const scoreInfo = getScoreMessage(score);
    const Icon = scoreInfo.icon;

    return (
      <div className="card">
        <div className="text-center">
          <Icon className={`w-16 h-16 ${scoreInfo.color} mx-auto mb-4`} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Quiz Complete!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{scoreInfo.message}</p>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {score}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round((score / 100) * quizData.questions.length)} out of {quizData.questions.length} questions correct
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleRetake}
              className="btn-primary w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="btn-secondary w-full"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{quizData.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{quizData.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4" />
              <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {currentQ.question}
        </h3>
        {getQuestionComponent(currentQ)}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentQuestion === 0
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          {currentQuestion < quizData.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="btn-primary"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz; 