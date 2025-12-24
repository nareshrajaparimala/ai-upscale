# ImageUpscale - AI Image Upscaling Platform

A fullstack web application for AI-powered image upscaling with integrated payment processing.

## 🚀 Tech Stack

### Frontend
- **Next.js 15+** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Backend in frontend (deployed on Vercel)
- **Express.js ready** - Can be separated into standalone server
- **Node.js** - Runtime environment

### External Services
- **AI Upscaling API** - For image enhancement
- **Paddle** - Payment gateway (Sandbox for testing)

## 📁 Project Structure

```
ai-upscale/
├── src/
│   ├── app/
│   │   ├── api/                    # Next.js API routes
│   │   │   ├── health/             # Health check endpoint
│   │   │   ├── upscale/            # Upscaling endpoints
│   │   │   └── payments/           # Payment processing
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Main navigation bar
│   │   │   └── ...                 # Other components
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   └── lib/
│       ├── api-client.ts           # Axios instance
│       ├── config.ts               # Configuration
│       └── ...
├── public/                         # Static assets
├── .env.example                    # Example environment variables
├── .env.local                      # Local environment variables
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
└── package.json                    # Dependencies

```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to project directory**
   ```bash
   cd /Users/nareshraja/Desktop/code/Work/ai-upscale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   - `UPSCALE_API_KEY` - Your AI upscaling API key
   - `PADDLE_API_KEY` - Your Paddle API key
   - `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` - Your Paddle client token
   - `JWT_SECRET` - A secure random string for JWT

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Design

The navbar is fully responsive and includes:
- **Desktop (md+)**: Horizontal dropdown menus with hover effects
- **Tablet (sm-md)**: Optimized spacing and touch-friendly buttons
- **Mobile (xs-sm)**: Hamburger menu with collapsible dropdowns

## 🎨 Design Features

- **Color Scheme**: Violet and purple gradient (matching Pixelbin reference)
- **Holiday Banner**: Top promotional banner (customizable)
- **Sticky Navigation**: Navigation stays at top while scrolling
- **Dropdown Menus**: Hover dropdowns (desktop) and click dropdowns (mobile)
- **Call-to-Action**: "Book a demo" button with gradient and hover effects
- **Phone Integration**: Direct phone call link

## 📍 Navigation Menu Structure

### Main Navigation
- **AI Tools**
  - Image Upscaling
  - Background Removal
  - Object Detection
  - Style Transfer

- **Developers**
  - API Documentation
  - SDKs
  - Code Examples
  - Pricing Plans

- **Pricing** (Direct link)

### Header Actions
- Phone: +1 866 670 7890
- Sign in link
- "Book a demo" button

## 🔌 API Routes

All API routes are in `src/app/api/`:

- `GET /api/health` - Health check endpoint
- `POST /api/upscale` - Upload and upscale images (to be implemented)
- `POST /api/payments/checkout` - Create payment session (to be implemented)
- `GET /api/payments/status/:id` - Check payment status (to be implemented)

## 🚀 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-upscale.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Environment Variables on Vercel**
   - Add all `.env.local` variables to Vercel project settings

## 🔐 Security Considerations

- Never commit `.env.local` (already in `.gitignore`)
- JWT_SECRET should be a strong random string in production
- Paddle API keys should be kept secret
- Always use HTTPS in production

## 🎯 Next Steps

1. Integrate AI upscaling API (remove placeholder)
2. Create image upload and processing components
3. Implement Paddle payment gateway
4. Add user authentication (JWT-based)
5. Create dashboard for users
6. Add image history and management
7. Implement admin panel

## 📦 Adding More Packages

```bash
npm install package-name
```

Common packages to consider:
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `next-auth` - Authentication
- `prisma` - Database ORM
- `sharp` - Image processing

## 🐛 Development Tips

- Hot reload enabled - changes reflect instantly
- TypeScript for type safety
- Tailwind classes for consistent styling
- Lucide React icons for SVG icons

## 📝 License

MIT License - Feel free to use for personal or commercial projects.

## 📧 Support

For setup issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Paddle Documentation](https://developer.paddle.com)
