import React, { useEffect, useState } from "react";
import questions from "../questions.json";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    return parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
  });
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem("score")) || 0;
  });
  const [timeRemaining, setTimeRemaining] = useState(() => {
    return parseInt(localStorage.getItem("timeRemaining")) || 600;
  });
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isFullScreen) {
      alert("Please enable full-screen mode to take the quiz.");
    }
  }, [isFullScreen]);

  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  }, [currentQuestionIndex]);
  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem("timeRemaining", timeRemaining);
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          clearInterval(interval);
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("timeRemaining", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFullScreenRequest = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleAnswerOptionClick = (answer) => {
    if (questions[currentQuestionIndex].answer === answer) {
      // Correct answer logic
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestion);
  };
  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <p>Congrats !!! You have completed the quiz </p>
        <p>Your Score is: {score}</p>
        <p>Please Close the Window </p>
      </div>
    );
  }
  if (!isFullScreen) {
    return (
      <div>
        <h1>Please enable full-screen mode to take the quiz.</h1>
        <button onClick={handleFullScreenRequest}>Enable Full-Screen</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
      </h2>
      <h3>{questions[currentQuestionIndex].question}</h3>
        <div className="buttonConatainer">
        {questions[currentQuestionIndex].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswerOptionClick(option)}>
          {option}
        </button>
      ))}
        </div>
    </div>
  );
};

export default Quiz;
