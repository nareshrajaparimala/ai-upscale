export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'ImageUpscale',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    upscaleBaseUrl: process.env.NEXT_PUBLIC_UPSCALE_API_BASE_URL,
  },
  paddle: {
    clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    environment: process.env.PADDLE_ENVIRONMENT || 'sandbox',
  },
};
