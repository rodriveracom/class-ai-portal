
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourse } from '@/context/CourseContext';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { courseData } = useCourse();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-lg flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-tight">
              {courseData.courseDetails.title}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {courseData.courseDetails.subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <a href="#announcements" className="text-sm font-medium hover:text-primary transition-colors">
            Announcements
          </a>
          <a href="#deadlines" className="text-sm font-medium hover:text-primary transition-colors">
            Deadlines
          </a>
          <a href="#course-info" className="text-sm font-medium hover:text-primary transition-colors">
            Course Info
          </a>
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#announcements" 
              className="text-sm font-medium hover:text-primary px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Announcements
            </a>
            <a 
              href="#deadlines" 
              className="text-sm font-medium hover:text-primary px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Deadlines
            </a>
            <a 
              href="#course-info" 
              className="text-sm font-medium hover:text-primary px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Course Info
            </a>
            <Link 
              to="/admin"
              className="inline-flex"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="outline" size="sm" className="w-full justify-start">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
