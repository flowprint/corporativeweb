import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

// Types
type TrainingFeature = {
  title: string;
  description: string;
  features: string[];
  icon: string;
};

// Training data
const trainingData: TrainingFeature[] = [
  {
    title: "Theory Part",
    description: "Learn everything about order flow methodology, explained clearly and directly.",
    icon: "https://flowprinttrading.com/00-icons/theory.avif",
    features: [
      "Advanced supply and demand",
      "Market auction theory",
      "Liquidity theory",
      "Advanced order flow tools"
    ]
  },
  {
    title: "Practical Part",
    description: "Apply knowledge in real-time, with weekly recaps, end of the day and Q&A sessions.",
    icon: "https://flowprinttrading.com/00-icons/practical.avif",
    features: [
      "Backtesting",
      "Practical exercises on zones and patterns",
      "Real Market Analysis",
      "Live Sessions"
    ]
  }
];

// Optimized Feature List
const FeatureList = memo(({ features }: { features: string[] }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const listItems = entry.target.children;
            Array.from(listItems).forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('fade-in-right');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={listRef} className="space-y-4">
      {features.map((feature, index) => (
        <li 
          key={index} 
          className="feature-item flex items-center space-x-3 opacity-0 translate-x-8"
          style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
        >
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
            <div className="bg-indigo-500/10 rounded-full p-1.5">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <span className="text-gray-300 transition-colors duration-300 hover:text-indigo-300">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
});

FeatureList.displayName = 'FeatureList';

// Optimized Training Card
const TrainingCard = memo(({ data, index }: { data: TrainingFeature; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 
                rounded-2xl border border-gray-700/50 shadow-lg hover:border-indigo-500/30 
                hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] opacity-0 translate-y-8
                ${isVisible ? 'fade-in-up' : ''}`}
      style={{ 
        '--delay': `${index * 200}ms`,
        willChange: 'transform, opacity'
      } as React.CSSProperties}
    >
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start space-x-6 mb-8">
          <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 
                        to-indigo-600/10 p-0.5 transition-transform duration-300 group-hover:scale-110">
            <div className="levitating-icon-wrapper w-full h-full rounded-2xl bg-gray-900/90 p-3 backdrop-blur-sm">
              <img 
                src={data.icon} 
                alt={data.title}
                className="w-full h-full object-contain filter brightness-125"
                loading={index === 0 ? "eager" : "lazy"}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  willChange: 'transform'
                }}
              />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-indigo-400 opacity-0 
                              group-hover:opacity-100 transition-all duration-500 delay-200" />
          </div>
          
          <div className="flex-1 transition-transform duration-300 group-hover:translate-x-2">
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r 
                         from-white to-indigo-200 group-hover:to-indigo-300 transition-colors duration-500">
              {data.title}
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-transparent rounded-full 
                          transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30
                      transition-all duration-500 group-hover:border-indigo-500/20 group-hover:translate-y-[-2px]">
          <p className="text-gray-400 leading-relaxed transition-colors duration-500 group-hover:text-gray-300">
            {data.description}
          </p>
        </div>

        {/* Features */}
        <FeatureList features={data.features} />
      </div>
    </div>
  );
});

TrainingCard.displayName = 'TrainingCard';

// Main BootcampSection component
export function BootcampSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="bootcamp" 
      className="relative py-20 bg-gray-800 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                      from-indigo-500/10 via-gray-800/50 to-gray-800 opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className="text-center mb-16 opacity-0 transform translate-y-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 blur-3xl opacity-50" />
            <h2 className="relative text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-indigo-200">
              About the Training
            </h2>
            <p className="relative text-xl text-indigo-200/90 max-w-2xl mx-auto">
              A complete program designed to turn you into a professional trader.
            </p>
            <div className="absolute inset-x-0 -bottom-4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {trainingData.map((data, index) => (
            <TrainingCard
              key={data.title}
              data={data}
              index={index}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          /* Base Animation Classes */
          .fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay, 0ms);
          }

          .fade-in-right {
            animation: fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay, 0ms);
          }

          /* Levitating Icon Animation */
          .levitating-icon-wrapper {
            position: relative;
            transform-style: preserve-3d;
            perspective: 1000px;
          }

          .levitating-icon-wrapper img {
            animation: levitate 3s ease-in-out infinite;
            transform-origin: center center;
          }

          @keyframes levitate {
            0%, 100% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              transform: translateY(-6px) scale(1.02) rotate(1deg);
            }
          }

          /* Enhanced hover effect */
          .group:hover .levitating-icon-wrapper img {
            animation: levitateHover 2s ease-in-out infinite;
          }

          @keyframes levitateHover {
            0%, 100% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              transform: translateY(-8px) scale(1.05) rotate(2deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(2rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(2rem);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Ensure smooth animations on mobile */
          @media (max-width: 768px) {
            .fade-in-up,
            .fade-in-right {
              animation-duration: 0.6s;
            }
            
            .levitating-icon-wrapper img {
              animation-duration: 2s;
            }
          }

          /* Respect user preferences */
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }

            .fade-in-up,
            .fade-in-right {
              animation: none;
              opacity: 1;
              transform: none;
            }

            .levitating-icon-wrapper img {
              animation: none !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}