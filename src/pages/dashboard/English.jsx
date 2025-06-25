import React, { useState, useEffect, useRef } from 'react';
import quizData from './QuizQuestions';
import './quiz.css';

const English = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [emotion, setEmotion] = useState('neutral');
  const [emotionLog, setEmotionLog] = useState([]);
  const videoRef = useRef(null);

  const startQuiz = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setEmotionLog([]);

    // Start webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Webcam access error:', err);
        });
    }
  };

  // Simulate emotion detection every 5 sec
  useEffect(() => {
    let interval;
    if (started && !showResult) {
      interval = setInterval(() => {
        const emotions = ['😊 Happy', '😐 Neutral', '😕 Confused', '😴 Bored', '😠 Angry'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(randomEmotion);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [started, showResult]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const current = quizData[currentQuestion];

    // Log emotion for this question
    setEmotionLog((prev) => [
      ...prev,
      {
        question: current.question,
        selected: selectedOption,
        emotion: emotion,
        correct: selectedOption === current.answer
      },
    ]);

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
      <div className="quiz-title">📝 English Quiz</div>

      {!started ? (
        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : showResult ? (
        <div className="result">
          <div className="badge">
            {score >= 4 ? '🏆' : score >= 2 ? '👏' : '🙂'}
          </div>
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {quizData.length}.</p>

          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <h3 style={{ color: '#8a2be2' }}>🧠 Emotions during Quiz:</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {emotionLog.map((entry, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <strong>Q{index + 1}:</strong> {entry.question}<br />
                  <span style={{ color: entry.correct ? 'green' : 'red' }}>
                    Your answer: {entry.selected} {entry.correct ? '✅' : '❌'}
                  </span><br />
                  Emotion: <strong>{entry.emotion}</strong>
                </li>
              ))}
            </ul>
          </div>

          <button className="start-btn" onClick={startQuiz}>
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          {/* Webcam + Emotion */}
          <div style={{ marginBottom: '25px', textAlign: 'center' }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              width="240"
              height="170"
              style={{
                borderRadius: '12px',
                border: '3px solid #d8bfd8',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            />
            <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold', color: '#8a2be2' }}>
              Detected Emotion: {emotion}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="question-card">
            <div className="question-number">
              Question {currentQuestion + 1} of {quizData.length}
            </div>
            <div className="question-heading">
              {quizData[currentQuestion].question}
            </div>
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
        </>
      )}
    </div>
  );
};

export default English;

