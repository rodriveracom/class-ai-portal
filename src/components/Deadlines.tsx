
import React from 'react';
import { useCourse } from '@/context/CourseContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';

const Deadlines = () => {
  const { courseData } = useCourse();
  const { deadlines } = courseData;

  // Function to calculate days left
  const getDaysLeft = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Set both to midnight for accurate day calculation
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return formatDistance(dueDate, today, { addSuffix: false });
  };

  // Function to check if a deadline is past
  const isPastDeadline = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };

  // Function to format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="deadlines" className="py-20 bg-secondary">
      <div className="container-md">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="heading-lg mb-4">Upcoming Deadlines</h2>
          <p className="subheading max-w-2xl mx-auto">
            Keep track of important due dates and submission timelines
          </p>
        </div>

        <div className="grid gap-6 animate-slide-up">
          {deadlines.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No deadlines scheduled.</p>
              </CardContent>
            </Card>
          ) : (
            deadlines.map((deadline) => {
              const past = isPastDeadline(deadline.dueDate);
              
              return (
                <Card 
                  key={deadline.id} 
                  className={`overflow-hidden subtle-card ${past ? 'opacity-70' : ''}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {deadline.title}
                          {past ? (
                            <Badge variant="outline" className="bg-muted">Past due</Badge>
                          ) : (
                            <Badge variant="secondary">
                              Due in {getDaysLeft(deadline.dueDate)}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{formatDate(deadline.dueDate)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-pretty">{deadline.description}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Deadlines;
