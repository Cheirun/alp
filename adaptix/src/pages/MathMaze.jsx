// MathMaze.jsx
import React, { useState, useEffect } from 'react';
import './MathMaze.css';

const questions = [
  { question: '2 + 2', answer: '4' },
  { question: '5 x 1', answer: '5' },
  { question: '9 - 3', answer: '6' },
  { question: '6 ÷ 2', answer: '3' },
  { question: '7 + 2', answer: '9' },
  { question: '4 x 2', answer: '8' },
  { question: '10 - 7', answer: '3' },
  { question: '3 + 3', answer: '6' },
  { question: '5 + 4', answer: '9' }
];

function MathMaze() {
  const [position, setPosition] = useState(0);
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) {
      markActivityComplete("Math", "Maze");
    }
  }, [completed]);

  const handleSubmit = () => {
    if (input === questions[position].answer) {
      if (position === questions.length - 1) {
        setCompleted(true);
      } else {
        setPosition(position + 1);
        setInput('');
      }
    } else {
      alert('Try again!');
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
    <div className="maze-wrapper">
      <h1>🧠 Math Maze</h1>

      <div className="maze-grid">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className={`maze-cell ${idx === position ? 'active' : ''} ${
              idx < position ? 'completed' : ''
            }`}
          >
            {idx < position ? '✔' : idx === position ? '?' : ''}
          </div>
        ))}
      </div>

      {!completed ? (
        <div className="question-box">
          <p><strong>Q{position + 1}:</strong> {questions[position].question}</p>
          <input
            type="text"
            placeholder="Your Answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="completion-box">
          <h2>🎉 You completed the Math Maze!</h2>
        </div>
      )}
    </div>
  );
}

export default MathMaze;
