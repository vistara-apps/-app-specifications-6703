import React, { useState } from 'react';
import { ArrowLeft, Star, Users, Clock, Coins, Play, CheckCircle, Lock } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useCourseStore } from '../store/courseStore';

const CourseDetail = ({ course, onBack, onLessonSelect }) => {
  const [enrolling, setEnrolling] = useState(false);
  const { user, updateBalance, enrollInCourse } = useUserStore();
  const { enrollInCourse: updateCourseStats } = useCourseStore();

  const isEnrolled = user?.enrolledCourses?.some(ec => ec.courseId === course.id);
  const enrolledCourse = user?.enrolledCourses?.find(ec => ec.courseId === course.id);
  const canAfford = user?.zaraBalance >= course.priceInZara;

  const handleEnroll = async () => {
    if (!canAfford || enrolling || isEnrolled) return;

    setEnrolling(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      updateBalance(-course.priceInZara);
      enrollInCourse(course.id);
      updateCourseStats(course.id);
      setEnrolling(false);
    }, 1500);
  };

  const isLessonCompleted = (lessonId) => {
    return enrolledCourse?.completedLessons?.includes(lessonId) || false;
  };

  const canAccessLesson = (lessonIndex) => {
    if (!isEnrolled) return false;
    if (lessonIndex === 0) return true;
    return isLessonCompleted(course.lessons[lessonIndex - 1]?.id);
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold truncate">Course Details</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Course Header */}
        <div>
          <h1 className="text-xl font-bold mb-2">{course.title}</h1>
          <p className="text-text-muted text-sm mb-4">{course.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-current" />
              {course.averageRating}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.totalEnrollments} students
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.totalLessons} lessons
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">By {course.creatorName}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                course.difficulty === 'beginner' ? 'text-success bg-success/10' :
                course.difficulty === 'intermediate' ? 'text-warning bg-warning/10' :
                'text-error bg-error/10'
              }`}>
                {course.difficulty}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-accent font-bold">
              <Coins className="w-5 h-5" />
              {course.priceInZara} $zara
            </div>
          </div>
        </div>

        {/* Enrollment Status */}
        {!isEnrolled ? (
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Ready to start learning?</h3>
            <p className="text-text-muted text-sm mb-4">
              Enroll now and get access to all {course.totalLessons} lessons. 
              Earn $zara by completing lessons!
            </p>
            
            {!canAfford ? (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
                <p className="text-error text-sm">
                  You need {course.priceInZara - user.zaraBalance} more $zara to enroll. 
                  Complete lessons or help other students to earn more!
                </p>
              </div>
            ) : null}

            <button
              onClick={handleEnroll}
              disabled={!canAfford || enrolling}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                canAfford && !enrolling
                  ? 'btn-primary'
                  : 'bg-surface-hover text-text-muted cursor-not-allowed'
              }`}
            >
              {enrolling ? 'Enrolling...' : `Enroll for ${course.priceInZara} $zara`}
            </button>
          </div>
        ) : (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Enrolled</span>
            </div>
            <p className="text-text-muted text-sm">
              Progress: {enrolledCourse?.completedLessons?.length || 0} of {course.totalLessons} lessons completed
            </p>
          </div>
        )}

        {/* Lessons */}
        <div>
          <h3 className="font-semibold mb-4">Course Content</h3>
          <div className="space-y-3">
            {course.lessons?.map((lesson, index) => {
              const completed = isLessonCompleted(lesson.id);
              const canAccess = canAccessLesson(index);
              const locked = !canAccess;

              return (
                <div
                  key={lesson.id}
                  className={`border border-border rounded-lg p-4 transition-all ${
                    canAccess ? 'cursor-pointer hover:bg-surface-hover' : 'opacity-50'
                  }`}
                  onClick={() => canAccess && onLessonSelect(lesson)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      completed ? 'bg-success text-white' :
                      locked ? 'bg-surface-hover text-text-muted' :
                      'bg-primary text-white'
                    }`}>
                      {completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : locked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                        <span>{lesson.estimatedMinutes} min</span>
                        <div className="flex items-center gap-1">
                          <Coins className="w-3 h-3 text-accent" />
                          <span className="text-accent">{lesson.earnableZara} $zara</span>
                        </div>
                      </div>
                    </div>

                    {completed && (
                      <div className="text-success text-xs font-medium">
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;