import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface JourneyPhase {
  phase: number;
  title: string;
  description: string;
  features: string[];
}

const journeyPhases: JourneyPhase[] = [
  {
    phase: 1,
    title: "Foundation Building",
    description: "Master the fundamentals of the market dynamic and order flow.",
    features: [
      "Understanding our market framework",
      "Getting an Edge",
      "Changing your market mindset",
      "Developing your trading plan"
    ]
  },
  {
    phase: 2,
    title: "Strategy Implementation",
    description: "Apply concepts in live market conditions with expert guidance",
    features: [
      "Knowing your statistical advantage",
      "Learning the execution timing",
      "Risk management implementation for funding and personal capital",
      "Applying a journal tracks stats and emotions to boost performance"
    ]
  },
  {
    phase: 3,
    title: "Elite Performance",
    description: "Achieve mastery in trading with high-level strategies and elite skill development",
    features: [
      "Building a sustainable trading routine",
      "Enhancing decision-making under pressure",
      "Utilizing market correlations and multi-timeframe analysis",
      "Perfecting post-trade analysis and performance review"
    ]
  }
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Animate title and subtitle
            if (element.classList.contains('journey-header')) {
              const title = element.querySelector('.journey-title');
              const subtitle = element.querySelector('.journey-subtitle');
              title?.classList.add('animate-in');
              subtitle?.classList.add('animate-in');
            }
            
            // Animate phase cards
            if (element.classList.contains('phase-card-wrapper')) {
              element.classList.add('card-visible');
              
              // Animate card contents
              const cardTitle = element.querySelector('.card-title');
              const cardDescription = element.querySelector('.card-description');
              const features = element.querySelectorAll('.feature-item');
              
              cardTitle?.classList.add('animate-in');
              
              setTimeout(() => {
                cardDescription?.classList.add('animate-in');
              }, 200);
              
              features.forEach((feature, index) => {
                setTimeout(() => {
                  feature.classList.add('animate-in');
                }, 400 + (index * 100));
              });
            }
            
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe phase cards
    const cards = document.querySelectorAll('.phase-card-wrapper');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl 
          -translate-x-1/2 -translate-y-1/2 animate-blob"
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl 
          translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12 sm:py-24">
        {/* Header */}
        <div 
          ref={headerRef}
          className="journey-header text-center mb-12 sm:mb-16 overflow-hidden"
        >
          <h2 className="journey-title text-3xl sm:text-4xl font-bold mb-4 text-white opacity-0 scale-95">
            Your Journey to Trading Mastery With Us
          </h2>
          <p className="journey-subtitle text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto opacity-0 scale-95">
            A structured path to transform you from a beginner to a professional trader through our comprehensive program
          </p>
        </div>

        {/* Journey Cards */}
        <div className="space-y-8 sm:space-y-12">
          {journeyPhases.map((phase, phaseIndex) => (
            <div 
              key={phase.phase}
              className="phase-card-wrapper opacity-0"
              style={{ '--delay': `${phaseIndex * 0.2}s` } as React.CSSProperties}
            >
              <div className="relative">
                {phaseIndex < journeyPhases.length - 1 && (
                  <div className="connector hidden sm:block absolute left-16 top-24 w-0.5 h-24 opacity-0" />
                )}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
                  {/* Phase Circle */}
                  <div className="flex-shrink-0">
                    <div className="phase-circle w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-600/10 
                                  border-2 border-indigo-500 flex items-center justify-center p-2 opacity-0 scale-90">
                      <span className="text-white text-center font-semibold leading-tight">
                        Phase {phase.phase}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-grow w-full sm:w-auto">
                    <div className="phase-card bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-indigo-500/20">
                      <h3 className="card-title text-xl sm:text-2xl font-bold mb-2 text-white opacity-0 translate-y-5">
                        {phase.title}
                      </h3>
                      <p className="card-description text-base sm:text-lg text-indigo-200 mb-6 opacity-0 translate-y-5">
                        {phase.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {phase.features.map((feature, index) => (
                          <div 
                            key={feature}
                            className="feature-item opacity-0 translate-y-5"
                            style={{ '--index': index } as React.CSSProperties}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="icon-wrapper">
                                <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                              </div>
                              <span className="text-gray-300">{feature}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          /* Base Animations */
          .animate-in {
            animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay, 0ms);
          }

          .card-visible {
            animation: slideIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: var(--delay, 0ms);
          }

          .card-visible .phase-circle {
            animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            animation-delay: calc(var(--delay) + 200ms);
          }

          .card-visible .connector {
            animation: drawLine 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: calc(var(--delay) + 400ms);
          }

          /* Title Animations */
          .journey-title.animate-in,
          .journey-subtitle.animate-in {
            animation: titleIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .journey-subtitle.animate-in {
            animation-delay: 200ms;
          }

          /* Keyframe Definitions */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9) rotate(-10deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(0);
            }
          }

          @keyframes titleIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes drawLine {
            from {
              opacity: 0;
              transform: scaleY(0);
            }
            to {
              opacity: 1;
              transform: scaleY(1);
            }
          }

          /* Background Animation */
          @keyframes blob {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          /* Connector Styling */
          .connector {
            background: linear-gradient(to bottom, var(--tw-gradient-stops));
            --tw-gradient-from: rgb(99 102 241);
            --tw-gradient-to: transparent;
            transform-origin: top;
          }

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .animate-in,
            .card-visible {
              animation-duration: 0.6s;
            }
          }

          /* Reduced Motion */
          @media (prefers-reduced-motion: reduce) {
            .animate-in,
            .card-visible,
            .phase-circle,
            .connector,
            .animate-blob {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}