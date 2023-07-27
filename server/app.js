// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    const baseURL = 'https://api.polygon.io/v1';
    const apiKey = '6jN05keAfQSeljSh5JIpUkMsETWvzIdE';
  
    const symbol = req.body.symbol;
    const date = req.body.date;
  
    // Form validation
    if (!symbol || !date) {
      return res.status(400).json({ error: 'Invalid request. Please provide both symbol and date.' });
    }
  
    // Make sure date is in the correct format (YYYY-MM-DD)
    if (!isValidDate(date)) {
      return res.status(400).json({ error: 'Invalid date format. Please use the format YYYY-MM-DD.' });
    }
  
    axios.get(`${baseURL}/open-close/${symbol}/${date}?adjusted=true&apiKey=${apiKey}`)
      .then((response) => {
        const apiResponseData = response.data;
        res.status(200).json({ apiResponseData });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code outside the 2xx range
          console.error('Error:', error.response.data);
          res.status(error.response.status).json({ error: 'Error fetching data from the API.' });
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error:', error.request);
          res.status(500).json({ error: 'Server error. No response received from the API.' });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);
          res.status(500).json({ error: 'Server error. Something went wrong.' });
        }
      });
  });
  
  // Utility function to validate date format
  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`Listening on port ${port}`));