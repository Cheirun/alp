import React, { useState, useEffect } from 'react';
import './MathActivities.css';

const puzzles = [
  { sequence: ['2', '4', '', '8', '10'], answer: '6', options: ['5', '6', '7'] },
  { sequence: ['3', '6', '9', ''], answer: '12', options: ['11', '12', '13'] },
  { sequence: ['1', '2', '4', '8', ''], answer: '16', options: ['14', '16', '18'] },
  { sequence: ['10', '20', '', '40'], answer: '30', options: ['25', '30', '35'] },
  { sequence: ['5', '10', '15', ''], answer: '20', options: ['18', '20', '25'] },
];

function MathNumberPuzzle() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      markActivityComplete("Math", "NumberPuzzle");
    }
  }, [done]);

  const handleClick = (option) => {
    setSelected(option);
    if (option === puzzles[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (current + 1 < puzzles.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 800);
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
      <h1>Number Puzzle</h1>
      {done ? (
        <div className="result-box">🎉 Great! You scored {score}/{puzzles.length}</div>
      ) : (
        <div className="puzzle-box">
          <div className="sequence">
            {puzzles[current].sequence.map((num, idx) => (
              <span
                key={idx}
                className={`number-box ${num === '' ? 'blank' : ''}`}
              >
                {num === '' && selected ? selected : num}
              </span>
            ))}
          </div>
          <h3>Choose the missing number:</h3>
          <div className="options-grid">
            {puzzles[current].options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${selected === opt ? 'selected' : ''}`}
                onClick={() => handleClick(opt)}
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

export default MathNumberPuzzle;
