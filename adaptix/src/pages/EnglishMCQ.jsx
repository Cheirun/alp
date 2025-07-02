import React, { useState, useEffect } from 'react';
import './EnglishMCQ.css';

const questions = [
  {
    question: "What is the noun in the sentence: 'The dog barked loudly'?",
    options: ["barked", "loudly", "dog", "the"],
    answer: "dog"
  },
  {
    question: "Choose the correct verb: 'She ____ to school every day.'",
    options: ["go", "goes", "gone", "going"],
    answer: "goes"
  },
  {
    question: "What does 'happy' mean?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    answer: "Joyful"
  },
  {
    question: "Which word is an adjective?",
    options: ["quickly", "blue", "run", "he"],
    answer: "blue"
  },
  {
    question: "Which is a proper noun?",
    options: ["city", "dog", "school", "India"],
    answer: "India"
  }
];

function EnglishMCQ() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (showScore) {
      markActivityComplete("English", "MCQ");
    }
  }, [showScore]);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    const next = currentQ + 1;
    if (next < questions.length) {
      setCurrentQ(next);
    } else {
      setShowScore(true);
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
    <div className="mcq-container">
      <h1>English MCQ Game</h1>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}!
        </div>
      ) : (
        <div className="question-section">
          <h2>{questions[currentQ].question}</h2>
          <div className="options">
            {questions[currentQ].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnglishMCQ;
