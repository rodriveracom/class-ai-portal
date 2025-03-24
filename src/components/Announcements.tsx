
import React from 'react';
import { useCourse } from '@/context/CourseContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const Announcements = () => {
  const { courseData } = useCourse();
  const { announcements } = courseData;

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <section id="announcements" className="py-20 bg-background">
      <div className="container-md">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="heading-lg mb-4">Announcements</h2>
          <p className="subheading max-w-2xl mx-auto">
            Stay updated with the latest information about the course
          </p>
        </div>

        <div className="grid gap-6 animate-slide-up">
          {announcements.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No announcements yet.</p>
              </CardContent>
            </Card>
          ) : (
            announcements.map((announcement) => (
              <Card key={announcement.id} className={`overflow-hidden ${announcement.important ? 'border-primary/20 subtle-card' : 'subtle-card'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {announcement.title}
                        {announcement.important && <Badge variant="secondary">Important</Badge>}
                      </CardTitle>
                      <CardDescription>{formatDate(announcement.date)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-pretty">{announcement.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
