import AsyncStorage from '@react-native-async-storage/async-storage';

export default function logCurrentStorage() {
  AsyncStorage.getAllKeys().then(keyArray => {
    AsyncStorage.multiGet(keyArray).then(keyValArray => {
      let myStorage = {};
      for (let keyVal of keyValArray) {
        myStorage[keyVal[0]] = keyVal[1];
      }

      console.log('CURRENT STORAGE: ', myStorage);
    });
  });
}

// https://stackoverflow.com/questions/38570188/react-native-how-to-see-whats-stored-in-asyncstorage
