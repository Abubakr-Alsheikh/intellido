import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HomePageTransition = ({ children }) => {
  const pageContainerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageContainerRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' }
    );
  }, []);

  return <div ref={pageContainerRef}>{children}</div>;
};

export default HomePageTransition;