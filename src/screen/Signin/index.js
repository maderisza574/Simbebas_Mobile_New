import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logo from '../../assets/img/BPBD.png';
import {login} from '../../stores/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

export default function Signin(props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };
  const navSignUp = () => {
    props.navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      setErrorMessage('Terjadi Gangguan Koneksi');
      setIsLoading(true);
      const firebaseToken = await messaging().getToken();
      // console.log('INI DATA TOKEN LOGIN', firebaseToken);
      if (!form.username || !form.password) {
        setIsLoading(false);
        return setErrorMessage('Please fill in all required fields.');
      }
      const requestData = {
        ...form,
        firebaseToken: firebaseToken,
      };
      const result = await axios.post(
        'https://apisimbebas.banyumaskab.go.id/api/v1/login',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      await AsyncStorage.setItem('token', result.data.data.token);
      await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      await AsyncStorage.setItem('username', result.data.data.username);
      await AsyncStorage.setItem('nama', result.data.data.nama);
      await AsyncStorage.setItem('role', result.data.data.roles);
      await AsyncStorage.setItem('firebaseToken', firebaseToken);
      // Assuming the props object is being passed as a parameter to the function
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
      alert('Berhasil Masuk');
    } catch (error) {
      setIsLoading(false);
      alert('Mohon Cek Kembali Username dan Password');
      console.log(error?.message);
    }
  };
  return (
    <>
      {/* <View style={style.containerForm}> */}
      <View style={style.containerLogin}>
        <View style={style.containerImage}>
          <Image source={Logo} style={{width: 60, height: 60}} />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={style.titleLogin}>SIMBEBAS</Text>
          </View>
        </View>
        <View
          style={{backgroundColor: 'white', height: '100%', borderRadius: 25}}>
          {/* <Text style={style.titleLogin}>SIMBEBAS</Text> */}

          <View>
            <Text style={style.titleLoginBottom}>Login</Text>
          </View>
          <View style={{padding: 20}}>
            <TextInput
              style={style.input}
              placeholder="Masukan Username Anda"
              placeholderTextColor="#A0A3BD"
              onChangeText={text => handleChangeForm(text, 'username')}
            />
            <TextInput
              style={style.input}
              placeholder="Masukan Password"
              autoCapitalize="none"
              secureTextEntry={showPassword ? false : true}
              placeholderTextColor="#A0A3BD"
              onChangeText={text => handleChangeForm(text, 'password')}
            />
            {/* <Pressable style={style.buttonLogin} onPress={handleLogin}>
              <Text style={style.textLogin}>Masuk</Text>
            </Pressable> */}
            <TouchableOpacity
              onPress={() => {
                handleLogin();
              }}>
              <View style={style.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator
                    animating={isLoading}
                    color="white"
                    size={20}
                    style={style.button}
                  />
                ) : (
                  <Text style={style.button}>Login</Text>
                )}
              </View>
            </TouchableOpacity>

            {/* <View
              style={{marginLeft: 100, marginTop: 15, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginRight: 5}}>
                Belum Punya Akun?
              </Text>
              <TouchableOpacity onPress={navSignUp}>
                <Text style={{color: 'blue'}}>Daftar</Text>
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                // right: 0,
                marginLeft: '90%',
                height: '100%',
                paddingHorizontal: 6,
                justifyContent: 'center',
                marginTop: '-1%',
              }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye-with-line" size={20} color="black" />
              ) : (
                <Icon name="eye" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {/* </View> */}
          <View style={{marginTop: '5%'}}>
            {/* <Button
              title="Masuk"
              onPress={handleLogin}
              style={{outerWidth: 20}}
            /> */}
          </View>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    marginBottom: 90,
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 30,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerLogin: {
    backgroundColor: '#FF6A16',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  titleLogin: {
    color: 'white',
    fontSize: 24,
  },
  textRegister: {
    marginRight: 100,
  },
  containerForm: {
    backgroundColor: 'white',
    height: 100,
    width: 500,
    borderRadius: 30,
  },
  titleLoginBottom: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginLeft: 180,
    marginTop: 30,
  },
  buttonContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    backgroundColor: '#ff471a',
    borderRadius: 15,
    shadowRadius: 2,
  },
  button: {
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#FFFFFF',
    padding: '5%',
  },
});
