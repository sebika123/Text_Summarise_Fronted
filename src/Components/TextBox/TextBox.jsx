import React, { useState, useEffect } from 'react';
import './Styles.css';
import axios from 'axios';
// import Footer from '../Footer/Footer';

const TextBox = () => {
  const [formData, setFormData] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [inputWordCount, setInputWordCount] = useState(0);
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [percentage, setPercentage] = useState(30); // Default value is 30
  const [showOutput, setShowOutput] = useState(false); // Track whether to show output
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyFromLocalStorage = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(historyFromLocalStorage);
  }, []);

  const addToHistory = (data) => {
    const updatedHistory = [data, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      rawtext: formData,
      percentage: percentage, // Use the percentage from state
    };

    axios
      .post('http://127.0.0.1:5000/analyze', data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        setSummaryData(response.data);
        setOutputWordCount(response.data.summary.split(' ').length);
        setShowOutput(true); // Set showOutput to true after getting the response
        addToHistory({ input: formData, output: response.data.summary });
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
    setInputWordCount(e.target.value.split(' ').length);
  };

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
  };

  return (
    <div id="parent">
      <div id="txt-box">
        <form id="inp-box" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Enter Your Text Here</label>
          </div>
          <textarea cols="50" rows="10" id="txt-area" onChange={handleChange}></textarea>
          <div> Word Count: {inputWordCount}</div>
          <div>
            <label htmlFor="">Enter final Percentage you want</label>
          </div>
          <input type="number" min="1" max="99" value={percentage} onChange={handlePercentageChange} />
          <div id="btn">
            <button type="submit">Summarise</button>
          </div>
        </form>
        {showOutput && (
          <div id="out-box">
            <label htmlFor="output-area">Output</label>
            <div id="output-area">
              <div id="content">{summaryData.summary}</div>
              <div>Word Count: {outputWordCount}</div>
            </div>
          </div>
        )}
      </div>
      <div id="history">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>Input:</strong> {item.input}
              <br />
              <strong>Output:</strong> {item.output}
            </li>
          ))}
        </ul>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default TextBox;
