import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useUserAuth } from "../../Context/UserAuthContext";
import { eye, eyeOff } from "ionicons/icons"; // Import eye icons from Ionicons
import { IonIcon } from "@ionic/react"; // Import IonIcon from Ionicons
import "./Styles.css";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [ProfilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const { signUp, setUser } = useUserAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      const err_msg = "Enter Valid Email";
      setError(err_msg);
      return false;
    } else return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail(Email);
    if (validEmail) {
      setError("");
      try {
        // Signup user with Firebase
        const userCredential = await signUp(Email, Password);

        // Send email verification
        const auth = getAuth();
        await sendEmailVerification(auth.currentUser);

        // Update state to indicate email verification is sent
        setEmailVerificationSent(true);

        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: Name,
          address: Address,
          profilePicture: ProfilePicture
            ? URL.createObjectURL(ProfilePicture)
            : null,
        });

        // Save the user's name and profile picture in local storage
        localStorage.setItem("name", Name);
        localStorage.setItem(
          "profilePicture",
          ProfilePicture ? URL.createObjectURL(ProfilePicture) : null
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} id="registration-form">
          <h1 style={{ marginBottom: "20px" }}>Register</h1>
          {error && <p className="error-msg">{error}</p>}
          {emailVerificationSent ? (
            <p>
              Email verification sent. Please check your email to verify your
              account.
            </p>
          ) : (
            <>
              <input
                style={{ marginBottom: "20px" }}
                type="text"
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                style={{ marginBottom: "20px" }}
                type="text"
                placeholder="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <input
                style={{ marginBottom: "20px" }}
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type={ShowPassword ? "text" : "password"}
                placeholder="Password"
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IonIcon
                icon={ShowPassword ? eye : eyeOff}
                style={{
                  position: "absolute",
                  right: "50px", // adjust here based on your icon's width
                  top: "49%",
                  transform: "translate(-50%, -50%)", // adjust here
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!ShowPassword)}
              />
              <br />
              <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
              <br />
              <button type="submit">Sign Up</button>
              <p>
                Already Registered ? <Link to="/">Sign In</Link>
              </p>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
