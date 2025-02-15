import { HeroSection } from '@/components/HeroSection';
import { Benefits } from '@/components/WhyUsSection';
import { BootcampSection } from '@/components/BootcampSection';
import { JourneySection } from '@/components/JourneySection';
import { CoreToolsSection } from '@/components/CoreToolsSection';
import { DetailedComparisonSection } from '@/components/DetailedComparisonSection';
import { JoinUsSection } from '@/components/JoinUsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TradersResultsSection } from '@/components/TradersResultsSection';
import { FAQSection } from '@/components/FAQSection';
import { ChaseSection } from '@/components/ChaseSection';
import { FooterSection } from '@/components/FooterSection';
import { CookieBanner } from '@/components/CookieBanner';
import { useEffect, useState } from 'react';
import { initializeGA } from '@/lib/analytics';

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Initialize Google Analytics
    initializeGA();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header 
        className={`fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800 transform-gpu transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 transform-gpu transition-transform hover:scale-105">
              <img 
                src="https://flowprinttrading.com/00-icons/logomenu00.png" 
                alt="FlowPrint Logo" 
                className="h-8 w-8 animate-pulse-slow"
                loading="eager"
                decoding="async"
                width="32"
                height="32"
              />
              <span className="font-bold text-xl text-white">FlowPrint</span>
            </a>

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#why-us" className="transform-gpu transition-colors text-gray-300 hover:text-indigo-400 hover:scale-105">
                Why Us?
              </a>
              <a href="#bootcamp" className="transform-gpu transition-colors text-gray-300 hover:text-indigo-400 hover:scale-105">
                Training
              </a>
              <a href="#join-us" className="transform-gpu transition-colors text-indigo-400 font-medium hover:text-indigo-300 hover:scale-105">
                Join Us
              </a>
              <a href="#core-tools" className="transform-gpu transition-colors text-gray-300 hover:text-indigo-400 hover:scale-105">
                Tools
              </a>
              <a href="#testimonials" className="transform-gpu transition-colors text-gray-300 hover:text-indigo-400 hover:scale-105">
                Testimonials
              </a>
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center lg:hidden">
              <a 
                href="https://es.flowprinttrading.com/"
                className="flex items-center justify-center w-6 h-6 rounded-lg overflow-hidden mr-3 transform-gpu hover:scale-105 transition-all hover:bg-gray-800/50"
                aria-label="Versión en Español"
              >
                <img
                  src="https://flowprinttrading.com/00-icons/esp.png"
                  alt="Español"
                  className="absolute w-4 h-4 object-contain"
                  loading="eager"
                  width="16"
                  height="16"
                />
              </a>
              <button 
                className="hidden sm:block text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all transform-gpu text-sm mr-4 hover:scale-105"
              >
                Join Us
              </button>
              <a href="#join-us" className="relative group transform-gpu">
                <span className="absolute -inset-2 bg-indigo-500/20 rounded-lg blur-sm transition-all group-hover:bg-indigo-500/30"></span>
                <span className="relative px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all">
                  Join Us
                </span>
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="https://es.flowprinttrading.com/"
                className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden transform-gpu hover:scale-105 transition-all hover:bg-gray-800/50"
                aria-label="Versión en Español"
              >
                <img
                  src="https://flowprinttrading.com/00-icons/esp.png"
                  alt="Español"
                  className="absolute w-6 h-6 object-contain"
                  loading="eager"
                  width="24"
                  height="24"
                />
              </a>
              <a 
                href="#join-us"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all transform-gpu hover:shadow-lg hover:scale-105 button-hover"
              >
                Join Us
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <Benefits />
        <BootcampSection />
        <JourneySection />
        <CoreToolsSection />
        <JoinUsSection />
        <DetailedComparisonSection />
        <TestimonialsSection />
        <TradersResultsSection />
        <FAQSection />
        <ChaseSection />
        <FooterSection />
      </main>

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;