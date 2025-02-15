import React, { useEffect, useRef } from 'react';

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: "https://flowprinttrading.com/00-icons/001.png",
    title: "Step-by-Step Methodology",
    description: "Follow our proven framework designed for consistent results"
  },
  {
    icon: "https://flowprinttrading.com/00-icons/02.png",
    title: "Proprietary Tools",
    description: "Institutional-grade tech to decode liquidity and high-probability zones"
  },
  {
    icon: "https://flowprinttrading.com/00-icons/03.png",
    title: "Daily/Weekly Review",
    description: "Trade audits + weekly analytics (win rate, risk-reward) to refine your edge"
  },
  {
    icon: "https://flowprinttrading.com/00-icons/04.png",
    title: "Community",
    description: "Collaborate with traders who speak your market language"
  },
  {
    icon: "https://flowprinttrading.com/00-icons/05.png",
    title: "Live Trading",
    description: "Real-market execution: step-by-step entries, exits, and risk management under pressure"
  },
  {
    icon: "https://flowprinttrading.com/00-icons/06.png",
    title: "Continuous Evolution",
    description: "Strategy updates + new tools at no extra cost. Markets change; your edge won't stagnate"
  }
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

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
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="benefit-card opacity-0 transform translate-y-8 p-8 rounded-2xl bg-gray-800/80 border border-gray-700/50 
                 hover:border-indigo-500/30 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-all duration-300"
      style={{ 
        '--delay': `${index * 100}ms`,
        willChange: 'transform, opacity'
      } as React.CSSProperties}
    >
      {/* Icon with levitating animation */}
      <div className="mb-6">
        <div className="levitating-icon-wrapper w-16 h-16 rounded-full bg-gray-900/90 p-3 transform transition-all duration-300 hover:scale-110">
          <img 
            src={benefit.icon} 
            alt={benefit.title}
            className="w-full h-full object-contain"
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            style={{
              animationDelay: `${index * 0.2}s`,
              willChange: 'transform'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white">
          {benefit.title}
        </h3>
        <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

function SectionHeader() {
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
      {
        threshold: 0.1
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={headerRef}
      className="text-center mb-16 opacity-0 transform translate-y-8"
    >
      <h2 className="text-4xl font-bold mb-4 text-white">
        Why Choose Us?
      </h2>
      <p className="text-xl text-indigo-200/90">
        We truly believe that here you are going to find everything you need to reach your trading goals
      </p>
    </div>
  );
}

export function Benefits() {
  return (
    <section id="why-us" className="py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.title} 
              benefit={benefit}
              index={index}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          .fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-8px) scale(1.02);
            }
          }

          /* Add subtle rotation for more dynamism */
          .levitating-icon-wrapper:hover img {
            animation: levitateAndRotate 3s ease-in-out infinite;
          }

          @keyframes levitateAndRotate {
            0%, 100% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              transform: translateY(-8px) scale(1.02) rotate(3deg);
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

          /* Ensure smooth animations on mobile */
          @media (max-width: 768px) {
            .fade-in-up {
              animation-duration: 0.6s;
            }
            
            .levitating-icon-wrapper img {
              animation-duration: 2s;
            }
          }

          /* Respect user preferences */
          @media (prefers-reduced-motion: reduce) {
            .fade-in-up,
            .levitating-icon-wrapper img {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Benefits;