// EnglishWordMatch.jsx
import React, { useState, useEffect } from 'react';
import './EnglishWordMatch.css';

const wordMatchQuestions = [
  {
    word: 'Big',
    options: ['Tiny', 'Huge', 'Small', 'Little'],
    answer: 'Huge',
  },
  {
    word: 'Happy',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    answer: 'Joyful',
  },
  {
    word: 'Fast',
    options: ['Quick', 'Slow', 'Lazy', 'Stop'],
    answer: 'Quick',
  },
  {
    word: 'Cold',
    options: ['Hot', 'Warm', 'Freezing', 'Cool'],
    answer: 'Freezing',
  },
  {
    word: 'Smart',
    options: ['Clever', 'Dull', 'Boring', 'Silly'],
    answer: 'Clever',
  },
];

function EnglishWordMatch() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = wordMatchQuestions[currentQuestionIndex];

  useEffect(() => {
    if (showResult) {
      markActivityComplete("English", "WordMatch");
    }
  }, [showResult]);

  const handleAnswer = (option) => {
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    const next = currentQuestionIndex + 1;
    if (next < wordMatchQuestions.length) {
      setCurrentQuestionIndex(next);
    } else {
      setShowResult(true);
    }
  };

  const markActivityComplete = (subject, activityName) => {
    const progressData = JSON.parse(localStorage.getItem('progress')) || {};
    if (!progressData[subject]) {
      progressData[subject] = [];
    }

    if (!progressData[subject].includes(activityName)) {
      progressData[subject].push(activityName);
      localStorage.setItem('progress', JSON.stringify(progressData));
    }
  };

  return (
    <div className="word-match-container">
      {!showResult ? (
        <>
          <h2 className="word-match-title">Word Match Game</h2>
          <p className="word-match-question">
            Match the word <strong>"{currentQuestion.word}"</strong> with its synonym:
          </p>
          <div className="word-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="word-option"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="result-message">
          <h2>Game Over!</h2>
          <p>Your Score: {score} / {wordMatchQuestions.length}</p>
        </div>
      )}
    </div>
  );
}

export default EnglishWordMatch;
