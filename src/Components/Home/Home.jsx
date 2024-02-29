import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./Styles.css";
import { Link } from "react-router-dom";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Skills from"../Skills/Skills";
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
            <h1>Welcome to Text summariser </h1>
            <p>
              In the enchanting realm of literature, where words dance with
              grace and meaning, lies the profound beauty of eloquent prose.
              Within the tapestry of carefully woven sentences, each word serves
              as a brushstroke, painting vivid images that linger in the
              corridors of the reader's imagination. The symphony of language
              orchestrates a harmonious melody, captivating hearts with its
              rhythmic cadence. Every sentence, a beacon of expression,
              illuminates the path to comprehension, beckoning readers to
              explore the intricate landscapes of thought. As the narrative
              unfolds, these captivating sentences become stepping stones across
              the river of ideas, guiding the reader through the labyrinth of
              information with finesse and allure. In the grand tapestry of
              text, each sentence stands as a testament to the artistry of
              communication, drawing readers into the realm of knowledge with an
              irresistible allure.
              
              
              In the enchanting realm of literature, where words dance with grace and meaning, lies the profound beauty of eloquent prose.
Within the tapestry of carefully woven sentences, each word serves as a brushstroke, painting vivid images that linger in the
corridors of the reader's imagination. The symphony of language orchestrates a harmonious melody, captivating hearts with its
rhythmic cadence. Every sentence, a beacon of expression, illuminates the path to comprehension, beckoning readers to explore
the intricate landscapes of thought. As the narrative unfolds, these captivating sentences become stepping stones across the
river of ideas, guiding the reader through the labyrinth of information with finesse and allure. In the grand tapestry of
text, each sentence stands as a testament to the artistry of communication, drawing readers into the realm of knowledge with
an irresistible allure.

            </p>
            <p>
            For a homepage that incorporates both text and images, the design and content can be optimized to provide a visually appealing and informative user experience. The homepage might feature a carousel or hero section with dynamic images and succinct captions, creating an engaging visual introduction to the website's content.
 <p>
In terms of text summarization, the textual content on the homepage can be condensed using extractive or abstractive summarization techniques. This would involve distilling key information, such as the website's purpose, featured services, or unique selling points, into a concise and attention-grabbing summary. The summarized text can then be prominently displayed on the homepage, offering visitors a quick overview of what the website has to offer.
</p>
<p>

</p>
To enhance user interaction, a well-designed call-to-action (CTA) button can be strategically placed, encouraging users to explore further or navigate to specific sections. Additionally, incorporating responsive design principles ensures an optimal viewing experience across various devices, maintaining a cohesive and visually appealing layout. Overall, a harmonious blend of summarized text and visually appealing images creates an inviting and informative homepage for users.
            </p>
            <Link to="/textbox">
              <button style={{width:'30%',textAlign:'center',justifyContent:'center',marginLeft:'500px'}}>Click Here For Summary</button>
            </Link>
          </animated.div>
          <div id="skills">
          <Skills />
          </div>
          
      
      </div>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default Home;

