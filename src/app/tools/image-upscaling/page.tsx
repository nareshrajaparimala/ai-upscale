import ImageUploader from '@/app/components/ImageUploader';
import ComparisonSlider from '@/app/components/ComparisonSlider';

export default function ImageUpscalingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            AI Image Upscaling
            <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Enhance Your Images
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform low-resolution images into high-quality masterpieces using advanced AI technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Comparison Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">See the Difference</h3>
              <p className="text-gray-600">Drag the slider to compare quality improvement.</p>
            </div>
            <ComparisonSlider />
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
    </div>
  );
}