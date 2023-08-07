import React, {useEffect, useState} from 'react';
import MainStackNavigator from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import stores from './src/stores';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';

const {store, persistor} = stores;

import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  const [loading, setLoading] = useState(true);

  const Appss = async () => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status', authStatus);
      }
    }
    // Handle incoming messages when the app is in the foreground
    messaging().onMessage(async remoteMessage => {
      console.log('Received foreground notification:', remoteMessage);
      // You can handle the notification data here and show custom UI if needed.
    });
    // Handle notification when the app is in the background or terminated
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Received background notification:', remoteMessage);
      // You can handle the notification data here and show custom UI if needed.
    });
    messaging().onNotificationOpenedApp(remoteMesage => {
      console.log('On App mesage', remoteMesage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notifikasi ketika apk tutup',
            remoteMessage.notification,
          );
        }
      });
    // Get the FCM token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  };

  useEffect(() => {
    Appss();
  }, []);
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainStackNavigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
