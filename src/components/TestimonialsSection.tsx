import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  eager?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Sebastian Jancoski",
    role: "Professional trader and my mentor",
    image: "https://flowprinttrading.com/00-icons/testimonials01.jpg",
    quote: "Wow, Indeed student became better than old teacher. Congratulations my friend. I am so proud that you didn't give up and now you reached the sky.",
    eager: true
  },
  {
    name: "Michael Slovak",
    role: "Funded Trader",
    image: "https://flowprinttrading.com/00-icons/testimonials02.jpg",
    quote: "Man, I've never seen anyone like you before, I really appreciate your approach and how you do things, and also how much you've helped me... you're just the boss."
  },
  {
    name: "Sam",
    role: "Independent Trader",
    image: "https://flowprinttrading.com/00-icons/testimonials03.jpg",
    quote: "I already knew how to trade in the markets, but the academy helped me identify patterns and use tools that improved my accuracy. They explain everything in a clear and practical way."
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate card elements in sequence
            const elements = entry.target.querySelectorAll('[class*="opacity-0"]');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, i * 100 + (index * 150));
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="h-full bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg transform-gpu transition-all duration-300 hover:translate-y-[-4px] hover:border-indigo-500/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)] flex flex-col"
      style={{ willChange: 'transform', contain: 'content' }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="opacity-0 transform scale-95 transition-all duration-300 flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover"
            loading={testimonial.eager ? "eager" : "lazy"}
            decoding="async"
            width="64"
            height="64"
          />
        </div>
        <div className="opacity-0 transform translate-x-4 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
          <p className="text-indigo-400">{testimonial.role}</p>
        </div>
      </div>

      {/* Quote Icon */}
      <Quote 
        className="h-8 w-8 text-indigo-400 mb-4 opacity-0 transition-all duration-300 flex-shrink-0"
        aria-hidden="true"
      />

      {/* Quote Text */}
      <p className="text-gray-300 mb-6 leading-relaxed opacity-0 transform translate-x-4 transition-all duration-300 flex-grow">
        {testimonial.quote}
      </p>

      {/* Rating */}
      <div className="opacity-0 transform translate-y-4 transition-all duration-300 mt-auto">
        <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              className="w-5 h-5 fill-current transform-gpu"
              viewBox="0 0 20 20"
              aria-hidden="true"
              style={{ willChange: 'transform' }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            const header = entry.target.querySelector('.section-header');
            header?.classList.add('fade-in-up');

            // Animate testimonial cards
            const cards = entry.target.querySelectorAll('.testimonial-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('fade-in-up');
              }, index * 200);
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
      id="testimonials" 
      className="py-20 bg-gray-900" 
      ref={sectionRef}
      style={{ contain: 'content' }}
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
        style={{ contain: 'layout style' }}
      >
        {/* Header */}
        <div className="section-header text-center mb-12 opacity-0 transform translate-y-8">
          <h2 className="text-3xl font-bold mb-4 text-white">What Our Traders Say</h2>
          <p className="text-xl text-gray-400">
            Vibes That Make Us Smile: Heartfelt Words From Our Traders, and Ex-Mentor
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          className="grid md:grid-cols-3 gap-8 auto-rows-fr"
          style={{ willChange: 'transform', contain: 'layout style' }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="testimonial-card opacity-0 transform translate-y-8 h-full"
              style={{ '--delay': `${index * 200}ms` } as React.CSSProperties}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
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

          .animate-in {
            opacity: 1 !important;
            transform: none !important;
          }

          /* Keyframe Animations */
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

          /* Card Hover Effects */
          .testimonial-card:hover {
            transform: translateY(-4px);
          }

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .fade-in-up {
              animation-duration: 0.6s;
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
            .animate-in {
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