import React, { useState, useEffect } from 'react';
import QuesCard from './QuesCard';
import '../Styles/QuizApp.css';

function QuizApp() {
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Fetch quiz data from the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/get-quiz-2`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error(err));

      // Check if the user has already submitted the quiz
      fetch(`${process.env.REACT_APP_API_URL}/api/get-student-Data`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data",data);
          if (data.score[1] !== null) {
            setHasSubmitted(true);
          }
        })
        .catch((err) => console.error('Error checking submission:', err))
      
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Prepare the data to send
    const submissionData = {
      answers, // Send the user's answers
      quizId: 1, // Optionally send an identifier for the quiz
      spreadSheetId : '1KNqpnZgGk8-5ruXzkKYS2H7EPvC1Pc7P4DDmujCMVTU',
    };

    console.log('Submission Data:', submissionData);
  
    // Send data to the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/submit-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // Backend returns the score
        setScore(data.score); // Assuming the backend sends back a score
        setHasSubmitted(true);
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
        
        {hasSubmitted ? (
          <button className='submit-btn' disabled>
            You have already submitted the quiz
          </button>
        ) : (
          <button className='submit-btn' onClick={handleSubmit}>
            Submit
          </button>
        )}          {score !== null && <h2>Your Score: {score}/{quizData.length}</h2>}
      </div>
    </div>
  );
}

export default QuizApp;