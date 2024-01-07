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
      "launchShowDuration": 2000,
      "launchAutoHide": true,
      "backgroundColor": "#890505",
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
