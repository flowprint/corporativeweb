import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What platforms do you work with?",
    answer: "The training is designed and optimized for ATAS, NinjaTrader, and SierraChart. Tools, scripts, and analysis run directly on these platforms—no additional setup required."
  },
  {
    question: "Which platforms support your proprietary indicators?",
    answer: "Our proprietary indicators are fully compatible with NinjaTrader 8 and ATAS. We provide detailed setup guides and support for both platforms."
  },
  {
    question: "Is the prop firm challenge bot ready?",
    answer: "The prop firm challenge bot is in final testing phase. Pro Program members will get access once it's released, while Elite Plus members get early access to beta versions and updates."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans for both programs. Contact our support team for details about installment options."
  },
  {
    question: "What support will I get after purchasing?",
    answer: "You'll get lifetime access to our Discord community, regular live sessions, weekly market recaps, and continuous updates. Elite Plus members also receive 1:1 mentoring."
  },
  {
    question: "Can I watch the training sessions later?",
    answer: "Yes, all live sessions are recorded and available in your member area. You can review them anytime, ensuring you never miss important content."
  },
  {
    question: "How is this different from other trading courses?",
    answer: "We focus on practical application with real-time analysis, proprietary tools, and ongoing mentorship. Our approach combines institutional methods with retail-friendly execution."
  },
  {
    question: "Do I need to buy additional tools?",
    answer: "No additional purchases required beyond your chosen trading platform. All proprietary indicators and tools are included in your membership."
  },
  {
    question: "Do you have verifiable student results?",
    answer: "Yes, we maintain a transparent track record of student achievements, including funded accounts and consistent trading results. These are available upon request."
  },
  {
    question: "Why should I trust you?",
    answer: "Our track record, transparent approach, and community of successful traders speak for themselves. We're traders first, educators second, focusing on real results over marketing."
  }
];

function FAQItem({ 
  faq, 
  index, 
  isOpen, 
  onToggle 
}: { 
  faq: FAQ; 
  index: number; 
  isOpen: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        const height = answerRef.current.scrollHeight;
        answerRef.current.style.maxHeight = `${height}px`;
        setTimeout(() => {
          if (answerRef.current) {
            answerRef.current.style.opacity = '1';
            answerRef.current.querySelector('.answer-content')?.classList.remove('translate-y-4', 'opacity-0');
          }
        }, 50);
      } else {
        if (answerRef.current) {
          answerRef.current.style.maxHeight = '0';
          answerRef.current.style.opacity = '0';
          answerRef.current.querySelector('.answer-content')?.classList.add('translate-y-4', 'opacity-0');
        }
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={itemRef}
      className="faq-item opacity-0 transform translate-y-8 border border-gray-700 rounded-lg overflow-hidden 
                 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-500"
      style={{ 
        '--delay': `${index * 100}ms`,
        willChange: 'transform, opacity'
      } as React.CSSProperties}
    >
      <button 
        className="w-full px-6 py-4 text-left flex justify-between items-center group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-white transition-transform duration-500">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 transition-all duration-500 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown className="w-5 h-5 text-blue-400" />
        </div>
      </button>
      <div 
        ref={answerRef}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: 0, opacity: 0, willChange: 'max-height, opacity' }}
      >
        <div className="answer-content px-6 pb-4 text-gray-300 transform transition-all duration-500 translate-y-4 opacity-0">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            const headerElements = entry.target.querySelectorAll('.header-content');
            headerElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('fade-in-up');
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

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const firstHalf = faqs.slice(0, Math.ceil(faqs.length / 2));
  const secondHalf = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section 
      id="frequently-asked-questions" 
      className="py-20 bg-gray-900"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="header-content text-3xl font-bold text-white mb-4 opacity-0 transform translate-y-8">
            Frequently Asked Questions
          </h2>
          <p className="header-content text-xl text-gray-400 opacity-0 transform translate-y-8">
            Vibes That Make Us Smile: Heartfelt Words From Our Traders, and Ex-Mentor
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {firstHalf.map((faq, index) => (
              <FAQItem 
                key={faq.question} 
                faq={faq} 
                index={index} 
                isOpen={activeIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
          <div className="space-y-4">
            {secondHalf.map((faq, index) => {
              const actualIndex = index + firstHalf.length;
              return (
                <FAQItem 
                  key={faq.question} 
                  faq={faq} 
                  index={actualIndex}
                  isOpen={activeIndex === actualIndex}
                  onToggle={() => handleToggle(actualIndex)}
                />
              );
            })}
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

          /* FAQ Item Hover Effects */
          .faq-item:hover {
            transform: translateY(-2px);
          }

          /* Chevron Animation */
          .rotate-180 {
            transform: rotate(180deg);
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

            .fade-in-up {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }

            .faq-item:hover {
              transform: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}