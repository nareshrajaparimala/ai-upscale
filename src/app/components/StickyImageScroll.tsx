'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  {
    id: 'enhance',
    title: 'Enhance Quality',
    description: 'Transform low-resolution images into crystal-clear, high-quality visuals with advanced AI algorithms.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: 'upscale',
    title: 'Upscale Resolution',
    description: 'Increase image dimensions up to 4x while maintaining sharp details and natural textures.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: 'restore',
    title: 'Restore Details',
    description: 'Recover lost details and reduce noise to bring old or damaged photos back to life.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80'
  }
];

export default function StickyImageScroll() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.6 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Left Column - Scrolling Text */}
      <div className="relative space-y-32">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 to-purple-600"></div>
        
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={el => { sectionRefs.current[index] = el; }}
            className="relative py-16 pl-12"
          >
            {/* Circle Dot */}
            <div className={`absolute left-0 top-20 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 transition-colors duration-300 ${
              activeSection === index ? 'bg-violet-600' : 'bg-gray-300'
            }`}></div>
            
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              {section.title}
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}
      </div>

      {/* Right Column - Sticky Image */}
      <div className="lg:sticky lg:top-[60%] lg:transform lg:-translate-y-1/2 h-fit mt-50">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
          {sections.map((section, index) => (
            <img
              key={section.id}
              src={section.image}
              alt={section.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                activeSection === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}