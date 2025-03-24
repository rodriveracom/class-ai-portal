
import React from 'react';
import { useCourse } from '@/context/CourseContext';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { courseData } = useCourse();
  const { title, subtitle, description } = courseData.courseDetails;

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
      <div className="container-lg">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-border bg-background/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            <span className="text-sm font-medium">{subtitle}</span>
          </div>
          
          <h1 className="heading-xl mb-6">{title}</h1>
          
          <p className="subheading mb-8 text-lg">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#announcements">
              <Button size="lg" className="rounded-full">
                View Announcements
              </Button>
            </a>
            <a href="#deadlines">
              <Button size="lg" variant="outline" className="rounded-full">
                Check Deadlines
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
