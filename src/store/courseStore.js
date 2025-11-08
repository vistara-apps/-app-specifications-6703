import { create } from 'zustand';

const mockCourses = [
  {
    id: 'course_1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming from variables to functions.',
    creatorFid: 'creator_1',
    creatorName: 'Sarah Chen',
    priceInZara: 8,
    difficulty: 'beginner',
    totalLessons: 5,
    averageRating: 4.8,
    totalEnrollments: 234,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
    lessons: [
      {
        id: 'lesson_1_1',
        title: 'Variables and Data Types',
        contentType: 'text',
        content: 'JavaScript variables are containers for storing data values. You can declare variables using var, let, or const keywords...',
        earnableZara: 2,
        estimatedMinutes: 15,
        sequence: 1,
      },
      {
        id: 'lesson_1_2',
        title: 'Functions and Scope',
        contentType: 'text',
        content: 'Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition...',
        earnableZara: 2,
        estimatedMinutes: 20,
        sequence: 2,
      },
      {
        id: 'lesson_1_3',
        title: 'Arrays and Objects',
        contentType: 'text',
        content: 'Arrays store multiple values in a single variable, while objects store key-value pairs. Both are essential data structures...',
        earnableZara: 3,
        estimatedMinutes: 25,
        sequence: 3,
      },
    ],
  },
  {
    id: 'course_2',
    title: 'React Hooks Mastery',
    description: 'Master React Hooks and build modern, efficient React applications.',
    creatorFid: 'creator_2',
    creatorName: 'Alex Rodriguez',
    priceInZara: 15,
    difficulty: 'intermediate',
    totalLessons: 8,
    averageRating: 4.9,
    totalEnrollments: 156,
    status: 'published',
    createdAt: '2024-01-20T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    lessons: [
      {
        id: 'lesson_2_1',
        title: 'useState Hook',
        contentType: 'text',
        content: 'The useState hook allows you to add state to functional components. It returns an array with the current state value and a setter function...',
        earnableZara: 3,
        estimatedMinutes: 30,
        sequence: 1,
      },
      {
        id: 'lesson_2_2',
        title: 'useEffect Hook',
        contentType: 'text',
        content: 'useEffect lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount...',
        earnableZara: 3,
        estimatedMinutes: 35,
        sequence: 2,
      },
    ],
  },
  {
    id: 'course_3',
    title: 'Python Data Science',
    description: 'Learn data analysis and visualization with Python, pandas, and matplotlib.',
    creatorFid: 'creator_3',
    creatorName: 'Dr. Maria Santos',
    priceInZara: 25,
    difficulty: 'intermediate',
    totalLessons: 12,
    averageRating: 4.7,
    totalEnrollments: 89,
    status: 'published',
    createdAt: '2024-01-25T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    lessons: [
      {
        id: 'lesson_3_1',
        title: 'Introduction to Pandas',
        contentType: 'text',
        content: 'Pandas is a powerful data manipulation library for Python. It provides data structures like DataFrame and Series for handling structured data...',
        earnableZara: 4,
        estimatedMinutes: 40,
        sequence: 1,
      },
    ],
  },
  {
    id: 'course_4',
    title: 'Web Design Basics',
    description: 'Learn the fundamentals of web design including HTML, CSS, and design principles.',
    creatorFid: 'creator_4',
    creatorName: 'Emma Thompson',
    priceInZara: 12,
    difficulty: 'beginner',
    totalLessons: 6,
    averageRating: 4.6,
    totalEnrollments: 178,
    status: 'published',
    createdAt: '2024-01-18T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop',
    lessons: [
      {
        id: 'lesson_4_1',
        title: 'HTML Structure',
        contentType: 'text',
        content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page...',
        earnableZara: 2,
        estimatedMinutes: 20,
        sequence: 1,
      },
    ],
  },
];

export const useCourseStore = create((set, get) => ({
  courses: [],
  
  initializeCourses: () => {
    set({ courses: mockCourses });
  },
  
  getCourseById: (id) => {
    const { courses } = get();
    return courses.find(course => course.id === id);
  },
  
  enrollInCourse: (courseId) => {
    const { courses } = get();
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, totalEnrollments: course.totalEnrollments + 1 }
        : course
    );
    set({ courses: updatedCourses });
  },
  
  filterCourses: (difficulty, searchTerm) => {
    const { courses } = get();
    return courses.filter(course => {
      const matchesDifficulty = !difficulty || course.difficulty === difficulty;
      const matchesSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
  },
}));