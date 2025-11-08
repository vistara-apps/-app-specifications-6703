import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  user: null,
  
  initializeUser: (walletAddress) => {
    const existingUser = localStorage.getItem(`zaralearn_user_${walletAddress}`);
    
    if (existingUser) {
      set({ user: JSON.parse(existingUser) });
    } else {
      const newUser = {
        fid: `fid_${Date.now()}`,
        walletAddress,
        zaraBalance: 10, // Starter tokens
        totalEarned: 10,
        totalSpent: 0,
        reputationScore: 0,
        joinedAt: new Date().toISOString(),
        learningStreak: 0,
        completedCourses: [],
        enrolledCourses: [],
        helpRequestsAnswered: 0,
        coursesCreated: 0,
      };
      
      localStorage.setItem(`zaralearn_user_${walletAddress}`, JSON.stringify(newUser));
      set({ user: newUser });
    }
  },
  
  updateBalance: (amount) => {
    const { user } = get();
    if (!user) return;
    
    const updatedUser = {
      ...user,
      zaraBalance: user.zaraBalance + amount,
      totalEarned: amount > 0 ? user.totalEarned + amount : user.totalEarned,
      totalSpent: amount < 0 ? user.totalSpent + Math.abs(amount) : user.totalSpent,
    };
    
    localStorage.setItem(`zaralearn_user_${user.walletAddress}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
  
  enrollInCourse: (courseId) => {
    const { user } = get();
    if (!user) return;
    
    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, {
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completedLessons: [],
      }],
    };
    
    localStorage.setItem(`zaralearn_user_${user.walletAddress}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
  
  completeLesson: (courseId, lessonId, zaraEarned) => {
    const { user } = get();
    if (!user) return;
    
    const enrolledCourseIndex = user.enrolledCourses.findIndex(ec => ec.courseId === courseId);
    if (enrolledCourseIndex === -1) return;
    
    const enrolledCourse = user.enrolledCourses[enrolledCourseIndex];
    if (enrolledCourse.completedLessons.includes(lessonId)) return;
    
    const updatedEnrolledCourses = [...user.enrolledCourses];
    updatedEnrolledCourses[enrolledCourseIndex] = {
      ...enrolledCourse,
      completedLessons: [...enrolledCourse.completedLessons, lessonId],
      progress: enrolledCourse.progress + 1,
    };
    
    const updatedUser = {
      ...user,
      enrolledCourses: updatedEnrolledCourses,
      zaraBalance: user.zaraBalance + zaraEarned,
      totalEarned: user.totalEarned + zaraEarned,
      learningStreak: user.learningStreak + 1,
    };
    
    localStorage.setItem(`zaralearn_user_${user.walletAddress}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
  
  updateReputation: (points) => {
    const { user } = get();
    if (!user) return;
    
    const updatedUser = {
      ...user,
      reputationScore: user.reputationScore + points,
    };
    
    localStorage.setItem(`zaralearn_user_${user.walletAddress}`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));