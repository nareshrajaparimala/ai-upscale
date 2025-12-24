'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingPage from './components/LandingPage';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ImageUploader from './components/ImageUploader';
import CompanyLogos from './components/CompanyLogos';
import StatsSection from './components/StatsSection';
import StepsSection from './components/StepsSection';
import WhyChooseSection from './components/WhyChooseSection';
import StickyImageScroll from './components/StickyImageScroll';
import FeatureShowcase from './components/FeatureShowcase';
import CustomerReviews from './components/CustomerReviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onComplete={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Images with
            <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Upscaling
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Enhance your images instantly with cutting-edge AI technology. Increase resolution, improve quality, and bring your visuals to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/image-upscaling" className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 text-center">
              Get Started Free
            </Link>
            <Link href="/pricing" className="border-2 border-violet-600 text-violet-600 px-8 py-3 rounded-full font-semibold hover:bg-violet-50 transition-colors text-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Combined Upload & Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upload & See the Difference</h2>
          <p className="text-lg text-gray-600">Transform your images with AI upscaling technology.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Comparison Section with Before/After Slider */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Before & After</h3>
              <p className="text-gray-600">Drag the divider to compare the original and AI-upscaled images.</p>
            </div>
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=30"
              afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=95"
              beforeLabel="Original (Low Res)"
              afterLabel="AI Upscaled (High Res)"
            />
          </div>
          
          {/* Upload Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload & Transform</h3>
              <p className="text-gray-600">Drag and drop your image to enhance with AI.</p>
            </div>
            <ImageUploader />
          </div>
        </div>
      </section>
      
      {/* Company Logos Section */}
      <CompanyLogos />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Why Choose Section */}
      <WhyChooseSection />
      
      {/* Steps Section */}
      <StepsSection />
      
      {/* Sticky Image Scroll Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">AI Enhancement Features</h2>
          <p className="text-lg text-gray-600">Discover how our AI technology transforms your images.</p>
        </div>
        <StickyImageScroll />
      </section>
      
      {/* Feature Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Feature Showcase</h2>
          <p className="text-lg text-gray-600">Advanced AI capabilities for professional image enhancement.</p>
        </div>
        <FeatureShowcase />
      </section>
      
      <CustomerReviews />
      
      <FAQ />
      
      <Footer />
    </div>
  );
}
