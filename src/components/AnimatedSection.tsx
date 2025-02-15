import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 
    | 'fade-up' 
    | 'fade-down' 
    | 'fade-in' 
    | 'scale-up' 
    | 'slide-in-right' 
    | 'slide-in-left'
    | 'bounce'
    | 'float'
    | 'pulse'
    | 'glow';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  continuous?: boolean;
}

export function AnimatedSection({ 
  children, 
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  triggerOnce = true,
  continuous = false
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const animationClass = continuous
    ? {
        'animate-float': animation === 'float',
        'animate-pulse-slow': animation === 'pulse',
        'animate-bounce-slow': animation === 'bounce',
        'animate-glow': animation === 'glow'
      }
    : {
        'animate-in': isIntersecting,
        'fade-up-animation': animation === 'fade-up',
        'fade-down-animation': animation === 'fade-down',
        'fade-in-animation': animation === 'fade-in',
        'scale-up-animation': animation === 'scale-up',
        'slide-in-right-animation': animation === 'slide-in-right',
        'slide-in-left-animation': animation === 'slide-in-left'
      };

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        animationClass,
        className
      )}
      style={{
        '--delay': `${delay}ms`,
        '--duration': `${duration}ms`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}