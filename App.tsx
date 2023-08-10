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
    // Handle foreground notification logic...
    setNotificationData({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      text: remoteMessage.notification.text,
    });
  };
  const handleBackgroundNotification = notification => {
    console.log('INI DARI BACKGROUND', notification);
    // Handle background notification logic...

    // Show a local notification with a custom sound
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Make sure to use the same channel ID as defined in the notification config
      title: notification.title,
      message: notification.body,
      soundName: require('../simbebasnew/android/app/src/main/res/raw/ini.mp3'), // Replace with the name of your custom sound file
    });
  };

  useEffect(() => {
    createNotificationChannel();
    messaging().onMessage(handleForegroundNotification);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Handle background notifications here
      // ...
    });
    PushNotification.configure({
      onNotification: handleBackgroundNotification,
      // ... other configuration options ...
    });

    return () => {
      messaging()
        .onMessageSubscription()
        .then(subscription => subscription.unsubscribe())
        .catch(error => console.error('Unsubscribe error:', error));
    };
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
