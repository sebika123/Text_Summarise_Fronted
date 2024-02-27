import React, { useEffect, useState } from "react";
import "./Styles.css";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useHistory } from "../HistoryContext";
import logo from "../../Assests/logo.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const { history, addToHistory } = useHistory();
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  const handlePreviewClick = (index) => {
    setSelectedHistory(index);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        position: "fixed",
        width: "100%",
        // zIndex: 1000,
        marginLeft:"50",
        left:"0px",
        backgroundColor: "rgba(31, 13, 13, 0.897)",
      }}
    >
      <div className="container">
        <Link to="/home" className="navbar-brand" title="Home">
          <div className="navbar-brand-wrapper">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "20px", marginLeft: "-70px", marginTop: "70px"}}
            />
            <h1>Text Summariser</h1>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/textbox" className="nav-link" title="Summary">
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" title="About Us">
                About Us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user && (
              <>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{user.name}</span>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger mx-2"
                title="Logout"
                style={{marginTop:"40px"}}
              >
                Logout
              </button>
            )}
            <button
              onClick={handleShowHistory}
              className="btn btn-outline-danger mx-2"
              title="Show History"
              style={{marginTop:"30px",height:"30px",fontSize:"14px"}}
            >
              Show History
            </button>

            {showHistory && (
              <div className="history-overlay">
                <div className="history-sidebar">
                  <div className="history-header">
                    <h2>History</h2>
                    <button
                      onClick={() => setShowHistory(false)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ width: "20px", height: "20px", fill: "white" }}
                      >
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="history-list">
                    {history.map((entry, index) => (
                      <div
                        key={index}
                        className={`history-item ${
                          index === selectedHistory ? "selected" : ""
                        }`}
                        onClick={() => handlePreviewClick(index)}
                      >
                        <p>
                          {entry.data && entry.data.length > 0
                            ? entry.data[0]
                            : "No data"}
                        </p>
                        {index === selectedHistory && (
                          <div className="history-details">
                            {entry.data &&
                              entry.data.map((line, i) => (
                                <p key={i}>{line}</p>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
