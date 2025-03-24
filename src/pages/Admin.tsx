
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { X, ArrowLeft, CalendarIcon } from 'lucide-react';
import { useCourse } from '@/context/CourseContext';
import { Announcement, Deadline, CourseDetails } from '@/types';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courseInfo');
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'announcement' | 'deadline'>('announcement');
  
  const { 
    courseData, 
    updateCourseDetails, 
    addAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement,
    addDeadline,
    updateDeadline,
    deleteDeadline
  } = useCourse();
  
  // Course Info Form
  const courseInfoForm = useForm({
    defaultValues: courseData.courseDetails
  });
  
  // Announcement Form
  const announcementForm = useForm({
    defaultValues: {
      title: '',
      content: '',
      important: false
    }
  });
  
  // Deadline Form
  const deadlineForm = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0]
    }
  });
  
  // Handle Course Info Submit
  const onCourseInfoSubmit = (data: CourseDetails) => {
    updateCourseDetails(data);
    toast.success('Course information updated successfully');
  };
  
  // Handle Announcement Submit
  const onAnnouncementSubmit = (data: { title: string; content: string; important: boolean }) => {
    if (editingAnnouncement) {
      updateAnnouncement({
        ...editingAnnouncement,
        ...data
      });
      toast.success('Announcement updated successfully');
    } else {
      addAnnouncement(data);
      toast.success('Announcement added successfully');
    }
    
    announcementForm.reset({
      title: '',
      content: '',
      important: false
    });
    setEditingAnnouncement(null);
  };
  
  // Handle Deadline Submit
  const onDeadlineSubmit = (data: { title: string; description: string; dueDate: string }) => {
    if (editingDeadline) {
      updateDeadline({
        ...editingDeadline,
        ...data
      });
      toast.success('Deadline updated successfully');
    } else {
      addDeadline(data);
      toast.success('Deadline added successfully');
    }
    
    deadlineForm.reset({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0]
    });
    setEditingDeadline(null);
  };
  
  // Handle Edit Announcement
  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    announcementForm.reset({
      title: announcement.title,
      content: announcement.content,
      important: announcement.important || false
    });
  };
  
  // Handle Edit Deadline
  const handleEditDeadline = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    deadlineForm.reset({
      title: deadline.title,
      description: deadline.description,
      dueDate: deadline.dueDate
    });
  };
  
  // Handle Delete Confirmation
  const handleDeleteConfirm = () => {
    if (!confirmDeleteId) return;
    
    if (deleteType === 'announcement') {
      deleteAnnouncement(confirmDeleteId);
      toast.success('Announcement deleted successfully');
    } else {
      deleteDeadline(confirmDeleteId);
      toast.success('Deadline deleted successfully');
    }
    
    setConfirmDeleteId(null);
  };
  
  // Format Date for Display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container-lg py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Link>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </div>
      </header>
      
      <main className="container-lg py-8 animate-fade-in">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="courseInfo">Course Info</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          </TabsList>
          
          {/* Course Info Tab */}
          <TabsContent value="courseInfo">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Update the basic information about your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...courseInfoForm}>
                  <form onSubmit={courseInfoForm.handleSubmit(onCourseInfoSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={courseInfoForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={courseInfoForm.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Subtitle</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={courseInfoForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Description</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={courseInfoForm.control}
                      name="professor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professor</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={courseInfoForm.control}
                        name="schedule"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={courseInfoForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save Course Information</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              {/* Announcement Form */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>{editingAnnouncement ? 'Edit Announcement' : 'Add Announcement'}</CardTitle>
                  <CardDescription>
                    {editingAnnouncement ? 'Update an existing announcement' : 'Create a new announcement for your course'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...announcementForm}>
                    <form onSubmit={announcementForm.handleSubmit(onAnnouncementSubmit)} className="space-y-6">
                      <FormField
                        control={announcementForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={announcementForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={announcementForm.control}
                        name="important"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Mark as Important</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex space-x-2">
                        <Button type="submit">
                          {editingAnnouncement ? 'Update' : 'Add'} Announcement
                        </Button>
                        {editingAnnouncement && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setEditingAnnouncement(null);
                              announcementForm.reset({
                                title: '',
                                content: '',
                                important: false
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Announcements List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>All Announcements</CardTitle>
                  <CardDescription>
                    Manage and edit your course announcements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.announcements.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">No announcements yet.</p>
                    ) : (
                      courseData.announcements.map((announcement) => (
                        <div 
                          key={announcement.id} 
                          className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{announcement.title}</h3>
                              {announcement.important && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                  Important
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{formatDate(announcement.date)}</p>
                          </div>
                          <div className="flex space-x-2 ml-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditAnnouncement(announcement)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => {
                                setConfirmDeleteId(announcement.id);
                                setDeleteType('announcement');
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Deadlines Tab */}
          <TabsContent value="deadlines">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              {/* Deadline Form */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>{editingDeadline ? 'Edit Deadline' : 'Add Deadline'}</CardTitle>
                  <CardDescription>
                    {editingDeadline ? 'Update an existing deadline' : 'Create a new deadline for your course'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...deadlineForm}>
                    <form onSubmit={deadlineForm.handleSubmit(onDeadlineSubmit)} className="space-y-6">
                      <FormField
                        control={deadlineForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={deadlineForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={deadlineForm.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? 
                                      format(new Date(field.value), "PPP") : 
                                      <span>Pick a date</span>
                                    }
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex space-x-2">
                        <Button type="submit">
                          {editingDeadline ? 'Update' : 'Add'} Deadline
                        </Button>
                        {editingDeadline && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setEditingDeadline(null);
                              deadlineForm.reset({
                                title: '',
                                description: '',
                                dueDate: new Date().toISOString().split('T')[0]
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Deadlines List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>All Deadlines</CardTitle>
                  <CardDescription>
                    Manage and edit your course deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.deadlines.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">No deadlines yet.</p>
                    ) : (
                      courseData.deadlines.map((deadline) => (
                        <div 
                          key={deadline.id} 
                          className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                          <div>
                            <h3 className="font-medium mb-1">{deadline.title}</h3>
                            <p className="text-sm text-muted-foreground">Due: {formatDate(deadline.dueDate)}</p>
                          </div>
                          <div className="flex space-x-2 ml-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditDeadline(deadline)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => {
                                setConfirmDeleteId(deadline.id);
                                setDeleteType('deadline');
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this {deleteType}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;
