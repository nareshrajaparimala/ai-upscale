'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Zap, Image as ImageIcon } from 'lucide-react';

export default function LandingPage({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center z-50 opacity-0 transition-opacity duration-500" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center z-50">
      <div className="text-center text-white animate-fade-in">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 animate-pulse">
            <div className="relative">
              <ImageIcon size={40} className="text-white" />
              <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-300 animate-bounce" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl animate-pulse" />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-bold mb-4 animate-slide-up">
          AI<span className="text-yellow-300">Upscale</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-white/90 mb-8 animate-slide-up delay-200">
          Transform Images with AI Power
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 animate-slide-up delay-400">
          <Zap size={20} className="text-yellow-300 animate-bounce" />
          <span className="text-lg">Loading Experience...</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}