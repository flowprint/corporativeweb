import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const tradingImages = [
  'https://flowprinttrading.com/tests/pb01.avif',
  'https://flowprinttrading.com/tests/ft01.avif',
  'https://flowprinttrading.com/tests/1.avif',
  'https://flowprinttrading.com/tests/pb02.avif',
  'https://flowprinttrading.com/tests/pb03.avif',
  'https://flowprinttrading.com/tests/2.avif',
  'https://flowprinttrading.com/tests/ft02.avif',
  'https://flowprinttrading.com/tests/ft03.avif',
  'https://flowprinttrading.com/tests/3.avif',
  'https://flowprinttrading.com/tests/pb04.avif',
  'https://flowprinttrading.com/tests/pb05.avif',
  'https://flowprinttrading.com/tests/4.avif',
  'https://flowprinttrading.com/tests/ft04.avif',
  'https://flowprinttrading.com/tests/ft05.avif',
  'https://flowprinttrading.com/tests/5.avif',
  'https://flowprinttrading.com/tests/pb06.avif',
  'https://flowprinttrading.com/tests/6.avif',
  'https://flowprinttrading.com/tests/7.avif',
  'https://flowprinttrading.com/tests/ft06.avif',
  'https://flowprinttrading.com/tests/ft07.avif',
  'https://flowprinttrading.com/tests/8.avif',
  'https://flowprinttrading.com/tests/9.avif',
  'https://flowprinttrading.com/tests/pb07.avif',
  'https://flowprinttrading.com/tests/pb08.avif',
  'https://flowprinttrading.com/tests/10.avif',
  'https://flowprinttrading.com/tests/pb09.avif',
];

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

function ImageModal({ src, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div 
        className="relative max-w-5xl w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        <img
          src={src}
          alt=""
          className="w-full h-full object-contain bg-black/90"
          loading="eager"
        />
      </div>
    </div>
  );
}

export function TradersResultsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - scrollContainer.offsetLeft;
      scrollLeft.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      scrollContainer.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX.current) * 2;
      scrollContainer.scrollLeft = scrollLeft.current - walk;
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageClick = (src: string, e: React.MouseEvent) => {
    // Only open modal if not dragging
    if (!isDragging.current) {
      e.preventDefault();
      setSelectedImage(src);
    }
  };

  return (
    <section id="traders-results" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat" 
          aria-hidden="true"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1920")',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95" 
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Traders' Results</h2>

        <div 
          className="relative w-full overflow-hidden bg-gray-900/50 backdrop-blur-sm py-12 cursor-grab active:cursor-grabbing"
          style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
        >
          <div 
            ref={scrollRef}
            className="flex gap-4 animate-scroll"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)',
              touchAction: 'none'
            }}
          >
            {[...tradingImages, ...tradingImages].map((src, index) => (
              <div 
                key={`${src}-${index}`}
                className="relative flex-none w-72 h-48 overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 will-change-transform group"
                style={{
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}
                onClick={(e) => handleImageClick(src, e)}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300 cursor-pointer"
                  draggable={false}
                  loading={index < 8 ? "eager" : "lazy"}
                  style={{
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 group-hover:opacity-75 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 1rem));
            }
          }

          .animate-scroll {
            animation: scroll 10s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
            }
          }

          .animate-in {
            animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .fade-in {
            animation: fade-in 0.2s ease-out;
          }

          @keyframes modal-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </section>
  );
}