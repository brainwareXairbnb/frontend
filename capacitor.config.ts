import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brainx.app',
  appName: 'BrainX',
  webDir: 'out',
  server: {
    androidScheme: 'https', // CRITICAL: HTTPS required for Razorpay payments
    iosScheme: 'ionic',
    // Allow navigation to external URLs (required for Razorpay payment flow)
    allowNavigation: [
      'checkout.razorpay.com',
      'api.razorpay.com',
      '*.razorpay.com',
      'localhost',
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
