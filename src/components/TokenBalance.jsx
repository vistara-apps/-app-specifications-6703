import React from 'react';
import { Coins } from 'lucide-react';

const TokenBalance = ({ balance, showTrend = false, trend = 0 }) => {
  return (
    <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-border">
      <div className="w-5 h-5 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center">
        <Coins className="w-3 h-3 text-white" />
      </div>
      <span className="font-semibold text-accent">{balance}</span>
      <span className="text-xs text-text-muted">$zara</span>
      
      {showTrend && trend !== 0 && (
        <span className={`text-xs font-medium ${trend > 0 ? 'text-success' : 'text-error'}`}>
          {trend > 0 ? '+' : ''}{trend}
        </span>
      )}
    </div>
  );
};

export default TokenBalance;