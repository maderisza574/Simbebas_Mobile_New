import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/img/BPBD.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
  console.log(props);
  // const token = true;
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (token && refreshToken) {
          props.navigation.replace('AppScreen');
        } else {
          props.navigation.replace('AuthScreen');
        }
      } catch (error) {}
    }, 1500);
  };

  return (
    <View style={style.splashContainer}>
      <Text style={style.splashText}>SIMBEBAS</Text>
      <Image source={Logo} style={{width: 100, height: 100}} />
      <View>
        <Text style={style.splashText2}>Banyumas Bebas Bencana</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  splashContainer: {
    backgroundColor: '#FF6A16',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: '3%',
    marginBottom: '5%',
  },
  splashText2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 10,
    marginTop: 10,
  },
});
