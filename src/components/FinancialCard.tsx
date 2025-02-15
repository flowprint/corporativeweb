import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialCardProps {
  title: string;
  price: number;
  change: number;
  percentChange: number;
  delay?: number;
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  price,
  change,
  percentChange,
  delay = 0,
}) => {
  const isPositive = percentChange >= 0;
  const isForex = title?.includes('/') ?? false;

  return (
    <div 
      className="opacity-0 transform translate-y-8 p-3 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-indigo-500/30 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-all duration-300 fade-in-up w-[220px] flex-shrink-0"
      style={{ '--delay': `${delay}ms`, willChange: 'transform, opacity' } as React.CSSProperties}
    >
      <div className="mb-2">
        <h3 className="text-base font-bold text-white mb-0.5">{title}</h3>
        <p className="text-xs text-indigo-200/70">{isForex ? 'Currency Pair' : 'Stock Index'}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-white">
            {isForex ? '' : '$'}{price.toFixed(isForex ? 4 : 2)}
          </p>
          <p className={cn(
            "text-xs transition-colors duration-300",
            isPositive ? "text-green-400 hover:text-green-300" : "text-red-400 hover:text-red-300"
          )}>
            {isPositive ? "+" : ""}{change.toFixed(isForex ? 4 : 2)} ({isPositive ? "+" : ""}{percentChange.toFixed(2)}%)
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-900/90 p-1.5 transform transition-transform duration-300 hover:scale-110">
          {isPositive ? (
            <TrendingUp className="w-full h-full text-green-500" />
          ) : (
            <TrendingDown className="w-full h-full text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
};