import './App.css'
import LoginForm from "./Components/Login/LoginForm";
import Register from './Components/Register/Register'
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import TextBox from './Components/TextBox/TextBox';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import ProtectedRoute from './ProtectedRoutes';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs'; // Import your AboutUs component
// import Blog from './Components/Blog/Blog';
import ForgotPassword from './Components/Login/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div id="main">
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/about" element={<AboutUs /> } />
             {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/textbox"
              element={
                <ProtectedRoute>
                
                  <NavBar />
                  <TextBox />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </div>
    </>
  );
}

export default App;