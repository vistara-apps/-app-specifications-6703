import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import WelcomeFrame from './components/WelcomeFrame';
import CourseMarketplace from './components/CourseMarketplace';
import TokenBalance from './components/TokenBalance';
import Navigation from './components/Navigation';
import { useUserStore } from './store/userStore';
import { useCourseStore } from './store/courseStore';
import { useHelpStore } from './store/helpStore';

function App() {
  const { address, isConnected } = useAccount();
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const { user, initializeUser, updateBalance } = useUserStore();
  const { initializeCourses } = useCourseStore();
  const { initializeHelpRequests } = useHelpStore();

  useEffect(() => {
    if (isConnected && address && !user) {
      initializeUser(address);
      initializeCourses();
      initializeHelpRequests();
      setCurrentView('marketplace');
    }
  }, [isConnected, address, user, initializeUser, initializeCourses, initializeHelpRequests]);

  const handleStartLearning = () => {
    if (isConnected) {
      setCurrentView('marketplace');
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    if (view !== 'course-detail') {
      setSelectedCourse(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeFrame onStartLearning={handleStartLearning} />;
      case 'marketplace':
        return (
          <CourseMarketplace 
            onCourseSelect={handleCourseSelect}
            selectedCourse={selectedCourse}
          />
        );
      default:
        return <WelcomeFrame onStartLearning={handleStartLearning} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="frame-container min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <h1 className="font-bold text-lg">ZaraLearn</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {user && <TokenBalance balance={user.zaraBalance} />}
            <div className="scale-75">
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderCurrentView()}
        </div>

        {/* Navigation */}
        {isConnected && user && (
          <Navigation 
            currentView={currentView} 
            onNavigate={handleNavigation} 
          />
        )}
      </div>
    </div>
  );
}

export default App;