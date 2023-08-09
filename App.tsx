import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStackNavigator from './src/navigation';
import stores from './src/stores';
import messaging from '@react-native-firebase/messaging';
import {View, Text} from 'react-native';
import PushNotification from 'react-native-push-notification';
import createNotificationChannel from './src/utils/notificationConfig';
import CustomNotification from './src/utils/customNotification';
import Sound from 'react-native-sound';
// import notificationSound from './src/assets/sound/ini.mp3';
const {store, persistor} = stores;

const App = () => {
  // const [loading, setLoading] = useState(true);
  const [notificationData, setNotificationData] = useState(null);

  const handleForegroundNotification = async remoteMessage => {
    // console.log('INI DARI FOREGROUND', remoteMessage);
    const {title, body, text} = remoteMessage.notification;
    // showNotification({title, body}); // Call the showNotification function with the notification object
    const sound = new Sound(
      require('./android/app/src/main/res/raw/ini.mp3'),
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        // Play the sound
        sound.play(success => {
          if (success) {
            console.log('Notification sound played successfully');
          } else {
            console.log('Notification sound playback failed');
          }
          // Release the sound after playing
          sound.release();
        });
      },
    );
    setNotificationData({title, body, text});
  };

  const handleBackgroundNotification = notification => {
    console.log('INI DARI BACKGROUND', notification);
    // Add your custom logic to handle the background notification here
    // You can show a local notification, update state, or perform any other action
  };

  // const showNotification = notification => {
  //   PushNotification.localNotification({
  //     channelId: 'default-channel-id', // Make sure to use the same channel ID as defined in the notification config
  //     title: notification.title,
  //     message: notification.body,
  //   });
  // };

  // const Appss = async () => {
  //   async function requestUserPermission() {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status', authStatus);
  //     }
  //   }

  //   // Handle incoming messages when the app is in the foreground
  //   messaging().onMessage(handleForegroundNotification);

  //   // Handle incoming messages when the app is in the background or closed
  //   PushNotification.configure({
  //     onNotification: handleBackgroundNotification,
  //     // ... other configuration options ...
  //   });

  //   // Get the FCM token
  //   const token = await messaging().getToken();
  //   console.log('FCM Token:', token);

  //   // Show the notification when the app opens (modify this with your own content)
  //   showNotification({
  //     title: 'Selamat Datang di Simbebas',
  //     body: 'Terimakasih telah menggunakan Simbebas',
  //   });
  // };

  useEffect(() => {
    createNotificationChannel();
    messaging().onMessage(handleForegroundNotification);
    // Call the function to create the notification channel
    // Appss();
    return () => {
      // Cleanup by removing the message event handler when the component unmounts
      messaging()
        .onMessageSubscription()
        .then(subscription => subscription.unsubscribe())
        .catch(error => console.error('Unsubscribe error:', error));
    };
    // const sound = new Sound(notificationSound, Sound.MAIN_BUNDLE, error => {
    //   if (error) {
    //     console.log('Error loading sound:', error);
    //     return;
    //   }
    //   // Play the sound
    //   sound.play(success => {
    //     if (success) {
    //       console.log('Sound played successfully');
    //     } else {
    //       console.log('Sound playback failed');
    //     }
    //     // Release the sound after playing
    //     sound.release();
    //   });
    // });
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainStackNavigator />
          <CustomNotification
            notification={notificationData}
            onClose={() => setNotificationData(null)}
          />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
