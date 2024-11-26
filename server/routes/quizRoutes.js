const express = require("express");
const router = express.Router();
const path = require("path");
router.use(express.json());

const { google } = require('googleapis');
const { appendFile } = require("fs");

const sheets = google.sheets({ version: 'v4' });
// Fetch quiz data from Google Sheets and store it globally
async function fetchQuizData() {
  try {
    const spreadsheetId = '18qb6W6v5iMLL-1Ow6OhgmNK9aJkW-es3cMhcfSMrHr0';  // Replace with your sheet ID
    const range = 'Sheet1!A1:H10';                                      // The range you want to fetch
    const apiKey = 'AIzaSyC0vMvWvxG5kULZAXtzZ35a7_El7FTxSxk';            // Replace with your API Key
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      key: apiKey
    });

    quizData = response.data.values; // Store the quiz data globally
    console.log('Fetched quiz data:', quizData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error.message);
  }
}

// Fetch the quiz data when the server starts
fetchQuizData();

 



router.post('/api/submit-quiz', (req, res) => {
    const userAnswers = req.body.answers; // Object with questionId: userAnswer
    if (!userAnswers) {
      return res.status(400).json({ error: 'Answers are required' });
    }
    const correctAnswers = {}; // Map questionId to correct answer
  
    quizData.forEach((q) => {
      correctAnswers[q[0]] = q[6]; // Map question ID to the correct answer
    });
  
    let score = 0;
    for (const [questionId, userAnswer] of Object.entries(userAnswers)) {
      if (correctAnswers[questionId] === userAnswer) {
        score++;
      }
    }
  
    res.json({ score, total: quizData.length });
  });

  router.get('/api/get-quiz', async (req, res) => {
    const filteredQuizData = quizData.slice(1);
    console.log("quiz data",quizData);
    res.json(filteredQuizData); // Send the quiz data to the frontend
  });
  
 module.exports = router; 