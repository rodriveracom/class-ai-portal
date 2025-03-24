
import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '@/context/CourseContext';

const Footer = () => {
  const { courseData } = useCourse();
  const { title, subtitle } = courseData.courseDetails;
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg leading-tight">{title}</span>
                <span className="text-xs text-muted-foreground leading-tight">{subtitle}</span>
              </div>
            </Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} ITAM. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
