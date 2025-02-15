import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Instagram, Mail, MapPin, MessageCircle, Phone, Send, Youtube } from 'lucide-react';
import { TikTokIcon } from './icons/TikTokIcon';

export function FooterSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate sections sequentially
            const elements = entry.target.querySelectorAll('.fade-element');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('fade-in-up');
              }, index * 200);
            });

            // Animate social icons with a delay
            const socialIcons = entry.target.querySelectorAll('.social-icon');
            socialIcons.forEach((icon, index) => {
              setTimeout(() => {
                icon.classList.add('fade-in-scale');
              }, 600 + (index * 100));
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

  const handleNewsletterClick = async () => {
    const emailInput = document.querySelector('#newsletter-email') as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch("https://hook.eu2.make.com/v72cujbacfbd3thj8p6eh7vequbl7e2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fecha: new Date().toISOString(),
          fuente: "Página Web Flowprint"
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setMessage('Thank you for subscribing!');
      emailInput.value = '';
    } catch (error) {
      console.error("Error al enviar webhook:", error);
      setStatus('error');
      setMessage('There was an error subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer 
      ref={sectionRef}
      id="contact-footer" 
      className="bg-gray-900 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-8">
          {/* Logo and Social Links */}
          <div className="fade-element opacity-0 transform translate-y-8 flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/5">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src="https://flowprinttrading.com/00-icons/logomenu00.png" 
                alt="FlowPrint Logo" 
                className="h-8 w-8" 
                loading="eager" 
                decoding="async" 
                width="32" 
                height="32"
              />
              <span className="font-bold text-xl text-white">FlowPrint</span>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Empowering traders with institutional-grade tools and education for consistent market success.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/flowprinttrading" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon opacity-0 scale-95 text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@flowprint.trading" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon opacity-0 scale-95 text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-110"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@FlowPrintTrading/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon opacity-0 scale-95 text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 relative px-6 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900 border-none rounded-full shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-95 transform-gpu">
              About Us
            </button>
          </div>

          {/* Quick Links */}
          <div className="fade-element opacity-0 transform translate-y-8 hidden lg:block lg:w-1/5">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#why-us" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block">Why Us?</a></li>
              <li><a href="#bootcamp" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block">Training</a></li>
              <li><a href="#join-us" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block">Join Us</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block">Testimonials</a></li>
              <li><a href="#core-tools" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block">Tools</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="fade-element opacity-0 transform translate-y-8 hidden lg:block lg:w-1/5">
            <h3 className="text-white font-semibold mb-3">Programs</h3>
            <ul className="space-y-1">
              <li>
                <a href="https://paypro.flowprinttrading.com/" className="block py-1.5 px-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm transform hover:-translate-y-0.5">
                  <span className="flex items-center">Pro Program</span>
                </a>
              </li>
              <li>
                <a href="https://payelite.flowprinttrading.com/" className="block py-1.5 px-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm transform hover:-translate-y-0.5">
                  <span className="flex items-center">Elite Plus</span>
                </a>
              </li>
              <li>
                <a href="#" className="block py-1.5 px-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm transform hover:-translate-y-0.5" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center">
                    Members
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="block py-1.5 px-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm transform hover:-translate-y-0.5">
                  <span className="flex items-center">Trading Tools</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="fade-element opacity-0 transform translate-y-8 text-center lg:text-left lg:w-1/5">
            <h3 className="text-white font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@flowprinttrading.com" 
                  className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400 hover:text-indigo-400 transition-all duration-300 text-sm transform-gpu hover:translate-x-1"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>support@flowprinttrading.com</span>
                </a>
              </li>
              <li className="hidden md:block">
                <a 
                  href="tel:+34621295784" 
                  className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400 hover:text-indigo-400 transition-all duration-300 text-sm transform-gpu hover:translate-x-1"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+34 621 29 57 84</span>
                </a>
              </li>
              <li className="hidden md:block">
                <div className="flex items-start justify-center lg:justify-start space-x-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 mt-1" />
                  <span>
                    C/ Acisclo Diaz nº 4<br />
                    Murcia - Spain
                  </span>
                </div>
              </li>
              <li>
                <a 
                  href="https://wa.me/+34640050663" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="fade-element opacity-0 transform translate-y-8 hidden md:block text-center lg:text-left lg:w-1/5">
            <h3 className="text-white font-semibold mb-3">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive more trading insights, new strategies and market updates.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  id="newsletter-email"
                  type="email" 
                  className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 ${
                    status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : ''
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleNewsletterClick}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 text-gray-50 shadow h-9 px-4 py-2 ${
                    isLoading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
                  } shrink-0 transform hover:-translate-y-0.5`}
                  type="button"
                  disabled={isLoading}
                >
                  <Send className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
                </button>
              </div>
              {message && (
                <p className={`text-sm ${
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                } transition-all duration-300 animate-in fade-in slide-in-from-bottom-1`}>
                  {message}
                </p>
              )}
              <p className="text-gray-400 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="fade-element opacity-0 transform translate-y-8 mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 FlowPrint Trading. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a 
                href="http://privacy.flowprinttrading.com" 
                target="_self"
                className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block"
              >
                Privacy Policy
              </a>
              <a 
                href="http://cookies.flowprinttrading.com" 
                target="_self"
                className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block group relative"
              >
                Cookie Policy
                <span className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap">
                  Manage cookie preferences
                </span>
              </a>
              <a 
                href="http://terms.flowprinttrading.com" 
                target="_self"
                className="text-gray-400 hover:text-indigo-400 transition-colors text-sm transform hover:translate-x-1 inline-block"
              >
                Terms of Service
              </a>
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

          .fade-in-scale {
            animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            animation-delay: var(--delay, 0ms);
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

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Link Hover Animations */
          a[href^="#"]:hover,
          a[href^="http"]:hover {
            transform: translateX(0.25rem);
          }

          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .fade-in-up,
            .fade-in-scale {
              animation-duration: 0.6s;
            }
          }

          /* Reduced Motion */
          @media (prefers-reduced-motion: reduce) {
            .fade-in-up,
            .fade-in-scale {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }

            a[href^="#"]:hover,
            a[href^="http"]:hover {
              transform: none !important;
            }
          }
        `}
      </style>
    </footer>
  );
}