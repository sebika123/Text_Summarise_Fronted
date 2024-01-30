import { React, useState } from 'react'
import './Styles.css'
import { Link,useNavigate } from 'react-router-dom'
import GoogleButton from "react-google-button";
import { useUserAuth } from '../../Context/UserAuthContext';
import TextSummarizer from '../TextSummarizer/TextSummarizer'; 

const LoginForm = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { logIn,googleSignIn } = useUserAuth()
    let navigate = useNavigate()

    const validateEmail = (Email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!regex.test(Email)) {
            const err_msg = "Enter Valid Email"
            setError(err_msg)
            return false
        }
        else
            return true
    }

    let validEmail = true

    const handleSubmit_signin_with_email_and_password = async (e) => {
        e.preventDefault();


        validEmail = validateEmail(Email)
        console.log(validEmail)

        if (validEmail) {
            setError("");
            console.log(Email)
            console.log(Password)
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
        <TextSummarizer /> {/* Add the TextSummarizer component here */}
      <form onSubmit={handleSubmit_signin_with_email_and_password} ></form>
            <form onSubmit={handleSubmit_signin_with_email_and_password} id='login-form'>
                <h1 style={{marginBottom:"20px"}}>Login</h1>
                {error && <p className='error-msg'>{error}</p>}
                <input style={{marginBottom:"20px"}} type="email" placeholder='Email' required onChange={(e)=>{setEmail(e.target.value)}}/><br />
                <input  style={{marginBottom:"20px"}}type="password" placeholder='Password' required minLength={8} onChange={(e)=>{setPassword(e.target.value)}}/><br />
                <button style={{marginBottom:"10px"}} type='submit'>Sign In</button>

                <div id="google-button-container">
    <GoogleButton onClick={handleGoogleSignIn} />
  </div>
            </form>
           
            <div className="link-container">
                <p>New User ? <Link to="/Register">Register</Link></p>
            </div>
        </>
    )
}

export default LoginForm



