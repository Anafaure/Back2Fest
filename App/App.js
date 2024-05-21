import React from 'react';
import './config/firebase';
import RootNavigation from './navigation';
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <RootNavigation />
  )

}
