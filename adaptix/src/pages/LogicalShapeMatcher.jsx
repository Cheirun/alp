// LogicalShapeMatcher.jsx
import React, { useState, useEffect } from 'react';
import './LogicalShapeMatcher.css';

const SHAPES = ['🔺', '🟦', '🟩', '⬛', '🟨'];

function ShapeMatcher() {
  const [shapeGrid, setShapeGrid] = useState([]);
  const [oddIndex, setOddIndex] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateShapes();
  }, []);

  const generateShapes = () => {
    const baseShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    let newGrid = new Array(9).fill(baseShape);
    let randomIndex = Math.floor(Math.random() * 9);
    let differentShape = baseShape;

    while (differentShape === baseShape) {
      differentShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    }

    newGrid[randomIndex] = differentShape;
    setShapeGrid(newGrid);
    setOddIndex(randomIndex);
    setFeedback('');
  };

  const handleClick = (index) => {
    if (index === oddIndex) {
      setFeedback('✅ Correct! Great job!');
      markActivityComplete("Logical Reasoning", "ShapeMatcher");
      setTimeout(() => generateShapes(), 1500);
    } else {
      setFeedback('❌ Try Again!');
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
    <div className="shape-matcher-container">
      <h2>Shape Matcher Game</h2>
      <div className="shapes-grid">
        {shapeGrid.map((shape, index) => (
          <div key={index} className="shape-box" onClick={() => handleClick(index)}>
            {shape}
          </div>
        ))}
      </div>
      <div className="feedback">{feedback}</div>
    </div>
  );
}

export default ShapeMatcher;
