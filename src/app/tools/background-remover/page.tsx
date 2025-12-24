'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) throw new Error('No file selected');

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove background');
      }

      setProcessedImage(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    link.click();
  };

  const reset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Remove backgrounds from your images instantly with AI-powered precision
          </p>
        </div>

        {/* Upload Section */}
        {!originalImage && (
          <div className="max-w-2xl mx-auto">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-violet-600 hover:bg-violet-50 transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="bg-violet-600 text-white p-4 rounded-full inline-flex group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Upload your image
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop or click to select an image
              </p>
              <button className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-colors">
                Choose Image
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Supports JPG, PNG, WEBP up to 10MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Processing Section */}
        {originalImage && (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {!processedImage && (
                <button
                  onClick={removeBackground}
                  disabled={isProcessing}
                  className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      Remove Background
                    </>
                  )}
                </button>
              )}
              
              {processedImage && (
                <button
                  onClick={downloadImage}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              )}
              
              <button
                onClick={reset}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                <Trash2 className="w-5 h-5" />
                Reset
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Image Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Original</h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Processed Image */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Removed</h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                  {/* Checkerboard pattern for transparency */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] bg-[length:20px_20px] bg-[0_0,0_10px,10px_-10px,-10px_0px]"></div>
                  
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="Background Removed"
                      className="relative w-full h-full object-contain"
                    />
                  ) : (
                    <div className="relative flex items-center justify-center h-full">
                      {isProcessing ? (
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
                          <p className="text-gray-600">Removing background...</p>
                        </div>
                      ) : (
                        <p className="text-gray-500">Click "Remove Background" to process</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}