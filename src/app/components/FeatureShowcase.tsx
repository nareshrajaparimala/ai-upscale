'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'ai-upscaling',
    title: 'AI Upscaling',
    description: 'Revolutionary AI algorithms that intelligently enhance image resolution while preserving fine details and textures. Our advanced neural networks analyze pixel patterns to create stunning high-resolution images.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: 'photo-restoration',
    title: 'Photo Restoration',
    description: 'Breathe new life into old, damaged, or faded photographs. Our AI-powered restoration technology removes scratches, fixes tears, and restores original colors to bring your memories back to their former glory.',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: 'noise-reduction',
    title: 'Noise Reduction',
    description: 'Eliminate unwanted grain and digital noise from your images while maintaining sharpness and clarity. Perfect for low-light photography and vintage image enhancement.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: 'color-enhancement',
    title: 'Color Enhancement',
    description: 'Automatically adjust and enhance colors to make your images more vibrant and visually appealing. Our AI understands color theory to create natural-looking enhancements.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop&auto=format&q=80'
  }
];

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeature(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
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
      <div className="relative space-y-40">
        {/* Progress Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
          <motion.div 
            className="w-full bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"
            initial={{ height: '0%' }}
            animate={{ height: `${((activeFeature + 1) / features.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        
        {features.map((feature, index) => (
          <div
            key={feature.id}
            ref={el => { featureRefs.current[index] = el; }}
            className="relative py-20 pl-8"
          >
            {/* Progress Dot */}
            <motion.div 
              className={`absolute left-0 top-24 w-6 h-6 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 ${
                activeFeature === index ? 'bg-violet-600' : 'bg-gray-300'
              }`}
              animate={{ 
                scale: activeFeature === index ? 1.2 : 1,
                backgroundColor: activeFeature === index ? '#7c3aed' : '#d1d5db'
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: activeFeature === index ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Right Column - Sticky Image */}
      <div className="lg:sticky lg:top-1/2 lg:transform lg:-translate-y-1/2 h-fit mt-40">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={features[activeFeature].id}
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}