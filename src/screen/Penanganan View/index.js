import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getDataPusdalop} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function PenangananView(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [totalPage, setTotalPage] = useState(5);
  const [allPagesLoaded, setAllPagesLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const pusdalop = useSelector(state => state.pusdalop.data);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [page]);

  const incrementPage = () => {
    if (!loadMore && !last && !allPagesLoaded && page < totalPage) {
      setLoadMore(true);
      setPage(page + 1);
    }
  };

  const decrementPage = () => {
    if (!loadMore && !last && !allPagesLoaded && page > 1) {
      setLoadMore(true);
      setPage(page - 1);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getDataPusdalop(page));
      setTotalPage(response.data.totalPages);
      // If the current page is the last page, set allPagesLoaded to true
      setAllPagesLoaded(page >= response.data.totalPages);
    } catch (error) {
      console.log(error);
      // Handle error if needed
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const naVPenanganan = id => {
    props.navigation.navigate('Penanganan', {pusdalopId: id});
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
      setPage(1); // Reset page to 1 when refreshing
    } finally {
      setRefreshing(false);
    }
  };
  const handleEndReached = () => {
    if (!loadMore && !last) {
      setLoadMore(true);
      setPage(page + 1);
    }
  };
  const renderLoadingIndicator = () => {
    if (loading && !refreshing) {
      return (
        <View style={style.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    return null;
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
            name="news"
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
        <View style={style.containerButton}>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <View
              style={{
                // flex: 1,
                // paddingTop: '5%',
                minWidth: '40%',
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Riwayat Bencana
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 50,
                      height: 20,
                      backgroundColor: 'green',
                    }}>
                    {/* <Text>TES</Text> */}
                  </View>
                  <View style={{marginLeft: 10, marginRight: 5}}>
                    <Text style={{color: 'green'}}>Dikunci</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 50,
                      height: 20,
                      backgroundColor: 'red',
                    }}>
                    {/* <Text>TES</Text> */}
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: 'red'}}>Dibuka</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={{paddingHorizontal: 10, backgroundColor: 'red'}}> */}
          {/* <Pressable style={style.buttonLogin} onPress={navPusdalopDetail}>
            <View style={{paddingVertical: 10, alignItems: 'center'}}>
              <Text style={style.textLogin}>Buat Laporan</Text>
            </View>
          </Pressable> */}
          {/* </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={style.paginationButton}
            onPress={decrementPage}>
            <Text style={style.textLogin}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.paginationButton}
            onPress={incrementPage}>
            <Text style={style.textLogin}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.containerFlat}>
          <View style={{marginBottom: '10%'}}>
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
              ListHeaderComponent={renderLoadingIndicator}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => naVPenanganan(item.id)}
                  underlayColor="#eeeedd">
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
                        // source={{uri: `${item.risalah[0]?.file}`}}
                        style={{width: 100, height: 170}}
                      />
                      <View style={style.cardContent}>
                        <Text style={style.textFlatlistTitle}>{item.nama}</Text>
                        <Text style={style.textFlatlistSubtitle}>
                          {item.alamat}
                        </Text>
                        <Text style={style.textFlatlistSubtitle}>
                          {moment(item.tanggal).format('YYYY-MM-DD')}
                        </Text>
                        <Text style={style.textFlatlistSubtitle}>
                          {item.isi_aduan}
                        </Text>
                      </View>
                      <View style={{backgroundColor: 'green'}}>
                        <Text style={{color: 'green'}}>TES</Text>
                      </View>
                      {/* <View
                        style={{
                          paddingLeft: 280,
                          flexDirection: 'row',
                          position: 'absolute',
                        }}></View> */}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={{height: 5}} />}
              onScrollEndDrag={handleEndReached}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  paginationButton: {
    borderRadius: 7,
    backgroundColor: '#ff471a',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Adjust the height as needed
  },
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  textFlatlist: {
    color: 'black',
    marginLeft: '5%',
    marginBottom: '3%',
    marginTop: '2%',
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

  card: {
    width: '95%',
    height: 170,
    marginHorizontal: 15,
    marginTop: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowRadius: 10,
    marginBottom: 3,
    overflow: 'hidden',

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
    marginBottom: '40%',
    // Set shadow radius
  },
  texttitle: {
    color: 'black',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 10,
  },
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
