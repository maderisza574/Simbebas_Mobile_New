import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Pressable,
  Image,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import MapView, {Marker} from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import axioses from '../../utils/axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createDataPusdalop} from '../../stores/actions/pusdalop';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
// import GetLocation from 'react-native-get-location';
export default function PusdalopCreate(props) {
  // redux
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  // end redux
  const [open, setOpen] = useState(false);
  const [dataNama, setDataNama] = useState('');
  const [bencanaOptions, setBencanaOptions] = useState([]);
  const [selected, setSelected] = React.useState(0);
  const [date, setDate] = useState(new Date());
  const [kecamatanOption, setKecamatanOption] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(0);
  const [desaOPtion, setDesaOption] = useState([]);
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const dataJenis = [
    {key: '1', value: 'PENCEGAHAN'},
    {key: '2', value: 'PENANGGULANGAN'},
  ];
  const navPusdalop = () => {
    props.navigation.navigate('Pusdalop');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    requestLocationPermission().finally(() => setRefreshing(false));
  };

  const [region, setRegion] = useState({
    latitude: -7.431391,
    longitude: 109.247833,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [isLoading, setIsLoading] = useState(false);
  // console.log('INI DATA MAP', region);
  const requestLocationPermission = async () => {
    console.log('FUNCTION MAP JALAN');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'SIMBEBAS MEMBUTUHKAN LOKASI ANDA',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoading(true);
        const watchId = Geolocation.getCurrentPosition(
          position => {
            console.log('DATA LOKASI', position);
            setRegion({
              ...region,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setDataPusdalop({
              ...dataPusdalop,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLoading(false);
            // Geolocation.clearWatch(watchId); // Stop watching location
          },
          error => {
            if (error.code === error.TIMEOUT) {
              alert('Posisi tidak ditemukan, mohon coba kembali');
            } else {
              alert('Error saat mendapatkan data lokasi');
            }
            setLoading(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        alert('Error', 'ALAMAT YANG ANDA MASUKAN SALAH');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    axioses
      .get(`/v1/bencana?page=1&perPage=10&tindakanId=${selected || 1}`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.sub_jenis};
        });
        setBencanaOptions(newArray);
      })
      .catch(error => console.error(error));
  }, [selected]);
  useEffect(() => {
    axioses
      .get(`/v1/kecamatan?page=1&perPage=1000`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.kecamatan};
        });
        setKecamatanOption(newArray);
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    if (keyKecamatan !== null) {
      setTimeout(() => {
        axioses
          .get(
            `/v1/desa?page=1&perPage=1000&kecamatanId=${
              keyKecamatan.kecamatanId || 0
            }`,
          )
          .then(res => {
            let newArray = res.data.rows.map(item => {
              return {key: item.id, value: item.desa};
            });
            setDesaOption(newArray);
          })
          .catch(error => console.error(error));
      }, 3000);
    }
  }, [keyKecamatan]);

  //  NEW FUNCTION MAP

  const onMarkerDragEnd = e => {
    // const newRegion = {
    //   latitude: e.nativeEvent.coordinate.latitude,
    //   longitude: e.nativeEvent.coordinate.longitude,
    //   latitudeDelta: 0.01,
    //   longitudeDelta: 0.01,
    // };
    setRegion({
      ...region,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setDataPusdalop({
      ...dataPusdalop,
      lat: e.nativeEvent.coordinate.latitude.toString(),
      lng: e.nativeEvent.coordinate.latitude.toString(),
    });
  };

  //  END NEW FUNCION MAP

  const handleConfirm = async () => {
    // Hide confirmation modal

    setIsConfirmationVisible(true);
  };

  const handleCancel = () => {
    // Hide confirmation modal
    setIsConfirmationVisible(false);
  };

  const handleSelect = key => {
    setSelected(key);
    setDataPusdalop(prevData => ({
      ...prevData,
      id_jenis_bencana: key,
    }));
  };
  const handleJenis = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_tindakan: key,
    }));
  };
  const handleKecamatan = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_kecamatan: key,
    }));
    setKeyKecamatan(prevData => ({
      ...prevData,
      kecamatanId: key,
    }));
  };
  const handleDesa = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_desa: key,
    }));
  };

  // END DROPDWON
  const [dataPusdalop, setDataPusdalop] = useState({
    id_jenis_bencana: '', // initialize with empty string
    id_tindakan: '',
    user_pemohon: '3276027010860007',
    isi_aduan: '',
    no_telepon: '',
    nama: '',
    alamat: '',
    id_desa: '',
    id_kecamatan: '',
    lng: '',
    lat: '',
    tindakan_trc: 'false',
    logpal: 'false',
    tanggal: date,
    image: images,
    keteranganImage: [],
  });
  console.log('INI DATA ID BENCANA', dataPusdalop.id_jenis_bencana);

  const handleCreatePusdalop = async () => {
    try {
      setIsConfirmationVisible(false);
      setIsLoading(true);
      const formData = new FormData();
      formData.append('id_jenis_bencana', dataPusdalop.id_jenis_bencana);
      formData.append('id_tindakan', dataPusdalop.id_tindakan);
      formData.append('user_pemohon', dataPusdalop.user_pemohon);
      formData.append('isi_aduan', dataPusdalop.isi_aduan);
      formData.append('no_telepon', dataPusdalop.no_telepon);
      formData.append('nama', dataPusdalop.nama);
      formData.append('alamat', dataPusdalop.alamat);
      formData.append('id_desa', dataPusdalop.id_desa);
      formData.append('id_kecamatan', dataPusdalop.id_kecamatan);
      formData.append('lng', dataPusdalop.lng);
      formData.append('lat', dataPusdalop.lat);
      formData.append('tindakan_trc', dataPusdalop.tindakan_trc);
      formData.append('logpal', dataPusdalop.logpal);
      formData.append(
        'tanggal',
        dataPusdalop.tanggal.toISOString().slice(0, 10),
      );
      formData.append('keteranganImage[0]', dataPusdalop.keteranganImage);

      // formData.append('id_jenis_bencana', 1);
      // formData.append('id_tindakan', 1);
      // formData.append('user_pemohon', 'johan');
      // formData.append('isi_aduan', 'tes');
      // formData.append('no_telepon', '0822');
      // formData.append('nama', 'nama');
      // formData.append('alamat', 'tes almat');
      // formData.append('id_desa', 1);
      // formData.append('id_kecamatan', 1);
      // formData.append('lng', '109247833');
      // formData.append('lat', '7431391');
      // formData.append('tindakan_trc', true);
      // formData.append('logpal', 'true');
      // formData.append('tanggal', '2023-03-12');
      // formData.append('keteranganImage[0]', 'tes');
      console.log('Image Data:', images.flat());

      images.length > 0 &&
        images.flat().forEach((image, index) => {
          console.log(`Processing Image ${index}:`, image);
          if (image.uri) {
            console.log(`Appending Image ${index} to FormData:`, {
              uri: image.uri,
              type: image.type || 'image/jpeg',
              name: image.name || 'image.jpg',
            });

            formData.append(`image[${index}]`, {
              uri: image.uri,
              type: image.type || 'image/jpeg',
              name: image.name || 'image.jpg',
            });
          }
        });

      if (images.length === 0) {
        alert('Mohon Pilih beberapa gambar');
        return; // Prevent the request if no images are selected
      }

      const datauser = await AsyncStorage.getItem('token');
      // const datauser =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxNjksImlhdCI6MTY3OTg5NTU1NSwiZXhwIjoxNjc5OTgxOTU1fQ.Llc9rtKMa9y6rIijgeWva1mlGl1V5J5Wnoc8I-Ron1Q';
      console.log('INI LOG DALAM', formData._parts);
      const result = await axios({
        url: 'https://apisimbebas.banyumaskab.go.id/api/v1/pusdalops',
        method: 'POST',
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${datauser}`,
        },
      });

      const notifData = {
        title: 'Ada Data Terbaru  Pusdalop',
        body: 'Mohon periksa dan verifikasi',
        roles: 'Simasbabe-Admin',
      };
      const resultt = await axios({
        url: 'https://apisimbebas.banyumaskab.go.id/api/v1/sendNotification',
        method: 'POST',
        data: notifData,
        headers: {
          Authorization: `Bearer ${datauser}`,
        },
      });
      setIsLoading(false);

      alert('SUKSES MEMBUAT LAPORAN');
      props.navigation.navigate('Pusdalop');
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('ijin Aplikasi tidak ditemukan, mohon berikan ijin aplikasi');
        } else {
          // Handle other Axios errors
          alert(error.response.data.message);
        }
      } else {
        // Handle non-Axios errors
        alert('An unexpected error occurred. Please try again later.');
      }

      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
      console.log('INIII ERORR', error.message);
      // alert('SESI ANDA SUDAH BERAKHIR');
      // await AsyncStorage.clear();
      // props.navigation.replace('AuthScreen', {
      //   screen: 'Login',
      // });
    }
  };

  // for camera
  const handleLaunchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'IZIN KAMERA',
          message: 'SIMBEBAS MEMBUTUHKAN AKSES KAMERA ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          async response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.errorCode) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const originalImagePath = response.assets[0].uri;
              console.log('INI IMAGE ORI', originalImagePath);

              try {
                const compressedImage = ImageResizer.createResizedImage(
                  response.assets[0].uri,
                  200, // New width
                  200, // New height
                  'JPEG', // Format
                  80, // Quality (0 to 100)
                );
                const source = {
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                };

                setImages(prevImages => [source, ...prevImages]);
                setDataPusdalop({
                  ...dataPusdalop,
                  image: [source, ...dataPusdalop.image],
                });
              } catch (error) {
                console.log('Image compression error:', error);
              }
            } else {
              console.log('No image selected');
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log();
  const handleLaunchImageLibrary = async () => {
    try {
      const photo = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 100,
      });

      if (photo && photo.assets && photo.assets.length > 0) {
        const originalImagePath = photo.assets[0].uri;

        try {
          const compressedImage = await ImageResizer.createResizedImage(
            originalImagePath,
            100, // New width
            100, // New height
            'JPEG', // Format
            80, // Quality (0 to 100)
          );

          const source = {
            uri: compressedImage.uri,
            type: photo.assets[0].type,
            name: photo.assets[0].fileName,
          };

          // Prepend the new compressed image to the array
          setImages(prevImages => [source, ...prevImages]);

          // Update other state if needed
          setDataPusdalop({
            ...dataPusdalop,
            image: [source, ...dataPusdalop.image],
          });
        } catch (error) {
          console.log('Image compression error:', error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [stateMap, setStateMap] = useState({
    latitude: null || -7.431391,
    longitude: null || 109.247833,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: stateMap.latitude || -7.431391,
    longitude: stateMap.longitude || 109.247833,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // console.log(stateMap);

  // useEffect(() => {
  //   if (stateMap.latitude && stateMap.longitude) {
  //     setMapRegion({
  //       latitude: stateMap.latitude,
  //       longitude: stateMap.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }
  // }, [stateMap.latitude, stateMap.longitude]);

  const handleChangeForm = (value, name) => {
    setDataPusdalop({...dataPusdalop, [name]: value});
  };

  // console.log('INI DATA PUSDALOP', dataPusdalop);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationVisible}
        onRequestClose={() => setIsConfirmationVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text style={{color: 'black'}}>
              Apakah anda yakin untuk mengirim laporan?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={{color: 'red', fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreatePusdalop}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
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
            <Text style={{color: 'white'}}>Lapor Bencana</Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Text style={style.titleSilahkan}>
            Silahkan isi beberapa data untuk melapor
          </Text>
          <View style={{padding: 5}}>
            <Text style={style.titleOption}>Jenis Tindakan</Text>

            <SelectList
              dropdownTextStyles={{color: 'black'}}
              inputStyles={{color: 'black'}}
              setSelected={handleSelect}
              // setSelected={key => setSelected(key)}
              data={dataJenis}
              save="key"
              itemKey="key"
              itemLabel="name"
              onValueChange
              boxStyles={{borderColor: 'black'}}
              placeholder="Pilih Jenis Tindakan"
            />
          </View>
          <View>
            <Text style={style.titleOption}>Jenis Bencana</Text>

            <SelectList
              data={bencanaOptions}
              itemKey="id"
              itemLabel="name"
              defaultOption={bencanaOptions}
              boxStyles={{borderColor: 'black'}}
              // setSelected={key => setKeyBencana(key)}
              setSelected={handleJenis}
              placeholder="Pilih Jenis Bencana"
              dropdownTextStyles={{color: 'black'}}
              inputStyles={{color: 'black'}}
            />
          </View>
          <View>
            <Text style={style.titleOption}>Tanggal Kejadian</Text>
            <TextInput
              placeholder={date.toLocaleDateString()}
              placeholderTextColor="black"
              style={style.inputTanggal}
              editable={false}
            />
            <View style={{marginTop: '-5%'}}>
              <Pressable
                style={style.buttonLogin}
                onPress={() => setOpen(true)}>
                <Text style={style.textLogin}>Pilih Tanggal dan waktu</Text>
              </Pressable>
            </View>
            <DatePicker
              modal
              open={open}
              date={date}
              dateFormat="YYYY-MM-DD"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.titleOption}>Isi Aduan</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
              multiline={true}
              onChangeText={text =>
                setDataPusdalop({
                  ...dataPusdalop,
                  isi_aduan: text,
                })
              }
              value={dataPusdalop.isi_aduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.titleOption}>
              Titik Lokasi Terjadinya Bencana
            </Text>
            <View>
              <MapView
                style={{flex: 1, height: 200, width: '100%'}}
                initialRegion={region}
                region={region}
                onRegionChangeComplete={region => {
                  setMapRegion({
                    ...mapRegion,
                    latitude: region.latitude,
                    longitude: region.longitude,
                  });
                  setDataPusdalop({
                    ...dataPusdalop,
                    lat: region.latitude.toString(),
                    lng: region.longitude.toString(),
                  });
                }}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  onDragEnd={e => {
                    setRegion({
                      ...region,
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                    setDataPusdalop({
                      ...dataPusdalop,
                      lat: e.nativeEvent.coordinate.latitude,
                      lng: e.nativeEvent.coordinate.longitude,
                    });
                    // setMapRegion({
                    //   ...mapRegion,
                    //   latitude: e.nativeEvent.coordinate.latitude,
                    //   longitude: e.nativeEvent.coordinate.longitude,
                    // });
                  }}
                />
              </MapView>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '3%',
                }}>
                <Pressable
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2%',
                    width: '60%',
                    height: 30,
                    backgroundColor: '#1a8cff',
                    borderRadius: 5,
                  }}
                  onPress={() => requestLocationPermission()}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Dapatkan Lokasi Terkini
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                justifyContent: 'space-between',
                paddingHorizontal: '20%',
              }}>
              {loading ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    value={region.latitude.toString()}
                    editable={false}
                    placeholder={dataPusdalop.lat.toString()}
                    style={{color: 'black'}}
                  />
                  <TextInput
                    value={region.longitude.toString()}
                    editable={false}
                    placeholder={dataPusdalop.lng.toString()}
                    keyboardtype="numeric"
                    style={{color: 'black'}}
                  />
                </View>
              )}

              {/* <Pressable
                style={style.buttonSearchMap}
                onPress={() => requestLocationPermission()}>
                <Text style={style.textSearchMap}>Cari</Text>
              </Pressable> */}
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <View>
                <Text style={style.titleColor}>Pelapor:</Text>
              </View>
              <View style={{marginLeft: '3%'}}>
                <Text style={style.titleColor}>Nama</Text>
              </View>
              <View style={{marginLeft: '30%'}}>
                <Text style={style.titleColor}>No TELP/HP</Text>
              </View>
            </View>
            <View style={{marginLeft: '5%'}}>
              <View style={{flexDirection: 'row', paddingHorizontal: '10%'}}>
                <TextInput
                  placeholder="Masukan Nama"
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    color: 'black',
                    // marginRight: '10%',
                    width: '50%',
                  }}
                  dropdownTextStyles="black"
                  onChangeText={dataPusdalop =>
                    handleChangeForm(dataPusdalop, 'nama')
                  }
                  // editable={false}
                  value={dataPusdalop.nama}
                />

                <TextInput
                  placeholder="Masukan No telp"
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    marginLeft: '3%',
                    color: 'black',
                    // marginRight: '1%',
                    width: '50%',
                  }}
                  dropdownTextStyles="black"
                  onChangeText={text =>
                    setDataPusdalop({
                      ...dataPusdalop,
                      no_telepon: text,
                    })
                  }
                  value={dataPusdalop.no_telepon}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          {/* Kecamatan */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={style.titleOption}>Kecamatan</Text>
            </View>
            <View>
              <View>
                <SelectList
                  setSelected={handleKecamatan}
                  data={kecamatanOption}
                  save="key"
                  itemKey="key"
                  itemLabel="name"
                  dropdownTextStyles={{color: 'black'}}
                  inputStyles={{color: 'black'}}
                  placeholderTextColor="black"
                  boxStyles={{borderColor: 'black'}}
                  placeholder="Pilih Kecamatan"
                />
              </View>
            </View>
          </View>
          {/* end Kecamatan */}
          {/* Desa */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={style.titleOption}>Desa</Text>
            </View>
            <View>
              {keyKecamatan !== 0 ? (
                <SelectList
                  setSelected={handleDesa}
                  data={desaOPtion}
                  save="key"
                  itemKey="key"
                  placeholderTextColor="black"
                  inputStyles={{color: 'black'}}
                  dropdownTextStyles={{color: 'black'}}
                  itemLabel="name"
                  boxStyles={{borderColor: 'black'}}
                  placeholder="Pilih Desa"
                />
              ) : (
                <SelectList
                  data={[]} // Pass an empty array or some non-functional data
                  save="key"
                  itemKey="key"
                  placeholderTextColor="gray" // Adjust the color to indicate it's disabled
                  inputStyles={{color: 'gray'}} // Adjust the color to indicate it's disabled
                  dropdownTextStyles={{color: 'gray'}} // Adjust the color to indicate it's disabled
                  itemLabel="name"
                  boxStyles={{borderColor: 'gray'}} // Adjust the color to indicate it's disabled
                  placeholder="Anda Harus memilih Kecamatan Dahulu"
                  enabled={false} // Add a prop to indicate that the SelectList is disabled
                />
              )}
            </View>
          </View>
          {/* End Desa */}
          {/* Alamat */}
          <View>
            <View>
              <Text style={style.titleOption}>Alamat</Text>
            </View>
            <View>
              <TextInput
                placeholder="Masukan Alamat"
                style={style.inputAduan}
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'alamat')
                }
                placeholderTextColor="black"
                // value={dataAlamat}
              />
            </View>
          </View>
          {/* End Alamat */}
          <View style={{marginTop: 20}}>
            <Text style={style.titleOption}>Upload gambar</Text>
            <Text style={{color: 'red', fontSize: 10}}>Maks. 2 Gambar</Text>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />

          {/* loop image input */}
          <View>
            {inputs.map((input, index) => (
              <View key={index}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View>
                    {images &&
                      images.flat().map((image, index) => (
                        <View key={index} style={{marginBottom: 10}}>
                          <Image
                            source={{
                              uri: image.uri,
                            }}
                            style={{height: 200, width: 200}}
                          />
                          {/* Other image-related UI or controls */}
                        </View>
                      ))}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{marginRight: 10, width: 60}}
                    onPress={handleLaunchCamera}>
                    <Icon
                      name="camera"
                      size={20}
                      style={{marginLeft: 10, color: 'black'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 10, width: 60}}
                    onPress={handleLaunchImageLibrary}>
                    <Icon
                      name="folder-images"
                      size={20}
                      style={{marginLeft: 10, color: 'black'}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={style.titleOption}>Keterangan</Text>
                  {/* {keteranganImage.map((text, index) => ( */}
                  <TextInput
                    placeholder="Masukan Keterangan gambar"
                    key={index}
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                      marginBottom: 10,
                      color: 'black',
                    }}
                    placeholderTextColor="black"
                    value={dataPusdalop.keteranganImage.join('\n')}
                    onChangeText={text =>
                      setDataPusdalop({
                        ...dataPusdalop,
                        keteranganImage: [text],
                      })
                    }
                  />
                  {/* ))} */}
                </View>
              </View>
            ))}
          </View>
          {/* end input loop image */}
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin} onPress={handleConfirm}>
              {isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  color="white"
                  size={20}
                  style={style.button}
                />
              ) : (
                <Text style={style.textLogin}>Kirim</Text>
              )}
            </Pressable>
            <Pressable style={style.buttonBatal} onPress={navPusdalop}>
              <Text style={style.textLogin}>Batal</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  inputAduan: {
    width: '100%',
    borderWidth: 1,
    marginTop: '1%',
    borderRadius: 10,
    borderColor: 'black',
    color: 'black',
  },
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
    // height: 500,
    position: 'relative',
    marginTop: -30,
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#1a8cff',
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
  buttonSearchMap: {
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
    marginTop: -6,
    marginLeft: 50,
  },
  textSearchMap: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  titleSilahkan: {
    color: 'black',
    marginBottom: '5%',
    fontSize: 16,
  },
  titleOption: {
    color: 'black',
    marginRight: '3%',
    marginTop: '3%',
    marginBottom: '2%',
  },
  titleColor: {
    color: 'black',
  },
  inputTanggal: {
    width: '100%',
    borderWidth: 1,
    marginTop: '1%',
    borderRadius: 10,
    borderColor: 'black',
  },
});
