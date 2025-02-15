import React, { useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { FinancialCard } from './FinancialCard';
import { useFinancialData } from '@/hooks/useFinancialData';

export function FinancialSlider() {
  const { stockData, forexData, error } = useFinancialData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const combinedData = stockData.reduce<Array<{ type: 'stock' | 'forex', data: any }>>((acc, stock, index) => {
    acc.push({ type: 'stock', data: stock });
    if (forexData[index]) {
      acc.push({ type: 'forex', data: forexData[index] });
    }
    return acc;
  }, []);

  if (forexData.length > stockData.length) {
    forexData.slice(stockData.length).forEach(forex => {
      combinedData.push({ type: 'forex', data: forex });
    });
  }

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval: number;

    const startAutoScroll = () => {
      scrollInterval = window.setInterval(() => {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScrollPosition = container.scrollLeft + 1;
        
        if (newScrollPosition >= maxScroll) {
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = 0;
          container.offsetHeight; // Force reflow
          container.style.scrollBehavior = 'smooth';
        } else {
          container.scrollLeft = newScrollPosition;
        }
      }, 30);
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 rounded-lg p-4 flex items-center space-x-2">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="overflow-hidden smooth-scroll pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <div className="flex space-x-3 px-8 min-w-max">
            {combinedData.map((item, index) => (
              <FinancialCard
                key={`${item.type}-${item.data.symbol}`}
                title={item.data.name}
                price={item.data.currentPrice}
                change={item.data.change}
                percentChange={item.data.percentChange}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .smooth-scroll {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }

          @media (prefers-reduced-motion: reduce) {
            .smooth-scroll {
              scroll-behavior: auto;
            }
          }
        `}
      </style>
    </div>
  );
}