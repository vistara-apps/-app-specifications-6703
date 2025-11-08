import React from 'react';
import { Star, Users, Clock, Coins } from 'lucide-react';

const CourseCard = ({ course, onClick }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-text-muted bg-surface';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="card cursor-pointer animate-scale-in"
    >
      <div className="flex gap-4">
        {/* Course Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {course.title.charAt(0)}
          </span>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm leading-tight truncate pr-2">
              {course.title}
            </h3>
            <div className="flex items-center gap-1 text-accent font-semibold text-sm flex-shrink-0">
              <Coins className="w-4 h-4" />
              {course.priceInZara}
            </div>
          </div>

          <p className="text-text-muted text-xs mb-3 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-warning fill-current" />
                {course.averageRating}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {course.totalEnrollments}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.totalLessons}
              </div>
            </div>

            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;