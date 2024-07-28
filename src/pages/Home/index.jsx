import React, { useEffect, useRef } from "react";
import "./style.css";

import moon from "../../images/moon.png";
import stars from "../../images/stars.png";
import mountainsBehind from "../../images/mountains_behind.png";
import mountainsFront from "../../images/mountains_front.png";

const Home = () => {
  const starsRef = useRef(null);
  const moonRef = useRef(null);
  const mountainsFrontRef = useRef(null);
  const mountainsBehindRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;

      if (starsRef.current) starsRef.current.style.left = value * 0.25 + "px";
      if (moonRef.current) moonRef.current.style.top = value * 1.05 + "px";
      if (mountainsBehindRef.current)
        mountainsBehindRef.current.style.top = value * 0.5 + "px";
      if (mountainsFrontRef.current)
        mountainsFrontRef.current.style.top = value * 0 + "px";
      if (textRef.current) {
        textRef.current.style.marginRight = value * 4 + "px";
        textRef.current.style.marginTop = value * 1.5 + "px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section>
        <img src={stars} id="stars" ref={starsRef} alt="stars" />
        <img src={moon} id="moon" ref={moonRef} alt="moon" />
        <img
          src={mountainsBehind}
          id="mountains_behind"
          ref={mountainsBehindRef}
          alt="mountains behind"
        />
        <h2 id="text" ref={textRef}>
          SyntaxStudio
        </h2>
        <a href="#sec" id="btn" ref={btnRef}>
          Get Started!
        </a>
        <img
          src={mountainsFront}
          id="mountains_front"
          ref={mountainsFrontRef}
          alt="mountains front"
        />
      </section>

      <div className="sec" id="sec"></div>
    </div>
  );
};

export default Home;
