import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from './StockForm.module.css';
import StockTable from '../StockTable/StockTable';

const StockForm = () => {
  const [date, setDate] = useState('');
  const [symbol, setSymbol] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const CustomToast = ({ message }) => {
    return (
      <div style={{ fontSize: '16px' }}>
        <span style={{ marginRight: '8px' }}>❗</span>
        {message}
      </div>
    );
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    if (!symbol.trim()) {
      setError('Please enter a stock symbol.');
      return;
    }

    if (!date) {
      setError('Please select a date.');
      return;
    }

    setError(null);
    setIsLoading(true);

    const formattedDate = new Date(date).toISOString().slice(0, 10);
    const baseURL = 'http://localhost:5004'; // Replace with your server URL

    const requestBody = {
      symbol: symbol,
      date: formattedDate,
    };

    try {
      const response = await axios.post(`${baseURL}/api/fetchStockData`, requestBody);

      // Handle the response from the server if needed
      console.log('Server Response:', response.data.apiResponseData);
      const myResponse = response.data.apiResponseData;
      const formattedPayload = {
        Open: myResponse.open,
        Close: myResponse.close,
        High: myResponse.high,
        Low: myResponse.low,
        Volume: myResponse.volume,
      };
      setApiResponse(formattedPayload);
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error fetching data from the API.');
      toast.error(<CustomToast message="Error fetching data from the API." />);
      setApiResponse(null);
    } finally {
      setIsLoading(false);
    }

    console.log('Date:', date);
    console.log('Symbol:', symbol);

    // Reset the form after successful submission
    setDate('');
    setSymbol('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles['stock-form-container']}>
        <label className={styles['form-label']}>
          Stock Symbol:
          <input
            type="text"
            value={symbol}
            onChange={handleSymbolChange}
            placeholder="Enter stock symbol"
            required
            className={styles['form-input']}
          />
        </label>
        <label className={styles['form-label']}>
          Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
            className={styles['form-input']}
          />
        </label>
        <button type="submit" className={styles['form-button']} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <ToastContainer
        style={{ width: "120px", height:"20px", position: "absolute", top: "0px", right: "0px"}}
        toastClassName={styles['custom-toast']}
      />
      {error ? <p>{error}</p> : apiResponse ? <StockTable tableData={apiResponse} /> : null}
    </div>
  );
};

export default StockForm;
