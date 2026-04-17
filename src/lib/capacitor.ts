import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export async function initMobile() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });

    // Handle back button for Android
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  } catch (error) {
    console.warn('Capacitor plugins not available:', error);
  }
}
