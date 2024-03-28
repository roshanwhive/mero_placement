/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/app/Store';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00b0f0',
    secondary: '#00b0f0',
  },
};

export default function Main() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <App />
          <FlashMessage position="top" duration={2000} />
        </PaperProvider>
      </Provider>
    </PersistGate>
  );
}

AppRegistry.registerComponent(appName, () => Main);
