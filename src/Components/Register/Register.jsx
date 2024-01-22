import React, { useState } from 'react'
import './Styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../Context/UserAuthContext'

const Register = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [Address, setAddress] = useState("")
  const [ProfilePicture, setProfilePicture] = useState(null)
  const [error, setError] = useState("")
  const { signUp, setUser } = useUserAuth()
  let navigate = useNavigate()

  const validateEmail = (Email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(Email)) {
      const err_msg = "Enter Valid Email"
      setError(err_msg)
      return false
    } else
      return true
  }

  let validEmail = true

  const handleSubmit = async (e) => {
    e.preventDefault();

    validEmail = validateEmail(Email)
    console.log(validEmail)

    if (validEmail) {
      setError("");
      console.log(Email);
      console.log(Password);
      try {
        // Signup user with Firebase
        const userCredential = await signUp(Email, Password);

        // Update user details (Name, Address, ProfilePicture) in your database
        // Here, you might use Firebase Firestore or Realtime Database
        // Example: await updateUserData(userCredential.user.uid, { Name, Address, ProfilePicture });

        // Set user details in the context
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: Name,
          address: Address,
          profilePicture: ProfilePicture,
        });

        // Navigate to the Home page after successful registration
        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    }
  };
    return (
        <>
            <form onSubmit={handleSubmit} id='registeration-form'>
                <h1>Register</h1>
                {error && <p className='error-msg'>{error}</p>}
                <input type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} /><br />
                <input type="text" placeholder='Address' onChange={(e) => { setAddress(e.target.value) }} /><br />
                <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} /><br />
                <input type="password" placeholder='Password' minLength={8} onChange={(e) => { setPassword(e.target.value) }} /><br />
                <input type="file" onChange={(e) => { setProfilePicture(e.target.files[0]) }} /><br />
                <button type='submit'>Sign Up</button>
            </form>
            <div className="link-container">
                <p>Already Registered ? <Link to="/">Sign In</Link></p>
            </div>
        </>
    )
}

export default Register