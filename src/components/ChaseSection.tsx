import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function ChaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate elements sequentially
            const elements = entry.target.querySelectorAll('.fade-element');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('fade-in-up');
              }, index * 200); // 200ms delay between each element
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-indigo-900 relative overflow-hidden transform-gpu"
      style={{ willChange: 'transform' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/20 via-indigo-900/40 to-indigo-950/60" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="fade-element text-3xl font-bold text-white mb-6 opacity-0 transform translate-y-8">
            Let's Cut to the Chase 🤝
          </h2>
          
          <div className="space-y-8">
            <p className="fade-element text-xl text-indigo-200 opacity-0 transform translate-y-8">
              This is a validated, step-by-step framework we use ourselves to pass challenges and stay consistent. 
              We didn't invent anything new; the market was already there. After years of obsessive backtesting, 
              we combined everything that worked from every method or theory, identified repeating price action 
              and footprint patterns, and built tools to spot them effortlessly in real time streamlining our 
              decision-making.
            </p>
            
            <p className="fade-element text-xl text-indigo-200 opacity-0 transform translate-y-8">
              We're proud of what we are (TRADERS), so I'll be straight with you. No fluff. No secrets. 
              This is the system that would've saved me 7 years of trial and error. We've never shared it before, 
              but if you're ready to stop getting lost in the noise and trade with clarity, here it is.
            </p>
          </div>

          <a 
            href="#join-us" 
            className="fade-element inline-flex items-center space-x-2 bg-white text-indigo-900 px-8 py-3 rounded-lg 
                     hover:bg-indigo-50 transition-all transform hover:-translate-y-1 hover:shadow-lg
                     opacity-0 translate-y-8"
          >
            <span className="font-medium">See you inside</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>

      <style>
        {`
          /* Base Animation Classes */
          .fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

          /* Background Animations */
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .fade-in-up {
              animation-duration: 0.6s;
            }
          }

          /* Reduced Motion */
          @media (prefers-reduced-motion: reduce) {
            .fade-in-up,
            .animate-blob {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}