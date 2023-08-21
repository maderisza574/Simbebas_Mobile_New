import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Entypo';
import axioses from '../../utils/axios';
import axios from 'axios';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Penanganan(props) {
  const [dataPetugas, setDataPetugas] = useState();
  const navBackView = () => {
    props.navigation.navigate('PenangananView');
  };
  const pusdalopid = props.route.params.pusdalopId;

  const [dataPenanganan, setDataPenanganan] = useState({
    user: '',
    id_pusdalops: pusdalopid,
  });
  // console.log('INI DATA PENANGANAN', dataPenanganan);

  const handleIdUser = key => {
    setDataPenanganan(prevData => ({
      ...prevData,
      user: key,
    }));
  };

  useEffect(() => {
    axioses
      .get(`/v1/listUser?page=1&perPage=10&role=Simasbabe-Trc`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.nama};
        });
        setDataPetugas(newArray);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCreatePenugasan = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      console.log('Ini Data User', datauser);

      const pusdalopid = props.route.params.pusdalopId;
      console.log('Ini PUSDALOP ID', pusdalopid);

      const user = dataPenanganan.user;

      const dataToSend = {
        user: String(user),
        id_pusdalops: parseInt(pusdalopid),
      };

      console.log('INI DATA KIRIM', dataToSend);

      const penugasanResponse = await axios.post(
        'https://apisimbebas.banyumaskab.go.id/api/v1/penugasan',
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${datauser}`,
          },
        },
      );

      const notifData = {
        title: 'Ada Data Terbaru Penanganan',
        body: 'Mohon periksa dan verifikasi',
        roles: 'Simasbabe-Trc',
      };

      const notificationResponse = await axios({
        url: 'https://apisimbebas.banyumaskab.go.id/api/v1/sendNotification',
        method: 'POST',
        data: notifData,
        headers: {
          Authorization: `Bearer ${datauser}`,
        },
      });

      console.log('Notification Response:', notificationResponse.data);
      console.log('Penugasan Response:', penugasanResponse.data);
      Alert.alert('SUKSES MEMBUAT LAPORAN');
      props.navigation.navigate('PenangananView');
    } catch (error) {
      console.log('Error creating penugasan:', error);
      if (error.response && error.response.status === 400) {
        console.log('Server error: Bad request');
        // Display a message to the user indicating a server issue
      } else {
        console.log('An error occurred:', error.message);
        // Display a general error message to the user
      }
      Alert.alert('GAGAL MEMBUAT LAPORAN');
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={style.titleScreen}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -3,
            }}>
            <Icon
              name="flag"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
              <Text style={{color: 'white'}}>(Penanganan)</Text>
            </View>
          </View>
        </View>
        <View style={style.containerInput}>
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                padding: 10,
              }}>
              Lapor Bencana
            </Text>
          </View>
          <View style={{alignItems: 'center', padding: 20}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Silahkan Pilih Petugas
            </Text>
          </View>
          <View>
            <View>
              <Text style={{color: 'black', paddingHorizontal: 10}}>
                Pilih Petugas
              </Text>
            </View>
            <View>
              <SelectList
                setSelected={handleIdUser}
                data={dataPetugas}
                save="key"
                itemKey="key"
                boxStyles={{borderColor: 'black'}}
                dropdownTextStyles={{color: '#000000'}}
                inputStyles={{color: 'black'}}
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Pressable
              style={style.buttonLogin}
              onPress={handleCreatePenugasan}>
              <Text style={style.textLogin}>Kirim</Text>
            </Pressable>
            <Pressable style={style.buttonBatal} onPress={navBackView}>
              <Text style={style.textLogin}>Batal</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 100,
  },
  containerInput: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 30,
    padding: 6,
    width: '100%',
    maxHeight: '100%',
    // height: 2800,
    position: 'relative',
    marginTop: -10,
    flexGrow: 1,
    // flex: 1,
  },
  inputAduan: {
    width: 370,
    height: 50,
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10,
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
  buttonBatal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff0000',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 10,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
