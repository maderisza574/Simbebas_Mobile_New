import React, {useEffect, useState} from 'react';
import MainStackNavigator from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import stores from './src/stores';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

const {store, persistor} = stores;

import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

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
