'use client';

import { useState, useRef } from 'react';
import { Upload, Zap, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function StepsSection() {
  const [selectedLevel, setSelectedLevel] = useState('2x');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (uploadedImage) {
      const link = document.createElement('a');
      link.href = uploadedImage;
      link.download = `upscaled-image-${selectedLevel}.png`;
      link.click();
    }
  };

  const upscaleLevels = [
    { label: '2x', scale: 2 },
    { label: '4x', scale: 4 },
    { label: '8x', scale: 8 },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Steps to upscale and enhance
          </h2>
          <p className="text-lg text-gray-600">Simple 3-step process to transform your images</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {/* Step 1: Upload */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
              {/* Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-4/5 h-4/5 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-violet-600 hover:bg-violet-50 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-violet-600 text-white p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-6 h-6" />
                    </div>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-violet-700 transition-colors text-sm mb-2">
                    + Upload image
                  </button>
                  <p className="text-gray-500 text-xs">or drop an image here</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-600 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Upload</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Start by uploading your image to AIUpscale's free AI image upscaler. It supports JPG, JPEG, PNG, HEIC, and WEBP formats. You can drag and drop or click to select your file.
              </p>
            </div>
          </div>

          {/* Step 2: AI Magic */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden p-4">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center flex flex-col items-center justify-center w-full h-full">
                  <img
                    src="https://cdn.prod.website-files.com/6731a48704da280d69878c4c/67d00bee449bb3089f552470_Frame%202147224856.avif"
                    alt="AI Enhancement Example - Before"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-600 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI magic</h3>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose your desired upscaling level, up to 2x, 4x, or 8x, and our AI automatically enhances clarity, sharpness, and details in seconds.
                </p>
                {/* Upscaling Level Selector */}
                <div className="flex gap-2">
                  {upscaleLevels.map((level) => (
                    <button
                      key={level.label}
                      onClick={() => setSelectedLevel(level.label)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                        selectedLevel === level.label
                          ? 'bg-violet-600 text-white shadow-lg scale-105'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Download */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden p-4">
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={uploadedImage}
                    alt="Upscaled"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent rounded-lg flex items-end justify-center pb-4">
                    <button
                      onClick={handleDownload}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      Download image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src="https://cdn.prod.website-files.com/6731a48704da280d69878c4c/67d00bf3252888f640445035_Frame%202147224858.avif"
                    alt="AI Enhancement Example - After"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent rounded-lg flex items-end justify-center pb-4">
                    {/* <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 opacity-70 cursor-not-allowed"> */}
                      {/* <Download className="w-4 h-4" /> */}
                      {/* Download image
                    </button> */}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-600 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Download</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Once the upscaling is done, simply download your high-resolution image. You can also use the downloaded image for extra touch-ups. Try the 'AIUpscale Studio' for more advanced edits, all at no extra cost.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Link href="/tools/image-upscaling" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
            Try now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
