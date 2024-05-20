import React, { useEffect } from 'react';
import './config/firebase';
import RootNavigation from './navigation';
import NfcManager from 'react-native-nfc-manager';

export default function App() {
  useEffect(() => {
    // Initialize NFC Manager
    NfcManager.start().catch((error) => {
      console.warn('NFC Manager is not available:', error);
    });
  }, []);

  return <RootNavigation />;
}
