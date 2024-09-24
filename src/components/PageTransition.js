// components/PageTransition.js
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const pageContainerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ autoRemoveChildren: true });

    tl.fromTo(
      pageContainerRef.current,
      { opacity: 0, scale: 0.95 }, // Start slightly scaled down and faded out
      {
        opacity: 1,
        scale: 1,
        duration: 0.5, 
        ease: 'power2.inOut', // Smooth easing for a modern feel
      }
    );

    return () => tl.kill(); // Clean up the timeline
  }, [location]); 

  return <div ref={pageContainerRef}>{children}</div>;
};

export default PageTransition;