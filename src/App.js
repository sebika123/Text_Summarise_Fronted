import './App.css'
import LoginForm from "./Components/Login/LoginForm";
import Register from './Components/Register/Register'
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import TextBox from './Components/TextBox/TextBox';
import { UserAuthContextProvider } from './Components/UserAuthContext';
import ProtectedRoute from './ProtectedRoutes';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <>
      <div id="main">
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <Home />
                  <Footer/>
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