import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataPusdalop} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function Verifikator(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const pusdalop = useSelector(state => state.pusdalop.data);
  const dispatch = useDispatch();
  const [dataVerif, setDataVerif] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      const result = await axios.get(
        `/v1/verfikasi?page=1&perPage=100`,
        config,
      );
      setDataVerif(result.data.rows);

      // await dispatch(getDataPusdalop());
    } catch (error) {
      alert('SILAHKAN LOGIN ULANG');
      await AsyncStorage.clear();
      props.navigation.replace('AuthScreen', {
        screen: 'Login',
      });
    }
  };
  const navVerifDetail = id => {
    // setDataPusdalop(id);
    // console.log('ini id flat list', id);
    props.navigation.navigate('VerifikatorDetail', {pusdalopId: id});
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      const result = await axios.get(
        `/v1/verfikasi?page=1&perPage=100`,
        config,
      );
      setDataVerif(result.data.rows);
    } catch (error) {
      alert('SILAHKAN LOGIN ULANG');
      await AsyncStorage.clear();
      props.navigation.replace('AuthScreen', {
        screen: 'Login',
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    dispatch(fetchData());
  };
  const renderItem = ({item}) => {
    // render your item here
  };
  return (
    <View>
      <View style={style.titleScreen}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -3,
          }}>
          <Icon name="team" color={'white'} size={50} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
            <Text style={{color: 'white'}}>(Verifikator)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View style={style.containerButton}>
          <View>
            <Text style={style.texttitle}>Riwayat Bencana</Text>
          </View>
        </View>
        <View style={style.containerFlat}>
          <FlatList
            data={dataVerif}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => {
                  if (!item.lock_gudang) {
                    navVerifDetail(item.id);
                  }
                }}
                underlayColor="#eeeedd">
                <View style={style.card}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={style.textFlatlist}>{item.nama}</Text>
                      <Text style={style.textFlatlist}>{item.alamat}</Text>
                      <Text style={style.textFlatlist}>
                        {moment(item.tanggal).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                    <View style={{marginLeft: '40%'}}>
                      {item.lock_gudang === false ? (
                        <Text style={{color: 'red', marginLeft: '7%'}}>
                          Verifikasi
                        </Text>
                      ) : (
                        <Text style={{color: 'green', marginLeft: '7%'}}>
                          Verifikasi
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 100,
  },
  textFlatlist: {
    color: 'black',
    marginLeft: '5%',
    marginBottom: '3%',
    marginTop: '2%',
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
  },

  card: {
    width: '95%',
    height: 110,
    marginHorizontal: 15,
    marginTop: 20,
    elevation: 100,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 12,
    shadowRadius: 10,
    marginBottom: 3,
    zIndex: -1,
    shadowRadius: 4,
    // backgroundColor: 'Blue',
    // borderColor: 'Black',
    // borderWidth: 1,
    // borderRadius: 5,
  },
  containerFlat: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // Add elevation for shadow effect
    marginVertical: 8,
    // Set shadow radius
  },
  texttitle: {
    color: 'black',
  },
  buttonLogin: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    backgroundColor: '#ff471a',
    width: '41%',
    textAlign: 'center',
    height: '50%',
    marginTop: 10,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerButton: {
    width: '100%',
    height: '3%',
    position: 'relative',
  },
});
