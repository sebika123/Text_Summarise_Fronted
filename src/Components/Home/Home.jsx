import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./Styles.css";
import { Link } from "react-router-dom";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
// import Skills from"../Skills/Skills";
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  const textContainerProps = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? "translateY(20px)" : "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return (
    <>
    <div id="home">
    <div>
      <Background />
      <div id="banner">
      <Banner />
      </div>
      <div id="home-content" className="home-container">
        
          <animated.div style={textContainerProps} className="text-container">
           
           
            <Link to="/textbox">
              <button style={{width:'20%',textAlign:'center',justifyContent:'center',marginLeft:'500px'}}>Click Here For Summary</button>
            </Link>
          </animated.div>
         
      
      </div>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default Home;

