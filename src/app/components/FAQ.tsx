'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "Does making a picture bigger make it look better?",
    answer: "Yes! Our free AI tool improves the resolution, color, texture, and sharpness of your images. Additionally, this gives them a polished, professional look."
  },
  {
    id: 2,
    question: "How can I enlarge an image without losing quality?",
    answer: "Our AI upscaling technology uses advanced machine learning algorithms to intelligently predict and fill in missing pixels when enlarging images. Unlike traditional methods that simply stretch pixels, our AI analyzes patterns, textures, and edges to create new detail that maintains and often improves the original quality."
  },
  {
    id: 3,
    question: "Is it safe to use upscaling?",
    answer: "Absolutely! Our AI upscaling process is completely safe and non-destructive. Your original images are never modified - we create enhanced versions while preserving your originals. All uploads are processed securely and can be deleted from our servers at any time."
  },
  {
    id: 4,
    question: "What is the point of upscaling?",
    answer: "Image upscaling allows you to use images in larger formats without pixelation or blur. It's perfect for printing large photos, creating high-resolution displays, improving old or low-quality images, and preparing images for professional use. It essentially gives you more flexibility with your existing image library."
  },
  {
    id: 5,
    question: "Can I make blurry pictures bigger?",
    answer: "Yes! Our AI is specifically designed to handle blurry and low-quality images. The upscaling process not only increases size but also applies deblurring and sharpening techniques to significantly improve clarity and detail in your images."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've answered some of the most common questions about AI upscaling. If you don't find what you need, 
            feel free to reach out at{' '}
            <a href="mailto:support@aiupscale.com" className="text-violet-600 hover:text-violet-700">
              support@aiupscale.com
            </a>{' '}
            or check our{' '}
            <a href="#" className="text-violet-600 hover:text-violet-700">
              documentation
            </a>{' '}
            for more details.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <X className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}