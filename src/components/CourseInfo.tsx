
import React from 'react';
import { useCourse } from '@/context/CourseContext';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const CourseInfo = () => {
  const { courseData } = useCourse();
  const { professor, schedule, location } = courseData.courseDetails;

  return (
    <section id="course-info" className="py-20 bg-background">
      <div className="container-md">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="heading-lg mb-4">Course Information</h2>
          <p className="subheading max-w-2xl mx-auto">
            Important details about the course schedule and logistics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
          <Card className="subtle-card">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Professor</h3>
              <p className="text-muted-foreground">{professor}</p>
            </CardContent>
          </Card>

          <Card className="subtle-card">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Schedule</h3>
              <p className="text-muted-foreground">{schedule}</p>
            </CardContent>
          </Card>

          <Card className="subtle-card">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <p className="text-muted-foreground">{location}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <a 
            href="#" 
            className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
          >
            Download Course Syllabus
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
