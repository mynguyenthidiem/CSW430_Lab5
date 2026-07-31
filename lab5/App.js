import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation/AppNavigation';
import { AppTheme } from './styles/Styles';

import ServiceDetail from './screens/ServiceDetail';
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={AppTheme}>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}