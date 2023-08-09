import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';

const CustomNotification = ({notification, onClose}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      playNotificationSound();

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
        if (sound) {
          sound.release();
        }
      };
    }
  }, [notification]);

  const playNotificationSound = () => {
    const notificationSound = new Sound(
      require('../../android/app/src/main/res/raw/ini.mp3'),
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        console.log('Sound loaded successfully');
        setSound(notificationSound);
        notificationSound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          notificationSound.release();
        });
      },
    );
  };

  if (!isVisible || !notification) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => setIsVisible(false)}>
      <Text style={styles.notificationTitle}>{notification.title}</Text>
      <Text style={styles.notificationBody}>{notification.body}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  notificationTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBody: {
    color: 'black',
    fontSize: 16,
  },
});

export default CustomNotification;
