'use client'

import { Clock, Image, Layers, Zap, Globe, Wrench } from 'lucide-react'

export default function WhyChooseSection() {
  const features = [
    {
      icon: <Image className="w-8 h-8 text-white" />,
      title: "High-quality",
      description: "Get clear, high-resolution results with every edit, including smooth background removal",
      bgColor: "from-violet-500 to-purple-600"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Instant, accurate edits",
      description: "Make quick, precise edits without the usual wait or manual work",
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Efficient batch processing",
      description: "Edit thousands of images at once, maintaining quality and consistency across your projects",
      bgColor: "from-violet-500 to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Scalable for any need",
      description: "Whether working with a single photo or large batches, ImageUpscale adapts to teams and workflows of any size",
      bgColor: "from-violet-500 to-purple-600"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Easy integration",
      description: "Integrate ImageUpscale's API into your existing systems with a single call",
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: "All-in-one editing platform",
      description: "Find every image editing tool you need, from quick fixes to advanced customization, all in one place",
      bgColor: "from-violet-500 to-purple-600"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why choose ImageUpscale?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}