import React, { useState } from "react";
import "./Styles.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import Tracker from "./Tracker";

const TextBox = () => {
  const [summaryData, setSummaryData] = useState({});
  const [formData, setFormData] = useState("");

  const [inputWordCount, setInputWordCount] = useState(0);
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [percentage, setPercentage] = useState(30); // Default value is 30
  const [showOutput, setShowOutput] = useState(false); // Track whether to show output
  const [downloadFileName, setDownloadFileName] = useState("");

  const [numSummaries, setNumSummaries] = useState(0);
  const [numTxtDownloads, setNumTxtDownloads] = useState(0);
  const [numPdfDownloads, setNumPdfDownloads] = useState(0);

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
      setNumTxtDownloads(numTxtDownloads + 1);
      // Tracker.incrementTxtDownloads(); // Call the increment function after download
    }
  };

  const downloadPDFSummary = () => {
    promptForFileName(); // Prompt for filename before creating the PDF

    if (downloadFileName) {
      // Proceed only if a filename is provided
      const doc = new jsPDF();
      doc.setFontSize(12); // Set font size

      const textLines = doc.splitTextToSize(
        summaryData.summary,
        doc.internal.pageSize.width - 20
      );

      textLines.forEach((line, index) => {
        doc.text(10, 10 + index * 12, line);
      });

      doc.save(`${downloadFileName}.pdf`); // Use the user-provided filename
      // Tracker.incrementPdfDownloads();
      setNumPdfDownloads(numPdfDownloads + 1);
    }
  };

  const handleNumSummariesChange = (num) => {
    setNumSummaries(num);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      rawtext: formData,
      percentage: percentage,
    };

    axios
      .post("http://127.0.0.1:5000/analyze", data)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        setSummaryData(response.data.summary);
        setOutputWordCount(response.data.summary.split(" ").length);
        setShowOutput(true); // Set showOutput to true after getting the response
        Tracker.incrementNumSummaries(); // Call the increment function from Tracker
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
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
    <div id="parent">
      <div id="txt-box">
        <form id="inp-box" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Enter Your Text Here</label>
          </div>
          <textarea
            cols="30"
            rows="10"
            id="txt-area"
            onChange={handleChange}
          ></textarea>
          <div style={{ marginBottom: "10px" }}>
            Word Count: {inputWordCount}
          </div>
          <div style={{ marginBottom: "10px" }}>
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
            <button style={{ marginTop: "10px" }} type="submit">
              Summarise
            </button>
          </div>
        </form>
        {showOutput && (
          <div id="out-box">
            <div>
              <label htmlFor="output-area">Output</label>
            </div>
            <div id="output-area">
              <div id="content">{summaryData.summary}</div>
            </div>
            <div>Word Count: {outputWordCount}</div>
            <div id="download-buttons">
              <button
                onClick={downloadTextSummary}
                style={{
                  marginRight: "10px",
                  backgroundColor: "lightblue",
                  color: "black",
                }}
              >
                Download Text
              </button>
              <button
                onClick={downloadPDFSummary}
                style={{ backgroundColor: "lightgreen", color: "black" }}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
      <Tracker
        onNumSummariesChange={handleNumSummariesChange}
        onNumTxtDownloadsChange={setNumTxtDownloads}
        onNumPdfDownloadsChange={setNumPdfDownloads}
      />
      <Footer />
    </div>
  );
};

export default TextBox;
