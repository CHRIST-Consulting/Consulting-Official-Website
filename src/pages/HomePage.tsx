import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Campuses from '../components/sections/Campuses';
import Services from '../components/sections/Services';
import PrimeModel from '../components/sections/PrimeModel';
import Labs from '../components/sections/Labs';
import Clients from '../components/sections/Clients';
import Masterclasses from '../components/sections/Masterclasses';
import Contact from '../components/sections/Contact';

function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main id="home">
      <Hero />
      <About />
      <Campuses />
      <Services />
      <PrimeModel />
      <Labs />
      <Clients />
      <Masterclasses />
      <Contact />
    </main>
  );
}

export default HomePage;