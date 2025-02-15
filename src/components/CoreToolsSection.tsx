import React, { useEffect, useRef } from 'react';
import { BarChart2, LineChart, TrendingUp, Activity, ArrowUpDown, Info } from 'lucide-react';

interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: 1,
    title: "Market Profile",
    description: "Let's explore 2 methods to identify zones and levels you've never seen before",
    icon: <BarChart2 className="w-6 h-6 text-blue-400 relative z-10 tool-icon" />
  },
  {
    id: 2,
    title: "VWAP",
    description: "With this volume tool, you'll learn to anticipate price explosions like never before",
    icon: <LineChart className="w-6 h-6 text-blue-400 relative z-10 tool-icon" />
  },
  {
    id: 3,
    title: "Volume & Delta Analysis",
    description: "Confirm absorptions, exhaustion moves, and fade-aways in the footprint chart to track money flow in the market",
    icon: <TrendingUp className="w-6 h-6 text-blue-400 relative z-10 tool-icon" />
  },
  {
    id: 4,
    title: "Footprint",
    description: "With this microscopic tool, validate and spot real-time movements of the market's \"big players\"",
    icon: <Activity className="w-6 h-6 text-blue-400 relative z-10 tool-icon" />
  },
  {
    id: 5,
    title: "Cumulative Delta",
    description: "Identify price divergences and confirm the strength (or lack of intent) of the market's \"whales\"",
    icon: <ArrowUpDown className="w-6 h-6 text-blue-400 relative z-10 tool-icon" />
  }
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles] = React.useState(() => 
    Array.from({ length: 5 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2
    }))
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${y * 10}deg) 
        rotateY(${x * -10}deg)
        translateZ(0)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex w-full lg:w-[calc(20%-1rem)] items-center justify-center">
      <div 
        className="tool-card w-full perspective-1000"
        style={{ '--delay': `${index * 0.2}s`, '--index': index } as React.CSSProperties}
      >
        <div 
          ref={cardRef}
          className="relative p-6 rounded-xl bg-gray-800/80 backdrop-blur-md border border-gray-700/50 
                   transform-gpu transition-all duration-500"
        >
          {/* Timeline Dots */}
          <div className="hidden lg:flex absolute left-1/2 -top-8 -translate-x-1/2 timeline-dot">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full transform-gpu" />
              </div>
            </div>
          </div>

          <div className="lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 timeline-dot-mobile">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{tool.id}</span>
              </div>
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="relative tool-content">
            {/* Tool Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="tool-icon-wrapper">
                <div className="relative p-3 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 
                            transform-gpu transition-all duration-500">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl tool-icon-glow" />
                  {tool.icon}
                </div>
              </div>
              <button 
                className="info-button p-2 rounded-full hover:bg-blue-500/10 transition-colors" 
                aria-label={`More info about ${tool.title}`}
              >
                <Info className="w-5 h-5 text-blue-400" />
              </button>
            </div>

            {/* Tool Content */}
            <div className="space-y-3 tool-text">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 break-words tool-title">
                {tool.title}
              </h3>
              <div className="tool-description bg-gray-800/50 rounded-lg p-4 ring-1 ring-white/5 
                          transform-gpu transition-all duration-500">
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed break-words">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Mobile Timeline Connector */}
            {index < tools.length - 1 && (
              <div className="lg:hidden absolute h-full w-px bg-gradient-to-b from-blue-500/30 
                        to-transparent -left-4 top-full mt-4 timeline-connector" />
            )}
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none particles">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="particle absolute w-1 h-1 bg-blue-500/30 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoreToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Animate cards
            const cards = entry.target.querySelectorAll('.tool-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('is-visible');
              }, index * 200);
            });
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
      id="core-tools" 
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-no-repeat bg-cover transform scale-110" 
          style={{ 
            backgroundImage: 'url("https://flowprinttrading.com/00-icons/fondo222.avif")',
            willChange: 'transform'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/95 to-gray-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 section-header overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 
                        animate-slide-bg blur-2xl opacity-75 transform -skew-y-6" />
            <h2 
              className="relative text-4xl md:text-5xl font-bold mb-4 opacity-0 transform translate-x-[-50px] 
                       bg-gradient-to-r from-white via-white to-indigo-200 text-transparent bg-clip-text 
                       title-mask animate-title"
              style={{ willChange: 'transform, opacity' }}
            >
              Core Tools You Will Master
            </h2>
          </div>
          <p 
            className="text-lg text-indigo-200 max-w-3xl mx-auto opacity-0 transform translate-y-8 animate-subtitle"
            style={{ willChange: 'transform, opacity' }}
          >
            Master institutional accumulation/distribution zones and eliminate retail guesswork.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 h-px timeline-line" />
          <div className="lg:hidden absolute left-4 top-0 h-full w-px timeline-line-mobile" />
          
          <div className="space-y-12 pl-8 lg:pl-0 lg:space-y-0 lg:flex lg:justify-between lg:pt-12">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          /* Base Animations */
          @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }

          @keyframes particle {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
          }

          /* Section Header Animation */
          .section-header {
            opacity: 0;
            animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          /* Timeline Animations */
          .timeline-line {
            background: linear-gradient(to right, transparent, rgb(59, 130, 246, 0.3), transparent);
            transform-origin: left;
            transform: scaleX(0);
            animation: scaleX 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 0.5s;
          }

          .timeline-line-mobile {
            background: linear-gradient(to bottom, rgb(59, 130, 246, 0.3), transparent);
            transform-origin: top;
            transform: scaleY(0);
            animation: scaleY 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 0.5s;
          }

          /* Tool Card Animations */
          .tool-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: var(--delay);
          }

          .tool-card.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Icon Animations */
          .tool-icon-wrapper {
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            transition-delay: calc(var(--delay) + 0.3s);
          }

          .is-visible .tool-icon-wrapper {
            transform: scale(1);
            opacity: 1;
          }

          .tool-icon {
            animation: float 3s ease-in-out infinite;
            animation-delay: calc(var(--index) * 0.2s);
          }

          .tool-icon-glow {
            animation: pulse 3s ease-in-out infinite;
            animation-delay: calc(var(--index) * 0.2s);
          }

          /* Content Animations */
          .tool-title {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: calc(var(--delay) + 0.4s);
          }

          .tool-description {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: calc(var(--delay) + 0.5s);
          }

          .is-visible .tool-title,
          .is-visible .tool-description {
            opacity: 1;
            transform: translateY(0);
          }

          /* Timeline Dot Animations */
          .timeline-dot,
          .timeline-dot-mobile {
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            transition-delay: calc(var(--delay) + 0.2s);
          }

          .is-visible .timeline-dot,
          .is-visible .timeline-dot-mobile {
            opacity: 1;
            transform: scale(1);
          }

          /* Particle Animations */
          .particle {
            opacity: 0;
            --tx: calc(cos(var(--angle)) * 50px);
            --ty: calc(sin(var(--angle)) * 50px);
            animation: particle 2s ease-out infinite;
            animation-delay: calc(var(--index) * 0.5s);
          }

          /* Title Animation */
          @keyframes titleSlide {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            60% {
              transform: translateX(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes titleMask {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }

          @keyframes slideBg {
            from {
              transform: translateX(-100%) skewX(-45deg);
            }
            to {
              transform: translateX(100%) skewX(-45deg);
            }
          }

          .animate-slide-bg {
            animation: slideBg 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .title-mask {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          }

          .animate-title {
            animation: 
              titleSlide 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
              titleMask 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          /* Subtitle Animation */
          .animate-subtitle {
            animation: subtitleSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          @keyframes subtitleSlide {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Ensure smooth animations on mobile */
          @media (max-width: 768px) {
            .animate-title,
            .animate-subtitle {
              animation-duration: 0.8s;
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

            .animate-title,
            .animate-subtitle,
            .animate-slide-bg {
              animation: none;
              opacity: 1;
              transform: none;
            }

            .title-mask {
              clip-path: none;
            }
          }
        `}
      </style>
    </section>
  );
}