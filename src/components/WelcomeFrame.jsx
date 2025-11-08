import React from 'react';
import { Coins, BookOpen, Users, Zap } from 'lucide-react';

const WelcomeFrame = ({ onStartLearning }) => {
  return (
    <div className="p-6 text-center animate-slide-up">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to ZaraLearn</h1>
        <p className="text-text-muted text-sm leading-relaxed">
          Learn, earn, and pay with $zara — education without borders
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <Coins className="w-4 h-4 text-accent" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">Earn $zara Tokens</p>
            <p className="text-xs text-text-muted">Complete lessons and help peers</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">Quality Courses</p>
            <p className="text-xs text-text-muted">Curated content from experts</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
          <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-warning" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">Peer Support</p>
            <p className="text-xs text-text-muted">Get help when you're stuck</p>
          </div>
        </div>
      </div>

      {/* Starter Bonus */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="font-semibold text-accent">Starter Bonus</span>
        </div>
        <p className="text-sm text-text-muted">
          Connect your wallet and receive <span className="token-glow font-bold">10 $zara</span> to start learning immediately!
        </p>
      </div>

      {/* CTA Button */}
      <button 
        onClick={onStartLearning}
        className="btn-primary w-full text-center font-semibold"
      >
        Start Learning
      </button>

      <p className="text-xs text-text-muted mt-4">
        Connect your Farcaster wallet to begin your learning journey
      </p>
    </div>
  );
};

export default WelcomeFrame;