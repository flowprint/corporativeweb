import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ComparisonFeature {
  title: string;
  pro: string | boolean;
  elite: string | boolean;
}

const features: ComparisonFeature[] = [
  {
    title: "Mentorship Duration",
    pro: "2 Months",
    elite: "14 Months (2+12)"
  },
  {
    title: "Live Coaching",
    pro: "2x/week",
    elite: "Daily"
  },
  {
    title: "Personalized Feedback",
    pro: false,
    elite: "Biweekly 1:1"
  },
  {
    title: "Prop Bot Access",
    pro: "Post-development",
    elite: "Priority + Early"
  },
  {
    title: "Premium Resources",
    pro: false,
    elite: "Elite Playbook"
  },
  {
    title: "Mentoring",
    pro: "Group",
    elite: "One to one"
  }
];

export function DetailedComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!backgroundRef.current || !sectionRef.current) return;

      const scrolled = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Only apply parallax when section is in view
      if (scrolled + viewportHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const yPos = (scrolled - sectionTop) * 0.5;
        backgroundRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax(); // Initial position

    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            const headerElements = entry.target.querySelectorAll('.fade-element');
            headerElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('fade-in-up');
              }, index * 200);
            });

            // Animate rows
            const rows = entry.target.querySelectorAll('.comparison-row');
            rows.forEach((row, index) => {
              setTimeout(() => {
                row.classList.add('row-visible');
              }, index * 100);
            });

            // Animate mobile cards
            const mobileCards = entry.target.querySelectorAll('.mobile-card');
            mobileCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('card-visible');
              }, index * 100);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden detailed-comparison-section"
    >
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-110" 
          style={{ 
            backgroundImage: 'url("https://flowprinttrading.com/00-icons/fondo33.avif")',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95" 
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="fade-element text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 opacity-0 transform translate-y-8">
            Detailed Comparison
          </h2>
          <div className="max-w-3xl mx-auto bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
            <p className="fade-element text-sm sm:text-base md:text-lg text-indigo-200 text-center opacity-0 transform translate-y-8">
              Both programs share the same knowledge base the difference lies in personalized time commitment. Discord coaching is lifetime.
            </p>
          </div>
        </div>

        {/* Comparison Tables */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="mobile-card bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50
                         transform-gpu transition-all duration-500 hover:translate-y-[-4px]
                         opacity-0 translate-y-4 levitating-card"
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <h3 className="text-gray-300 font-medium mb-3">{feature.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Pro Program</p>
                    <div className="cell-content transform-gpu text-gray-400">
                      {typeof feature.pro === 'boolean' ? (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 status-icon transform-gpu" aria-label="No" />
                      ) : (
                        <span className="text-content text-xs sm:text-sm md:text-base">{feature.pro}</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-indigo-400">Elite Plus</p>
                    <div className="cell-content transform-gpu text-indigo-300">
                      <span className="text-content text-xs sm:text-sm md:text-base">{feature.elite}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-xl levitating-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="py-4 px-3 sm:px-6 text-left text-xs sm:text-sm md:text-base text-gray-400 font-medium">
                      Feature
                    </th>
                    <th className="py-4 px-3 sm:px-6 text-left text-xs sm:text-sm md:text-base text-gray-400 font-medium">
                      Pro Program
                    </th>
                    <th className="py-4 px-3 sm:px-6 text-left text-xs sm:text-sm md:text-base text-indigo-400 font-medium">
                      Elite Plus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.title}
                      className="comparison-row border-gray-700/50 border-b last:border-0
                               transition-all duration-500 hover:bg-gray-700/30 transform-gpu opacity-0 translate-y-4"
                      style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-300 feature-cell transform-gpu">
                        <span className="text-xs sm:text-sm md:text-base">{feature.title}</span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="cell-content transform-gpu text-gray-400">
                          {typeof feature.pro === 'boolean' ? (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 status-icon transform-gpu" aria-label="No" />
                          ) : (
                            <span className="text-content text-xs sm:text-sm md:text-base">{feature.pro}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="cell-content transform-gpu text-indigo-300">
                          <span className="text-content text-xs sm:text-sm md:text-base">{feature.elite}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          /* Base Animation Classes */
          .fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay, 0ms);
          }

          /* Levitating Card Animation */
          .levitating-card {
            position: relative;
            transform-style: preserve-3d;
            perspective: 1000px;
            will-change: transform;
            animation: levitate 6s ease-in-out infinite;
          }

          @keyframes levitate {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-8px) scale(1.01);
            }
          }

          /* Mobile Card Animations */
          .mobile-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: var(--delay);
          }

          .mobile-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .mobile-card:hover {
            transform: translateY(-8px) scale(1.02);
            border-color: rgba(99, 102, 241, 0.3);
            box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.2);
          }

          /* Row Animation */
          .row-visible {
            animation: rowFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay);
          }

          @keyframes rowFadeIn {
            from {
              opacity: 0;
              transform: translateY(1rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
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

          /* Status Icon Animation */
          .status-icon {
            transition: all 0.3s ease-out;
          }

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .fade-in-up,
            .row-visible {
              animation-duration: 0.6s;
            }

            .levitating-card {
              animation-duration: 4s;
            }
          }

          /* Reduced Motion */
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
            .row-visible,
            .levitating-card,
            .mobile-card {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }

          /* Scrollbar Styling */
          .overflow-x-auto {
            scrollbar-width: thin;
            scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
          }

          .overflow-x-auto::-webkit-scrollbar {
            height: 6px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background: transparent;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: rgba(99, 102, 241, 0.3);
            border-radius: 3px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background-color: rgba(99, 102, 241, 0.5);
          }
        `}
      </style>
    </section>
  );
}