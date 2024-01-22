import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tascky.ionic',
  appName: 'Tascky',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "androidSpinnerStyle": "small",
      "iosSpinnerStyle": "small",
      "splashFullScreen": true,
      "splashImmersive": true
    },
  }
};

export default config;
