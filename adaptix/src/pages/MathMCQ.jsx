import React, { useState, useEffect } from 'react';
import './MathActivities.css';

const questions = [
  {
    question: 'What is 7 + 5?',
    options: ['10', '12', '11', '13'],
    answer: '12',
  },
  {
    question: 'What is 9 × 3?',
    options: ['27', '21', '18', '30'],
    answer: '27',
  },
  {
    question: 'What is the square of 6?',
    options: ['36', '12', '30', '18'],
    answer: '36',
  },
  {
    question: 'What is 15 ÷ 3?',
    options: ['6', '4', '5', '3'],
    answer: '5',
  },
  {
    question: 'What comes next: 2, 4, 6, __?',
    options: ['7', '8', '10', '9'],
    answer: '8',
  },
];

function MathMCQ() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) {
      markActivityComplete("Math", "MCQ");
    }
  }, [showResult]);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 600);
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
    <div className="activity-container">
      <h1>Math MCQ Quiz</h1>
      {showResult ? (
        <div className="result-box">Your score: {score}/{questions.length}</div>
      ) : (
        <div className="question-box">
          <h2>{questions[currentQ].question}</h2>
          <div className="options-grid">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${selected === opt ? 'selected' : ''}`}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MathMCQ;
