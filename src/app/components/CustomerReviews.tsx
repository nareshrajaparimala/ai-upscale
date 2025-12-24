'use client';

import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    stars: 5,
    content: "Absolutely incredible! The AI upscaling transformed my old family photos into crystal-clear memories. The detail enhancement is mind-blowing.",
    author: "Sarah Chen"
  },
  {
    id: 2,
    stars: 5,
    content: "Professional photographer here - this tool saved me hours of manual editing. The noise reduction is phenomenal.",
    author: "Marcus Rodriguez"
  },
  {
    id: 3,
    stars: 5,
    content: "My grandmother's vintage photos look brand new. The restoration feature brought back colors I thought were lost forever.",
    author: "Emily Watson"
  },
  {
    id: 4,
    stars: 5,
    content: "Game changer for my design agency. Client satisfaction has skyrocketed since we started using this.",
    author: "David Kim"
  },
  {
    id: 5,
    stars: 5,
    content: "The quality is unmatched. Every pixel is enhanced with such precision - it's like magic!",
    author: "Lisa Thompson"
  },
  {
    id: 6,
    stars: 5,
    content: "Fast, reliable, and produces stunning results every time. Worth every penny.",
    author: "James Wilson"
  }
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=80"
];

export default function CustomerReviews() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(168,85,247,0.05)_25%,rgba(168,85,247,0.05)_26%,transparent_27%,transparent_74%,rgba(168,85,247,0.05)_75%,rgba(168,85,247,0.05)_76%,transparent_77%,transparent)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What people say about us
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Floating Stats */}
          <div className="lg:sticky lg:top-32 flex-shrink-0">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">200k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="flex justify-center">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-violet-600 border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="text-white text-sm font-medium">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="flex-1 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="break-inside-avoid bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.content}"
                </p>

                {/* Author */}
                <div className="font-bold text-gray-900">
                  {review.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}