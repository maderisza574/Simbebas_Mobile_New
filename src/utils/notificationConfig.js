// notificationConfig.js
import PushNotification, {Importance} from 'react-native-push-notification';

const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id', // You can change the channel ID here
      channelName: 'Default Channel',
      channelDescription: 'A default channel for notifications',
      playSound: true,
      soundName: 'ini',
      importance: Importance.HIGH, // Sets the priority for heads-up notifications on Android 5 and above
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`), // Callback function to check if the channel was created
  );
};

export default createNotificationChannel;
