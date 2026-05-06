import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brainx.app',
  appName: 'BrainX',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    cleartext: true,
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
