import './App.css';
import LoginForm from "./Components/Login/LoginForm";
import Register from './Components/Register/Register';
import { Route, Routes,} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import TextBox from './Components/TextBox/TextBox';
import { UserAuthContextProvider } from './Components/UserAuthContext';
import { HistoryProvider } from './Components/HistoryContext';  // Import HistoryProvider
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <div id="main">
        <UserAuthContextProvider>
          <HistoryProvider>  
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <>
                    <NavBar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/textbox"
                element={
                  <>
                    <NavBar />
                    <TextBox />
                  </>
                }
              />
            </Routes>
          </HistoryProvider>
        </UserAuthContextProvider>
      </div>
    </>
  );
}

export default App;