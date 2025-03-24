
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important?: boolean;
}

export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
}

export interface CourseDetails {
  title: string;
  subtitle: string;
  description: string;
  professor: string;
  schedule: string;
  location: string;
}

export interface CourseData {
  courseDetails: CourseDetails;
  announcements: Announcement[];
  deadlines: Deadline[];
}
