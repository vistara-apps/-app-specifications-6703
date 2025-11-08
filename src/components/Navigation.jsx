import React from 'react';
import { Home, BookOpen, MessageCircle, User, HelpCircle } from 'lucide-react';

const Navigation = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'marketplace', icon: Home, label: 'Home' },
    { id: 'feed', icon: MessageCircle, label: 'Feed' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="border-t border-border bg-surface">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === id 
                ? 'text-primary bg-primary/10' 
                : 'text-text-muted hover:text-text hover:bg-surface-hover'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;