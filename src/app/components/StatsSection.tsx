'use client';

import { Users, Zap } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-violet-50 to-purple-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Total Users Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-gray-600 text-sm sm:text-base font-medium uppercase tracking-wider mb-2">
                  Total Users
                </p>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  58M+
                </h3>
              </div>
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 p-4 rounded-xl">
                <Users className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Join millions of users transforming their images with AI-powered upscaling technology.
            </p>
          </div>

          {/* Bandwidth Saved Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-gray-600 text-sm sm:text-base font-medium uppercase tracking-wider mb-2">
                  Bandwidth Saved
                </p>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  11TB
                </h3>
              </div>
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 p-4 rounded-xl">
                <Zap className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Optimize your image storage with our efficient AI technology that maintains quality while reducing file sizes.
            </p>
          </div>
        </div>

        {/* Text Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border-l-4 border-violet-600">
          <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Why Choose AIUpscale?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full" />
                <h5 className="font-semibold text-gray-900">Lightning Fast</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Process your images in seconds with our state-of-the-art AI models.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full" />
                <h5 className="font-semibold text-gray-900">High Quality</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Experience stunning results with cutting-edge upscaling technology that preserves details.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full" />
                <h5 className="font-semibold text-gray-900">Cost Effective</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Save on storage with optimized images without compromising on visual quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
