
      import React, { useState, useEffect } from 'react';
import './LogicalSequenceGame.css';

const sequences = [
  {
    steps: ['Wake up', 'Brush teeth', 'Eat breakfast', 'Go to school'],
  },
  {
    steps: ['Pick up pencil', 'Write letters', 'Close book', 'Put in bag'],
  },
  {
    steps: ['Wear socks', 'Wear shoes', 'Tie laces', 'Stand up'],
  }
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function LogicalSequenceGame() {
  const [current, setCurrent] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [feedback, setFeedback] = useState('');

  const sequence = sequences[current];
  const shuffled = shuffle([...sequence.steps]);

  const handleClick = (step) => {
    if (userOrder.includes(step)) return;

    const updated = [...userOrder, step];
    setUserOrder(updated);

    if (updated.length === sequence.steps.length) {
      const isCorrect = updated.every((s, i) => s === sequence.steps[i]);
      setFeedback(isCorrect ? '✅ Correct Sequence!' : '❌ Try Again!');

      if (isCorrect) {
        markActivityComplete("Logical Reasoning", "SequenceGame");
      }
    }
  };

  const handleNext = () => {
    setUserOrder([]);
    setFeedback('');
    setCurrent((prev) => (prev + 1) % sequences.length);
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
    <div className="sequence-container">
      <h2>Sequence Game</h2>
      <p>Tap the steps in the correct order:</p>

      <div className="options">
        {shuffled.map((step, index) => (
          <button key={index} className="sequence-btn" onClick={() => handleClick(step)}>
            {step}
          </button>
        ))}
      </div>

      <div className="selected-steps">
        {userOrder.map((step, i) => (
          <div key={i} className="selected-step">{step}</div>
        ))}
      </div>

      <div className="feedback">{feedback}</div>

      {feedback && <button className="next-btn" onClick={handleNext}>Next</button>}
    </div>
  );
}

export default LogicalSequenceGame;

