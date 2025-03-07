import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState('WORLD');
  const texts = ['WORLD', 'FASTEST', 'NEWS UPDATES'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;  // Cycle through texts
      setCurrentText(texts[index]);
    }, 3000);  // Change text every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <p className="animated-text">{currentText}</p>
  );
};

export default AnimatedText;