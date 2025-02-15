import { ChevronRight } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { AnimatedText } from './AnimatedText';
import { AnimatedSection } from './AnimatedSection';
import { FinancialSlider } from './FinancialSlider';

const certificateImages = [
  'https://flowprinttrading.com/certificate/ft01.avif',
  'https://flowprinttrading.com/certificate/ft02.avif',
  'https://flowprinttrading.com/certificate/ft03.avif',
  'https://flowprinttrading.com/certificate/ft04.avif',
  'https://flowprinttrading.com/certificate/ft05.avif',
  'https://flowprinttrading.com/certificate/ft06.avif',
  'https://flowprinttrading.com/certificate/ft07.avif',
];

const tradingImages = [
  'https://flowprinttrading.com/00-icons/1.avif',
  'https://flowprinttrading.com/00-icons/2.avif',
  'https://flowprinttrading.com/00-icons/3.avif',
  'https://flowprinttrading.com/00-icons/4.avif',
  'https://flowprinttrading.com/00-icons/5.avif',
  'https://flowprinttrading.com/00-icons/6.avif',
  'https://flowprinttrading.com/00-icons/7.avif',
  'https://flowprinttrading.com/00-icons/8.avif',
];

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=1920")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-indigo-900/90 to-gray-900/95" />

      <div className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AnimatedSection animation="fade-up" delay={200} className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left space-y-6 md:space-y-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                From Real Traders to Future CPTs
              </h1>
              <div className="space-y-6">
                <div className="flex flex-nowrap items-center justify-center lg:justify-start text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
                  <span className="text-white">Become a</span>
                  <AnimatedText />
                  <span className="text-white">Trader</span>
                </div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  by mastering a proven framework through our comprehensive training, proprietary tools, personalized mentorship, and a community of successful traders.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <a 
                    href="#join-us"
                    className="group inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg transition-all transform hover:translate-y-[-2px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-base w-auto justify-center shadow-lg hover:shadow-indigo-500/25 hover-lift hover-glow"
                    aria-label="Explore our trading program"
                  >
                    <span className="font-medium">Explore the Program</span>
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400} className="lg:pl-8">
              <div className="hidden md:block space-y-3 mt-8 md:mt-10 lg:mt-0 max-w-[640px] mx-auto lg:max-w-none">
                <ImageCarousel 
                  images={certificateImages} 
                  direction="reverse"
                />
                <ImageCarousel 
                  images={tradingImages}
                  direction="normal"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Financial Slider */}
          <div className="mt-8 mb-[-2rem] sm:mb-[-3rem] md:mb-[-4rem] lg:mb-[-5rem] relative z-10">
            <FinancialSlider />
          </div>
        </div>
      </div>
    </section>
  );
}