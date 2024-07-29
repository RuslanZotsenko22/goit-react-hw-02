// src/App.js
// import React, { useState } from 'react';
import Feedback from './components/Feedback/feedback';
import Options from './components/Options/options';
import Notification from './components/Notification/notification';
import Description from './components/Description/description';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1
    }));
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div className="App">
      <Description />
      <Options onFeedback={updateFeedback} onReset={resetFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? <Feedback feedback={feedback} total={totalFeedback} positivePercentage={positivePercentage} /> : <Notification message="No feedback yet" />}
    </div>
  );
}

export default App;