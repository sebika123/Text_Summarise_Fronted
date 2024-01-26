import React, { useState } from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import logo from "./logo.png";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [ProfilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const { signUp, setUser } = useUserAuth();
  let navigate = useNavigate();

  const validateEmail = (Email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(Email)) {
      const err_msg = "Enter Valid Email";
      setError(err_msg);
      return false;
    } else return true;
  };

  let validEmail = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    validEmail = validateEmail(Email);
    console.log(validEmail);

    if (validEmail) {
      setError("");
      console.log(Email);
      console.log(Password);
      try {
        const userCredential = await signUp(Email, Password);
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: Name,
          address: Address,
          profilePicture: ProfilePicture,
        });

        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    }
  };
  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit} id="registeration-form">
        <h1>Register</h1>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          minLength={8}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input
          type="file"
          onChange={(e) => {
            setProfilePicture(e.target.files[0]);
          }}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <div className="link-container">
        <p>
          Already Registered ? <Link to="/">Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
