import React, { useEffect } from 'react';
import Teams from '../components/sections/Teams';

const TeamsPage = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <main className="pt-16">
      <Teams />
    </main>
  );
};

export default TeamsPage;