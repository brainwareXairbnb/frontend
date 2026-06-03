import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brainx.app',
  appName: 'BrainX',
  webDir: 'out',
  android: {
    overrideUserAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  },
  server: {
    androidScheme: 'https', // CRITICAL: HTTPS required for Razorpay payments
    hostname: 'app.brainx.com',
    iosScheme: 'ionic',
    // Allow navigation to external URLs (required for Razorpay payment flow)
    allowNavigation: [
      'checkout.razorpay.com',
      'api.razorpay.com',
      '*.razorpay.com',
      'app.brainx.com',
      '*.onrender.com',
    ],
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '296069206416-nl84jgdfq3va0thplfhhoebo49gc1miv.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
