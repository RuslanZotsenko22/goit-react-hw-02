// src/App.js
// import React, { useState } from 'react';
import Feedback from './Feedback/feedback';
import Options from './Options/options';
import Notification from './Notification/notification';
import { useState } from 'react';
import { useEffect } from 'react';

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
      <h1>Sip Happens Café</h1>
      <p>Please leave your feedback about our service by selecting one of the options below.</p>
      <Options onFeedback={updateFeedback} onReset={resetFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? <Feedback feedback={feedback} total={totalFeedback} positivePercentage={positivePercentage} /> : <Notification message="No feedback yet" />}
    </div>
  );
}

export default App;