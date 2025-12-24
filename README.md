# AI Upscale - Professional Image Enhancement Platform

🚀 **Live Demo**: [https://ai-upscale-ten.vercel.app](https://ai-upscale-ten.vercel.app)

A modern, AI-powered image enhancement platform built with Next.js, featuring advanced upscaling, background removal, and professional image editing tools.

## ✨ Features

### 🎯 Core AI Tools
- **AI Image Upscaling** - Enhance resolution up to 8x with neural networks
- **Background Removal** - Remove backgrounds instantly using Remove.bg API
- **Noise Reduction** - Eliminate grain while preserving sharpness
- **Color Enhancement** - Automatic color correction and vibrancy boost

### 🎨 User Experience
- **Interactive Before/After Slider** - Compare original vs enhanced images
- **Drag & Drop Upload** - Seamless file handling
- **Real-time Processing** - Live preview and instant results
- **One-click Download** - Export high-quality results

### 📱 Modern Interface
- **Responsive Design** - Works perfectly on all devices
- **Customer Reviews** - Masonry grid layout with testimonials
- **FAQ Section** - Expandable questions with detailed answers
- **Professional Landing Page** - Animated sections and smooth scrolling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **File Storage**: Supabase Storage
- **AI APIs**: Remove.bg for background removal
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ai-upscale.git
cd ai-upscale
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Remove.bg API (for background removal)
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── remove-background/
│   │   ├── upscale/
│   │   └── upload/
│   ├── auth/                # Authentication pages
│   ├── components/          # Reusable components
│   │   ├── CustomerReviews.tsx
│   │   ├── FAQ.tsx
│   │   ├── FeatureShowcase.tsx
│   │   └── ...
│   ├── tools/               # AI tool pages
│   │   ├── image-upscaling/
│   │   └── background-remover/
│   └── page.tsx            # Home page
```

## 🔧 API Configuration

### Remove.bg Setup
1. Sign up at [Remove.bg](https://www.remove.bg/api)
2. Get your API key
3. Add to `.env.local` as `REMOVE_BG_API_KEY`

### Supabase Setup
1. Create a project at [Supabase](https://supabase.com)
2. Get your URL and anon key
3. Set up authentication and storage buckets

## 🎨 Key Components

- **LandingPage**: Animated intro with smooth transitions
- **FeatureShowcase**: Scroll-triggered feature highlights
- **CustomerReviews**: Masonry grid with testimonials
- **FAQ**: Expandable accordion interface
- **ImageUploader**: Drag & drop with preview
- **BeforeAfterSlider**: Interactive comparison tool

## 🚀 Deployment

The app is deployed on Vercel at [https://ai-upscale-ten.vercel.app](https://ai-upscale-ten.vercel.app)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-upscale)

1. Fork this repository
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@aiupscale.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js and modern web technologies**