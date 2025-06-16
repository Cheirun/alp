import React, { useState } from 'react';
import quizData from './QuizQuestions';
import './quiz.css';

const English = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const current = quizData[currentQuestion];
    if (selectedOption === current.answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {!started ? (
        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>You scored <strong>{score}</strong> out of <strong>{quizData.length}</strong>.</p>
          <button className="start-btn" onClick={startQuiz}>Retake Quiz</button>
        </div>
      ) : (
        <div className="question-card">
          <h3>
            Q{currentQuestion + 1}: {quizData[currentQuestion].question}
          </h3>
          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {currentQuestion === quizData.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default English;

