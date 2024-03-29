import React, { useState } from "react";
import "./Styles.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import Carousel from '../Carousel/Carousel';
import { useHistory } from "../HistoryContext";

const TextBox = () => {
  const { history, addToHistory } = useHistory(); // Use the useHistory hook
  const [summaryData, setSummaryData] = useState({});
  const [formData, setFormData] = useState("");
  const [inputWordCount, setInputWordCount] = useState(0);
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [percentage, setPercentage] = useState(30);
  const [showOutput, setShowOutput] = useState(false);
  const [downloadFileName, setDownloadFileName] = useState("");

  const promptForFileName = () => {
    const prompt = window.prompt("Enter a file name:");
    if (prompt) {
      setDownloadFileName(prompt);
    }
  };

  const downloadTextSummary = () => {
    promptForFileName();
    if (downloadFileName) {
      const textFile = new Blob([summaryData.summary], { type: "text/plain" });
      const fileName = `${downloadFileName}.txt`;
      saveAs(textFile, fileName);
      addToHistory(summaryData.summary); // Add summary to history using addToHistory
    }
  };

  const downloadPDFSummary = () => {
    promptForFileName();
    if (downloadFileName) {
      const doc = new jsPDF();
      doc.setFontSize(12);

      const textLines = doc.splitTextToSize(
        summaryData.summary,
        doc.internal.pageSize.width - 20
      );

      textLines.forEach((line, index) => {
        doc.text(10, 10 + index * 12, line);
      });

      doc.save(`${downloadFileName}.pdf`);
      addToHistory(summaryData.summary); // Add summary to history using addToHistory
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        rawtext: formData,
        percentage: percentage,
      });

      setSummaryData(response.data); // Update this line
      setOutputWordCount(response.data.summary.split(" ").length);
      setShowOutput(true);
      addToHistory(response.data.summary); // Add summary to history using addToHistory
    } catch (error) {
      console.error("Error sending data:", error);
    }

    console.log("DATA :", formData);
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
    setInputWordCount(e.target.value.split(" ").length);
  };

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
  };

  return (
    <div id="parent" >
     <div id="cara">
     <Carousel />
      </div>
      <div id="txt-box">
        <form id="inp-box" onSubmit={handleSubmit}>
          <div class="output-container" style={{ marginBottom: "10px" }}>
            <label htmlFor="input-text-or-link">Enter Your Text Here</label>
          </div>
          {/* <div class="text-font">
            <label htmlFor="" > Enter Your Text Here</label>
          </div> */}
          <textarea
            cols="60"
            rows="15"
            id="txt-area"
            onChange={handleChange}
          ></textarea>
          <div id="wordcount-div">
            <button id="wordcount-button">
              Word Count: <span id="wordcount-value">{inputWordCount}</span>
            </button>
          </div>

          {/* <div style={{ marginBottom: "10px" ,marginTop: "10px" }}>Word Count: {inputWordCount}</div> */}
          <div
            style={{
              marginBottom: "5px",
              marginTop: "-25px",
              fontWeight: "bold",
            }}
          >
            <label htmlFor="">Enter Final Percentage you want</label>
          </div>
          <input
            type="number"
            min="1"
            max="99"
            value={percentage}
            onChange={handlePercentageChange}
          />
          <div id="btn">
            <button
              style={{ marginTop: "10px", marginTop: "-20px"}}
              type="submit"
              
            >
              Summarise
            </button>
          </div>
        </form>
        {showOutput && (
          <div id="out-box">
            <div class="output-container">
              <label for="input-text-or-link">Summary</label>
            </div>
            <div id="output-area">
              <div id="content">{summaryData.summary}</div>
            </div>
            <div id="wordcount-div">
              <button id="wordcount-button">
                Word Count: <span id="wordcount-value">{outputWordCount}</span>
              </button>
            </div>
            {/* <div style={{ marginBottom: "10px",marginTop: "15px" }}>Word Count: {outputWordCount}</div> */}
            <div id="download-buttons">
              <button
                onClick={downloadTextSummary}
                style={{
                  marginTop:'-30px',
                  marginRight: "10px",
                  backgroundColor: "lightblue",
                  color: "black",
                }}
              >
                Download Text
              </button>
              <button
                onClick={downloadPDFSummary}
                style={{ backgroundColor: "lightgreen", color: "black", marginTop:'-30px', }}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default TextBox;
