
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseData, Announcement, Deadline, CourseDetails } from '../types';

// Initial course data
const initialCourseData: CourseData = {
  courseDetails: {
    title: "Building AI Products",
    subtitle: "ITAM - Fall 2023",
    description: "Learn how to design, develop, and deploy artificial intelligence products from concept to market. This course covers the entire lifecycle of AI product development, including ethical considerations, technical implementation, and business strategy.",
    professor: "Dr. Maya Rodriguez",
    schedule: "Mondays and Wednesdays, 10:00 AM - 12:00 PM",
    location: "Building A, Room 302"
  },
  announcements: [
    {
      id: "1",
      title: "Welcome to the Course",
      content: "Welcome to Building AI Products! Please review the syllabus and come prepared for our first class session.",
      date: "2023-08-15",
      important: true
    },
    {
      id: "2",
      title: "First Assignment Posted",
      content: "The first assignment on AI Ethics has been posted. Due date is September 5th.",
      date: "2023-08-18"
    },
    {
      id: "3",
      title: "Guest Lecture Announcement",
      content: "We will have a guest lecture by Dr. James Chen from OpenAI on September 10th.",
      date: "2023-08-25",
      important: true
    }
  ],
  deadlines: [
    {
      id: "1",
      title: "AI Ethics Assignment",
      description: "Write a 3-page paper on ethical considerations in AI product development.",
      dueDate: "2023-09-05"
    },
    {
      id: "2",
      title: "Project Proposal",
      description: "Submit a 2-page proposal for your final project, including problem statement, proposed solution, and technical approach.",
      dueDate: "2023-09-15"
    },
    {
      id: "3",
      title: "Midterm Exam",
      description: "In-class exam covering topics from weeks 1-6.",
      dueDate: "2023-10-10"
    },
    {
      id: "4",
      title: "Final Project Presentation",
      description: "Present your final AI product project to the class.",
      dueDate: "2023-11-30"
    }
  ]
};

// Create the context
type CourseContextType = {
  courseData: CourseData;
  updateCourseDetails: (details: CourseDetails) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  addDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  updateDeadline: (deadline: Deadline) => void;
  deleteDeadline: (id: string) => void;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the provider component
export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load data from localStorage, otherwise use initial data
  const [courseData, setCourseData] = useState<CourseData>(() => {
    const savedData = localStorage.getItem('courseData');
    return savedData ? JSON.parse(savedData) : initialCourseData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courseData', JSON.stringify(courseData));
  }, [courseData]);

  const updateCourseDetails = (details: CourseDetails) => {
    setCourseData(prev => ({
      ...prev,
      courseDetails: details
    }));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: generateId(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setCourseData(prev => ({
      ...prev,
      announcements: [newAnnouncement, ...prev.announcements]
    }));
  };

  const updateAnnouncement = (announcement: Announcement) => {
    setCourseData(prev => ({
      ...prev,
      announcements: prev.announcements.map(a => 
        a.id === announcement.id ? announcement : a
      )
    }));
  };

  const deleteAnnouncement = (id: string) => {
    setCourseData(prev => ({
      ...prev,
      announcements: prev.announcements.filter(a => a.id !== id)
    }));
  };

  const addDeadline = (deadline: Omit<Deadline, 'id'>) => {
    const newDeadline: Deadline = {
      ...deadline,
      id: generateId()
    };
    
    setCourseData(prev => ({
      ...prev,
      deadlines: [...prev.deadlines, newDeadline].sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    }));
  };

  const updateDeadline = (deadline: Deadline) => {
    setCourseData(prev => ({
      ...prev,
      deadlines: prev.deadlines.map(d => 
        d.id === deadline.id ? deadline : d
      ).sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    }));
  };

  const deleteDeadline = (id: string) => {
    setCourseData(prev => ({
      ...prev,
      deadlines: prev.deadlines.filter(d => d.id !== id)
    }));
  };

  return (
    <CourseContext.Provider value={{
      courseData,
      updateCourseDetails,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addDeadline,
      updateDeadline,
      deleteDeadline
    }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook for using the context
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
