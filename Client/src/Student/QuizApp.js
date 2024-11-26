import React, { useState, useEffect } from 'react';
import QuesCard from './QuesCard';
import '../Styles/QuizApp.css';

function QuizApp() {
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch quiz data from the backend
    fetch('http://localhost:4000/api/get-quiz')
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error(err));
      
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Prepare the data to send
    const submissionData = {
      answers, // Send the user's answers
      quizId: 'someQuizId' // Optionally send an identifier for the quiz
    };

    console.log('Submission Data:', submissionData);
  
    // Send data to the backend
    fetch('http://localhost:4000/api/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Backend returns the score
        setScore(data.score); // Assuming the backend sends back a score
      })
      .catch((err) => console.error('Error submitting answers:', err));
  };

  return (
    <div>
      <h1 className='quiz-title'>Quiz</h1>
      <div className='quiz-container'>
          {quizData.map((q) => (
            <QuesCard  key={q[0]} q={q} handleAnswerChange={handleAnswerChange} />
          ))}
        
          <button className='submit-btn' onClick={handleSubmit}>Submit</button>
          {score !== null && <h2>Your Score: {score}/{quizData.length}</h2>}
      </div>
    </div>
  );
}

export default QuizApp;