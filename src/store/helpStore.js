import { create } from 'zustand';

const mockHelpRequests = [
  {
    id: 'help_1',
    userId: 'user_1',
    userName: 'Jane Smith',
    lessonId: 'lesson_1_2',
    courseTitle: 'JavaScript Fundamentals',
    lessonTitle: 'Functions and Scope',
    question: 'I\'m confused about the difference between function declarations and function expressions. Can someone explain?',
    status: 'open',
    bountyZara: 3,
    createdAt: '2024-01-26T10:30:00Z',
    answers: [],
  },
  {
    id: 'help_2',
    userId: 'user_2',
    userName: 'Mike Johnson',
    lessonId: 'lesson_2_1',
    courseTitle: 'React Hooks Mastery',
    lessonTitle: 'useState Hook',
    question: 'Why does my component re-render infinitely when I call setState inside useEffect?',
    status: 'answered',
    bountyZara: 5,
    createdAt: '2024-01-26T08:15:00Z',
    answers: [
      {
        id: 'answer_1',
        userId: 'user_3',
        userName: 'Sarah Chen',
        answer: 'This happens because you\'re missing the dependency array in useEffect. Without it, useEffect runs after every render, causing an infinite loop. Add an empty dependency array [] if you want it to run only once.',
        isAccepted: true,
        zaraEarned: 5,
        createdAt: '2024-01-26T08:45:00Z',
      },
    ],
  },
  {
    id: 'help_3',
    userId: 'user_4',
    userName: 'Lisa Wong',
    lessonId: 'lesson_3_1',
    courseTitle: 'Python Data Science',
    lessonTitle: 'Introduction to Pandas',
    question: 'How do I handle missing values in a pandas DataFrame? What\'s the best practice?',
    status: 'open',
    bountyZara: 4,
    createdAt: '2024-01-26T12:00:00Z',
    answers: [],
  },
];

export const useHelpStore = create((set, get) => ({
  helpRequests: [],
  
  initializeHelpRequests: () => {
    set({ helpRequests: mockHelpRequests });
  },
  
  createHelpRequest: (request) => {
    const { helpRequests } = get();
    const newRequest = {
      ...request,
      id: `help_${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      answers: [],
    };
    set({ helpRequests: [newRequest, ...helpRequests] });
    return newRequest;
  },
  
  addAnswer: (helpRequestId, answer) => {
    const { helpRequests } = get();
    const updatedRequests = helpRequests.map(request => {
      if (request.id === helpRequestId) {
        const newAnswer = {
          ...answer,
          id: `answer_${Date.now()}`,
          isAccepted: false,
          zaraEarned: 0,
          createdAt: new Date().toISOString(),
        };
        return {
          ...request,
          answers: [...request.answers, newAnswer],
        };
      }
      return request;
    });
    set({ helpRequests: updatedRequests });
  },
  
  acceptAnswer: (helpRequestId, answerId) => {
    const { helpRequests } = get();
    const updatedRequests = helpRequests.map(request => {
      if (request.id === helpRequestId) {
        const updatedAnswers = request.answers.map(answer => 
          answer.id === answerId 
            ? { ...answer, isAccepted: true, zaraEarned: request.bountyZara }
            : answer
        );
        return {
          ...request,
          status: 'answered',
          answers: updatedAnswers,
        };
      }
      return request;
    });
    set({ helpRequests: updatedRequests });
  },
  
  getOpenRequests: () => {
    const { helpRequests } = get();
    return helpRequests.filter(request => request.status === 'open');
  },
}));