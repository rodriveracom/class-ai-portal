
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Announcements from '@/components/Announcements';
import Deadlines from '@/components/Deadlines';
import CourseInfo from '@/components/CourseInfo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <Announcements />
      <Deadlines />
      <CourseInfo />
      <Footer />
    </div>
  );
};

export default Index;
