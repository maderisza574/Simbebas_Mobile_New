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
            <Text style={{color: 'white'}}>(ASSESMEN)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View>
          <Text style={style.texttitle}>Riwayat Bencana</Text>
        </View>
        <View style={style.containerFlat}>
          <FlatList
            style={{
              marginBottom: '5%',
              elevation: 10,
              shadowColor: '#0000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
            }}
            data={pusdalop}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => {
                  if (!item.lock) {
                    navAsesmenDetail(item.id);
                  }
                }}
                underlayColor="#eeeedd"
                disabled={item.lock}>
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
                      style={{width: 100, height: 185, borderRadius: 8}}
                    />
                    <View style={style.cardContent}>
                      <Text style={style.textFlatlistTitle}>{item.nama}</Text>
                      <Text style={style.textFlatlistSubtitle}>
                        {item.alamat}
                      </Text>
                      <Text style={style.textFlatlistSubtitle}>
                        {moment(item.tanggal).format('YYYY-MM-DD')}
                      </Text>
                      <View
                        style={{
                          alignContent: 'center',
                          alignItems: 'center',
                          paddingTop: '5%',
                        }}>
                        <Pressable
                          style={style.buttonLihat}
                          onPress={() => navAsesmenDetail(item.id)}>
                          <View style={{alignItems: 'center'}}>
                            <Text style={style.textLihat}>Lihat</Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                    {/* <View>
                      <View style={{marginLeft: '20%'}}>
                        {item.lock === false ? (
                          <Text
                            style={{
                              color: 'red',
                              paddingHorizontal: '5%',
                              paddingVertical: '40%',
                            }}>
                            Assesmen
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: 'green',
                              paddingHorizontal: '5%',
                              paddingVertical: '40%',
                            }}>
                            Assesmen
                          </Text>
                        )}
                      </View>
                    </View> */}
                    <View style={{marginLeft: '28%'}}>
                      {item.lock_verif === false ? (
                        <View style={{backgroundColor: 'red', height: 500}}>
                          <Text style={{color: 'red'}}>TES</Text>
                        </View>
                      ) : (
                        <View style={{backgroundColor: 'green', height: 500}}>
                          <Text style={{color: 'green'}}>TES</Text>
                        </View>
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
  buttonLihat: {
    backgroundColor: '#ff471a',
    width: 100,
    height: 30,
    justifyContent: 'center',
  },
  textLihat: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    width: '95%',
    height: 185,
    marginHorizontal: 15,
    marginTop: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    maxHeight: 200,
  },
  cardContent: {
    flex: 1,
    minWidth: '50%',
    padding: 10,
  },
  textFlatlistTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textFlatlistSubtitle: {
    color: 'black',
    fontSize: 14,
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
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  // containerButton: {
  //   width: '100%',
  //   paddingHorizontal: 10,
  // },
  buttonLogin: {
    // paddingVertical: 10,
    // paddingHorizontal: 32,
    borderRadius: 7,
    backgroundColor: '#ff471a',
    width: '41%',
    textAlign: 'center',
    height: '50%',
    marginTop: 10,
  },
  textLogin: {
    // fontSize: 16,
    // lineHeight: 21,
    fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: 'white',
  },
  containerButton: {
    width: '100%',
    height: '10%',
    position: 'relative',
    // backgroundColor: 'red',
  },
});
