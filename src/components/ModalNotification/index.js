import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

const ModalNotification = ({visible, title, body, onClose}) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    console.log('BUNYIII load');
    // Load the custom sound file
    const notificationSound = new Sound(
      require('../../assets/sound/ini.mp3'),
      error => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        console.log('BUNYI SUKSES');
        setSound(notificationSound);
      },
    );

    return () => {
      // Unload the sound when the component unmounts
      console.log('BUNYI RELOAD');
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    if (visible && sound) {
      // Play the sound when the modal becomes visible
      sound.play(() => {
        // Callback after the sound is played
        sound.setCurrentTime(0); // Reset sound to the beginning for next play
      });
    }
  }, [visible, sound]);

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'red', padding: 16, borderRadius: 8}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
            {title}
          </Text>
          <Text>{body}</Text>
          <TouchableOpacity onPress={onClose} style={{marginTop: 16}}>
            <Text style={{color: 'blue', fontSize: 16}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification; // Make sure to export the component using 'export default'
