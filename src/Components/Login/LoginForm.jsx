import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../Context/UserAuthContext";
import TextSummarizer from "../TextSummarizer/TextSummarizer";
import { getAuth } from "firebase/auth"; // Corrected import
import { eye, eyeOff } from "ionicons/icons"; // Import eye icons from Ionicons
import { IonIcon } from "@ionic/react"; // Import IonIcon from Ionicons
import "./Styles.css";

const LoginForm = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      const err_msg = "Enter Valid Email";
      setError(err_msg);
      return false;
    } else return true;
  };

  const handleSubmitSignInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    const authInstance = getAuth();

    const validEmail = validateEmail(Email);

    if (validEmail) {
      setError("");
      try {
        await logIn(Email, Password);
        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <TextSummarizer />
      <form onSubmit={handleSubmitSignInWithEmailAndPassword} id="login-form">
        <h1 style={{ marginBottom: "20px" }}>Login</h1>
        {error && <p className="error-msg">{error}</p>}
        <input
          style={{ marginBottom: "20px" }}
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <div style={{ position: "relative" }}>
          <input
            style={{ marginBottom: "20px" }}
            type={ShowPassword ? "text" : "password"}
            placeholder="Password"
            required
            minLength={8}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <IonIcon
            icon={ShowPassword ? eye : eyeOff}
            style={{
              position: "absolute",
              right: "8px", // adjust here based on your icon's width
              top: "38%",
              transform: "translate(-50%, -50%)", // adjust here
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!ShowPassword)}
          />
        </div>
        <br />
        <button style={{ marginBottom: "10px" }} type="submit">
          Sign In
        </button>
        <Link to="/forgot-password" className="forgot-password-option">
          Forgot Password?
        </Link>
        <div id="google-button-container">
          <GoogleButton onClick={handleGoogleSignIn} />
          <p>
            New User? <Link to="/Register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
