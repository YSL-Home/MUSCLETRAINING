import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'uk.muscletraining.app',
  appName: 'Muscle Training',
  webDir: 'out',
  backgroundColor: '#07070F',
  ios: {
    contentInset: 'always',
    backgroundColor: '#07070F',
  },
  android: {
    backgroundColor: '#07070F',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#07070F',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#07070F',
    },
  },
}

export default config
