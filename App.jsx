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
import SplashScreen from 'react-native-splash-screen'
import usePushNotification from './src/hook/usePushNotification';

function App() {

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  // useEffect(() => {
  //   getDeviceToken();
  // }, []);
  //foreground notification
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  // const getDeviceToken = async () => {
  //   let token = await messaging().getToken();
  //   console.log("fcmtoken:", token);
  // }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 500);
  })

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
}

export default App;
