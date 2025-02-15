import { useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  direction?: 'normal' | 'reverse';
  className?: string;
}

export function ImageCarousel({ images, direction = 'normal', className = '' }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const speed = direction === 'reverse' ? -1 : 1;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (scrollContainer) {
        scrollContainer.scrollLeft += speed;

        // Reset scroll position when reaching the end
        if (direction === 'normal' && scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        } else if (direction === 'reverse' && scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [direction]);

  return (
    <div 
      className={`relative w-full overflow-hidden bg-gray-900/50 backdrop-blur-sm py-3 rounded-xl shadow-lg ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-hidden"
        style={{ willChange: 'transform' }}
      >
        {[...images, ...images].map((src, index) => (
          <div 
            key={`${src}-${index}`}
            className="relative flex-none w-36 sm:w-44 md:w-48 lg:w-64 aspect-video overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={src}
              alt={`Trading scene ${index + 1}`}
              className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
              draggable={false}
              loading={index < 8 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
          </div>
        ))}
      </div>
    </div>
  );
}