// LogicalMCQ.jsx
import React, { useState, useEffect } from 'react';
import './LogicalMCQ.css';

const questions = [
  {
    question: "Which number comes next in the series? 2, 4, 6, 8, __",
    options: ["10", "12", "14", "16"],
    answer: "10"
  },
  {
    question: "Which shape is different? 🟨 🟦 🟨 🟨",
    options: ["First", "Second", "Third", "Fourth"],
    answer: "Second"
  },
  {
    question: "If you rearrange the letters **C-A-T**, what do you get?",
    options: ["TAC", "ACT", "CAT", "ATC"],
    answer: "CAT"
  },
  {
    question: "What comes next? Monday, Tuesday, Wednesday, __",
    options: ["Friday", "Saturday", "Thursday", "Sunday"],
    answer: "Thursday"
  },
  {
    question: "Which is the odd one out? Apple, Banana, Carrot, Mango",
    options: ["Apple", "Banana", "Carrot", "Mango"],
    answer: "Carrot"
  }
];

function LogicalMCQ() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) {
      markActivityComplete("Logical Reasoning", "MCQ");
    }
  }, [showResult]);

  const handleSubmit = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
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
    <div className="logical-mcq-container">
      <h1>🧠 Logical Reasoning MCQ</h1>
      {!showResult ? (
        <div className="quiz-box">
          <h3>Q{currentQ + 1}: {questions[currentQ].question}</h3>
          <div className="options">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${selected === option ? 'selected' : ''}`}
                onClick={() => setSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="submit-btn" onClick={handleSubmit} disabled={!selected}>
            {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div className="result-box">
          <h2>🎉 You scored {score} out of {questions.length}!</h2>
        </div>
      )}
    </div>
  );
}

export default LogicalMCQ;
