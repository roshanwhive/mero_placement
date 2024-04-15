/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routing/Router';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

function App() {

  useEffect(() => {
    getDeviceToken();
  }, []);
//foreground notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log("fcmtoken:", token);
  }
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
}

export default App;
