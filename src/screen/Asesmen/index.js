import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataPusdalop} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function Asesmen(props) {
  const pusdalop = useSelector(state => state.pusdalop.data);
  console.log('INI DATA GET PUSDALOP', pusdalop);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDataPusdalop());
      } catch (error) {
        alert('SILAHKAN LOGIN ULANG');
        await AsyncStorage.clear();
        props.navigation.replace('AuthScreen', {
          screen: 'Login',
        });
      }
    };
    fetchData();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getDataPusdalop()).finally(() => setRefreshing(false));
  };
  const handleEndReached = () => {
    dispatch(getDataPusdalop());
  };
  const navAsesmenDetail = id => {
    props.navigation.navigate('AsesmenDetail', {pusdalopId: id});
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
          <Icon
            name="Safety"
            size={40}
            color={'white'}
            style={{marginLeft: 10}}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
            <Text style={{color: 'white'}}>(ASESMEN)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View>
          <Text style={style.texttitle}>Riwayat Bencana</Text>
        </View>
        <View style={style.containerFlat}>
          <FlatList
            data={pusdalop}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => {
                  if (!item.lock_verif) {
                    navAsesmenDetail(item.id);
                  }
                }}
                underlayColor="#eeeedd"
                disabled={item.lock_verif}>
                <View style={style.card}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={
                        item.risalah[0]?.file
                          ? {
                              uri: `${item.risalah[0]?.file}`,
                            }
                          : require('../../assets/img/bencana1.png')
                      }
                      style={{width: 100, height: 100}}
                    />
                    <View>
                      <Text style={style.textFlatlist}>{item.nama}</Text>
                      <Text style={style.textFlatlist}>{item.alamat}</Text>
                      <Text style={style.textFlatlist}>
                        {moment(item.tanggal).format('YYYY-MM-DD')}
                      </Text>
                      <Text style={style.textFlatlist}>{item.isi_aduan}</Text>
                    </View>
                    <View style={{}}>
                      <View style={{marginLeft: '20%'}}>
                        {item.lock_verif === false ? (
                          <Text style={{color: 'red', marginLeft: '3%'}}>
                            Assesmen
                          </Text>
                        ) : (
                          <Text style={{color: 'green', marginLeft: '3%'}}>
                            Assesmen
                          </Text>
                        )}
                      </View>
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
  textFlatlist: {
    color: 'black',
    marginLeft: '5%',
    marginBottom: '3%',
    marginTop: '2%',
  },
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 100,
  },
  containerInput: {
    backgroundColor: '#f5f5f0',
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
  containerFlat: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // Add elevation for shadow effect
    marginVertical: 8,
    // Set shadow radius
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: '30%',
    textAlign: 'center',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
  texttitle: {
    color: 'black',
  },
});
