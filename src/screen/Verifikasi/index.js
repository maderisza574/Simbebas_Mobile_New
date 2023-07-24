import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/img/BPBD.png';

export default function Verifikisai(props) {
  const [form, setForm] = useState({});
  // console.log(form);
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };
  const navSignin = () => {
    props.navigation.navigate('Signin');
  };
  const navVerification = () => {
    props.navigation.navigate('Verifikasi');
  };
  const handleRegister = async () => {
    try {
      // console.log(form);
      // const result = await axios.post('/auth/', form);
      // console.log(result.data);
      // await AsyncStorage.setItem('userId', result.data.data.id);
      // await AsyncStorage.setItem('token', result.data.data.token);
      // await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      // alert('sukses');
      // console.log(result.data);
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
    } catch (error) {
      // alert(error.response.data.message);
    }
  };
  return (
    <>
      <ScrollView>
        {/* <View style={style.containerForm}> */}
        <View style={style.containerLogin}>
          <View style={style.containerImage}>
            <Image source={Logo} style={{width: 60, height: 60}} />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={style.titleLogin}>SIMBEBAS</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              height: '100%',
              borderRadius: 25,
            }}>
            <Text style={style.titleLogin}>simbebas</Text>

            <View>
              <Text style={style.titleLoginBottom}>Verifikasi</Text>
            </View>
            <View style={{padding: 20}}>
              <TextInput
                style={style.input}
                placeholder="Masukan username"
                placeholderTextColor="#A0A3BD"
                onChangeText={text => handleChangeForm(text, 'username')}
              />

              <TextInput
                style={style.input}
                placeholder="kode verifikasi"
                placeholderTextColor="#A0A3BD"
                onChangeText={text => handleChangeForm(text, 'nowhatsapp')}
              />
              <Pressable style={style.buttonLogin} onPress={navVerification}>
                <Text style={style.textLogin}>Verifikasi</Text>
              </Pressable>

              <View
                style={{marginLeft: 100, marginTop: 15, flexDirection: 'row'}}>
                <Text style={{color: 'black', marginRight: 5}}>
                  Sudah Punya akun?
                </Text>
                <TouchableOpacity onPress={navSignin}>
                  <Text style={{color: 'blue'}}>Masuk</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  // right: 0,
                  marginLeft: 320,
                  height: '100%',
                  paddingHorizontal: 6,
                  justifyContent: 'center',
                  marginTop: -50,
                }}
                onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Icon name="eye-with-line" size={20} />
                ) : (
                  <Icon name="eye" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {/* </View> */}
            <View style={{marginTop: 30}}>
              {/* <Button
              title="Masuk"
              onPress={handleLogin}
              style={{outerWidth: 20}}
            /> */}
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 110,
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
    height: '150%',
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
});
