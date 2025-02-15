import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bitcoin, CheckCircle2, Clock, ExternalLink, MessageCircle, Phone, Send, Sparkles, Youtube } from 'lucide-react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function JoinUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [elapsedPercentage, setElapsedPercentage] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header content
            const headerElements = entry.target.querySelectorAll('.header-content');
            headerElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('fade-in-up');
              }, index * 200);
            });

            // Animate pricing cards
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('fade-in-up');
              }, 400 + (index * 200));
            });

            // Animate timer section
            const timerSection = entry.target.querySelector('.timer-section');
            setTimeout(() => {
              timerSection?.classList.add('fade-in-up');
            }, 800);

            // Animate time units
            const timeUnits = entry.target.querySelectorAll('.time-unit-container');
            timeUnits.forEach((unit, index) => {
              setTimeout(() => {
                unit.classList.add('fade-in-up');
              }, 1000 + (index * 100));
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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date('2024-02-13').getTime(); // Starting date
      const targetDate = new Date('2025-03-11').getTime();
      const now = new Date().getTime();
      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      const percentage = (elapsed / totalDuration) * 100;
      
      setElapsedPercentage(Math.max(0, Math.min(100, Number(percentage.toFixed(2)))));

      const remaining = targetDate - now;
      if (remaining > 0) {
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="join-us" 
      className="py-20 relative overflow-hidden"
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 header-content opacity-0">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us</h2>
          <div className="max-w-3xl mx-auto bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 testimonial-card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 avatar-container">
                <img 
                  src="https://flowprinttrading.com/00-icons/ray.avif" 
                  alt="Ray Hit TP" 
                  className="w-16 h-16 rounded-full border-2 border-indigo-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1 text-left quote-content">
                <p className="text-lg text-gray-300 italic">
                  "This isn't a marketing gimmick. As traders who value our community, we've created a launch discount exclusively for our loyal traders and those who've trusted us from the start. While prices will adjust as we launch, we want to keep this phase accessible to those who believe in our shared journey. Don't miss this chance to lock in your spot with us."
                </p>
                <p className="text-indigo-400 font-semibold mt-3 author-name">- Ray Hit TP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
          {/* Pro Program Card */}
          <div className="pricing-card opacity-0 transform translate-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full">
              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Program</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-3xl font-bold text-indigo-400">697€</p>
                    <span className="text-gray-400 text-xs">Excl. tax</span>
                  </div>
                  <p className="text-gray-400">Ideal For: Self-driven traders building foundational expertise.</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Full 2 month Live Mentorship
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Live sessions + recordings (Phase 1 & 2)</li>
                      <li>• Lifetime access to course updates</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Prebuilt Tools & Resources
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Proprietary indicators (supply/demand, delta divergence)</li>
                      <li>• Prop Firm Challenge Bot (access granted post-development)</li>
                      <li>• Trade Journal Template + Backtesting Spreadsheets</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Community & Support
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Private Discord community</li>
                      <li>• Live Trades: Twice a week (possibly more)</li>
                      <li>• Weekly market recaps + EOD reports</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      30-Day Guarantee
                    </h4>
                    <p className="text-gray-300 ml-7">
                      Full refund if unsatisfied after completing Weeks 1-3.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-700 space-y-3">
                <a
                  href="https://5hcrp0-t3.myshopify.com/cart/54970224607614:1?channel=buy_button"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all hover:translate-y-[-2px] flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="https://paycryptopro.flowprinttrading.com/"
                  className="group bg-gray-800 p-2 sm:p-3 rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-800/80 transition-all w-full block relative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-center">
                    <div className="levitating-icon-wrapper mr-2">
                      <Bitcoin className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <span className="text-gray-300 text-xs sm:text-sm">Pay with Crypto</span>
                    <ExternalLink className="w-4 h-4 text-blue-400 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Elite Plus Card */}
          <div className="pricing-card opacity-0 transform translate-y-8">
            <div className="bg-gradient-to-br from-indigo-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg border border-indigo-400 flex items-center space-x-2">
                <div className="levitating-icon-wrapper">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>Limited Seats: 10 Only</span>
              </div>

              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Elite Plus Mentorship</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-3xl font-bold text-indigo-400">1497€</p>
                    <span className="text-gray-400 text-xs">Excl. tax</span>
                  </div>
                  <p className="text-gray-400">Ideal For: Traders committed to institutional-grade mastery.</p>
                  <p className="text-indigo-300 text-sm mt-2">Interview Required</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Everything in Pro Program +
                    </h4>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      6-Month Elite Mentorship
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Daily Live Coaching: Pre-market analysis, live trade breakdowns, post-session debriefs</li>
                      <li>• 1:1 Biweekly Reviews: Personalized audits of trades, psychology, and strategy</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Advanced Tools & Priority Access
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Institutional Scripts (NT8/ATAS) for orderflow edge</li>
                      <li>• Early Access to prop bot updates and proprietary tools</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      My Personal Playbook
                    </h4>
                    <ul className="space-y-2 text-gray-300 ml-7">
                      <li>• Exact entry/exit rules</li>
                      <li>• Pre-trade checklist for bulletproof execution</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-white mb-4">
                      <div className="levitating-icon-wrapper mr-2">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      </div>
                      Performance-Based Refund
                    </h4>
                    <p className="text-gray-300 ml-7">
                      Partial refund available after 6 months if metrics stagnate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-700 space-y-3">
                <a
                  href="https://5hcrp0-t3.myshopify.com/cart/54970327630206:1?channel=buy_button"
                  className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all hover:translate-y-[-2px] flex items-center justify-center space-x-2 font-semibold"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="https://paycryptoelite.flowprinttrading.com/"
                  className="group bg-gray-800 p-2 sm:p-3 rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-800/80 transition-all w-full block relative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-center">
                    <div className="levitating-icon-wrapper mr-2">
                      <Bitcoin className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <span className="text-gray-300 text-xs sm:text-sm">Pay with Crypto</span>
                    <ExternalLink className="w-4 h-4 text-blue-400 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto timer-section opacity-0 transform translate-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
            <div className="text-left md:pr-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="levitating-icon-wrapper">
                  <Clock className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Limited Time Offer:</h2>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400">March 11, 2025</p>
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${100 - elapsedPercentage}%)` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex flex-col items-center time-unit-container">
                <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-indigo-500/20 min-w-[120px] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-all duration-300" />
                  <div className="text-4xl font-bold text-white mb-1 relative">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-indigo-400 text-sm uppercase tracking-wider relative">Days</div>
                </div>
              </div>

              <div className="text-indigo-400 text-4xl font-light hidden sm:block">:</div>

              <div className="flex flex-col items-center time-unit-container">
                <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-indigo-500/20 min-w-[120px] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-all duration-300" />
                  <div className="text-4xl font-bold text-white mb-1 relative">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-indigo-400 text-sm uppercase tracking-wider relative">Hours</div>
                </div>
              </div>

              <div className="text-indigo-400 text-4xl font-light hidden sm:block">:</div>

              <div className="flex flex-col items-center time-unit-container">
                <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-indigo-500/20 min-w-[120px] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-all duration-300" />
                  <div className="text-4xl font-bold text-white mb-1 relative">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-indigo-400 text-sm uppercase tracking-wider relative">Minutes</div>
                </div>
              </div>

              <div className="text-indigo-400 text-4xl font-light hidden sm:block">:</div>

              <div className="flex flex-col items-center time-unit-container">
                <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-indigo-500/20 min-w-[120px] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-all duration-300" />
                  <div className="text-4xl font-bold text-white mb-1 relative">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-indigo-400 text-sm uppercase tracking-wider relative">Seconds</div>
                </div>
              </div>
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

          /* Levitating Icon Animation */
          .levitating-icon-wrapper {
            position: relative;
            transform-style: preserve-3d;
            perspective: 1000px;
            display: inline-flex;
            will-change: transform;
          }

          .levitating-icon-wrapper > * {
            animation: levitate 3s ease-in-out infinite;
            transform-origin: center center;
          }

          @keyframes levitate {
            0%, 100% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              transform: translateY(-4px) scale(1.02) rotate(1deg);
            }
          }

          /* Enhanced hover effect */
          .group:hover .levitating-icon-wrapper > * {
            animation: levitateHover 2s ease-in-out infinite;
          }

          @keyframes levitateHover {
            0%, 100% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              transform: translateY(-6px) scale(1.05) rotate(2deg);
            }
          }

          /* Background Blob Animation */
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

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .fade-in-up {
              animation-duration: 0.6s;
            }

            .levitating-icon-wrapper > * {
              animation-duration: 2s;
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
            .animate-blob {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }

            .levitating-icon-wrapper > * {
              animation: none !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}