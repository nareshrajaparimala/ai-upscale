'use client'

import { Building2, Zap, Shirt, Scissors, Package, Flame, CreditCard, Palette } from 'lucide-react'

export default function CompanyLogos() {
  const companies = [
    { name: 'EPC', icon: Building2 },
    { name: 'Iksula', icon: Zap },
    { name: 'MUFTI', icon: Shirt },
    { name: 'STYCHED', icon: Scissors },
    { name: 'ThePantProject', icon: Package },
    { name: 'Candel', icon: Flame },
    { name: 'CRED', icon: CreditCard },
    { name: 'Creative', icon: Palette }
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 font-medium">
            ImageUpscale works with retail brands, enterprises and digital brands
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {companies.map((company, index) => {
              const IconComponent = company.icon
              return (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-600 transition-colors">
                    <IconComponent className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-wide">{company.name}</span>
                  </div>
                </div>
              )
            })}
            
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => {
              const IconComponent = company.icon
              return (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-600 transition-colors">
                    <IconComponent className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-wide">{company.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}