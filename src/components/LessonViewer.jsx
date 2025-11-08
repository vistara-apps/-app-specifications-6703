import React from 'react';

const LessonViewer = ({ lesson, course, onComplete }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{lesson?.title || 'Lesson'}</h2>
      <p>{lesson?.content || 'Lesson content here.'}</p>
      <button onClick={onComplete} className="mt-4 px-4 py-2 bg-primary text-white rounded">Complete</button>
    </div>
  );
};

export default LessonViewer;