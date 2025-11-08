import React, { useState } from 'react';
import { Search, Filter, Star, Users, Clock, Coins } from 'lucide-react';
import { useCourseStore } from '../store/courseStore';
import { useUserStore } from '../store/userStore';
import CourseCard from './CourseCard';
import CourseDetail from './CourseDetail';

const CourseMarketplace = ({ onCourseSelect, selectedCourse, onLessonSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { filterCourses } = useCourseStore();
  const { user } = useUserStore();
  
  const filteredCourses = filterCourses(selectedDifficulty, searchTerm);

  if (selectedCourse) {
    return (
      <CourseDetail 
        course={selectedCourse}
        onBack={() => onCourseSelect(null)}
        onLessonSelect={onLessonSelect}
      />
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Course Marketplace</h2>
        <p className="text-text-muted text-sm">
          Discover quality courses and start learning with your {user?.zaraBalance || 0} $zara
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFilters ? 'bg-primary text-white' : 'bg-surface border border-border text-text'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {selectedDifficulty && (
            <button
              onClick={() => setSelectedDifficulty('')}
              className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium"
            >
              {selectedDifficulty} ✕
            </button>
          )}
        </div>

        {showFilters && (
          <div className="bg-surface border border-border rounded-lg p-4 animate-slide-up">
            <h4 className="font-medium mb-3">Difficulty Level</h4>
            <div className="flex flex-wrap gap-2">
              {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(
                    selectedDifficulty === difficulty ? '' : difficulty
                  )}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-primary text-white'
                      : 'bg-surface-hover border border-border text-text'
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No courses found matching your criteria</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseSelect(course)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseMarketplace;