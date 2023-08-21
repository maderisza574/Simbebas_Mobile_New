import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Chip} from 'react-native-paper';
import {color} from 'react-native-reanimated';

export default function VerifikatorDetail(props) {
  const [dataById, setDataByID] = useState({});
  // console.log('INI DATA PUSDALOP', dataById?.data?.alamat);
  const [images, setImages] = useState([]);
  const [dataStokBrang, setDataStokBarang] = useState('');
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const lat = parseFloat(dataById?.data?.lat);
  const lng = parseFloat(dataById?.data?.lng);
  const defaultLat = -7.43973580004;
  const defaultLng = 109.244402567;
  const navVerifikator = () => {
    props.navigation.navigate('Verifikator');
  };

  const pusdalopid = props.route.params.pusdalopId;
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
  const handlegetPusdalopId = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      const result = await axios.get(`/v1/pusdalops/${pusdalopid}`, config);
      setDataByID(result.data);
    } catch (error) {
      alert('gagal mendapat kan data');
      console.log(error);
    }
  };
  const region = {
    latitude: isNaN(lat) ? defaultLat : lat,
    longitude: isNaN(lng) ? defaultLng : lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const handleDataBarang = key => {
    setDataVerifikator(prevData => ({
      ...prevData,
      barangid: [key],
    }));
  };
  useEffect(() => {
    handlegetPusdalopId();
  }, []);
  useEffect(() => {
    axios
      .get('/v1/barang?page=1&perPage=5')
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.namaBarang.id, value: item.namaBarang.nama_barang};
        });
        setDataStokBarang(newArray);
      })
      .catch(error => console.error(error));
  }, []);

  // console.log(stateMap);

  const handleSearch = () => {
    setMapRegion({
      ...mapRegion,
      latitude: stateMap.latitude,
      longitude: stateMap.longitude,
    });
  };

  useEffect(() => {
    if (stateMap.latitude && stateMap.longitude) {
      setMapRegion({
        latitude: stateMap.latitude,
        longitude: stateMap.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [stateMap.latitude, stateMap.longitude]);
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
          response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            if (response.errorCode) {
              console.log('ImagePicker Error: ', response.errorMessage);
            }
            if (response.assets && response.assets.length > 0) {
              const source = [
                {
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                },
              ];
              setImages(prevImages => [...prevImages, response.assets]);
              setDataVerifikator({
                ...dataVerifikator,
                image: [...dataVerifikator.image, response.assets],
              });
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
  const handleLaunchImageLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 100,
    });
    if (photo) {
      // setFormData({
      //   ...dataPusdalop,
      //   images: [...dataPusdalop.images, ...photo.assets],
      // });
    }
    // console.log('INI IMAGE LIBRARY', formData._parts[0]);
    // setImages(photo.assets[0].uri);
  };
  const [dataVerifikator, setDataVerifikator] = useState({
    tindakan_trc: false,
    langsung: false,
    kontruksi: false,
    alat_berat: false,
    dinas: false,
    rekomendasi: '',
    barangid: '',
    barangqty: '',
    image: images,
    keteranganImage: [],
  });
  const handleCreateVerifikator = async () => {
    try {
      const formData = new FormData();
      // formData.append('tindakan_trc', dataVerifikator.tindakan_trc);
      // formData.append('langsung', dataVerifikator.langsung);
      // formData.append('kontruksi', dataVerifikator.kontruksi);
      // formData.append('alat_berat', dataVerifikator.kontruksi);
      // formData.append('dinas', dataVerifikator.dinas);
      // formData.append('rekomendasi', dataVerifikator.rekomendasi);
      // formData.append('barang[0][id_barang]', dataVerifikator.barangid);
      // formData.append('barang[0][qty]', dataVerifikator.barangqty);
      // formData.append('keteranganImage[0]', dataVerifikator.keteranganImage);

      formData.append('tindakan_trc', true);
      formData.append('langsung', true);
      formData.append('kontruksi', true);
      formData.append('alat_berat', true);
      formData.append('dinas', true);
      formData.append('rekomendasi', 'tidak ada');
      formData.append('barang[0][id_barang]', 1);
      formData.append('barang[0][qty]', 1);
      formData.append('keteranganImage[0]', 'tess');
      //       tindakan_trc:true
      // langsung:true
      // kontruksi:true
      // alat_berat:true
      // dinas:true
      // rekomendasi:tidak ada rekomendas
      // barang[0][id_barang]:1
      // barang[0][qty]:2
      // keteranganImage[0]:tesss

      images.length > 0 &&
        images.forEach((v, k) => {
          formData.append(`Image[${k}]`, {
            name: v[k].fileName,
            type: v[k].type,
            uri: v[k].uri,
          });
        });
      const datauser = await AsyncStorage.getItem('token');
      console.log('INI DATA ASESMENT DALAM', formData);
      const result = await axios({
        method: 'PATCH',
        url: `https://apisimbebas.banyumaskab.go.id/api/v1/verifikasi/${pusdalopid}`,
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${datauser}`,
        },
      });
      console.log('INI DATA VERIF', formData);
      console.log('INI DATA VERIF', result);
      alert('SUKSES MEBUAT VERIFIKASI');
    } catch (error) {
      alert(error);
    }
  };
  const handleTindakanTRCPress = () => {
    alert('BERHASIL SET TINDAKAN TRC');
    setDataVerifikator({
      ...dataVerifikator,
      tindakan_trc: true,
    });
  };
  const handlePemberianPress = () => {
    alert('BERHASIL SET PEMBERIAN LANGSUNG');
    setDataVerifikator({
      ...dataVerifikator,
      langsung: true,
    });
  };
  const handleKontruksiPress = () => {
    alert('BERHASIL SET PENANGANAN KONTRUKSI');
    setDataVerifikator({
      ...dataVerifikator,
      kontruksi: true,
    });
  };
  const handleAlatPress = () => {
    alert('BERHASIL SET PENANGANAN ALAT');
    setDataVerifikator({
      ...dataVerifikator,
      alat_berat: true,
    });
  };
  const handleDinasPress = () => {
    alert('BERHASIL SET DINAS LAIN');
    setDataVerifikator({
      ...dataVerifikator,
      dinas: true,
    });
  };
  const handleChangeForm = (value, name) => {
    setDataVerifikator({...dataVerifikator, [name]: value});
  };
  return (
    <>
      <ScrollView>
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
            <Text style={{color: 'white'}}>Verifikator</Text>
            <Text style={{color: 'white'}}>(Verifikator Detail)</Text>
          </View>
          <View style={style.containerInput}>
            <Text style={{color: 'black'}}>Perbaiki Isian Data Bencana</Text>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text>Jenis Bencana:</Text>
              </View>
              <View style={{paddingHorizontal: '-30%'}}>
                <Text>{dataById?.data?.bencana?.sub_jenis}</Text>
              </View>
              {/* <TextInput
                placeholder="Tanah Longsor"
                style={{borderWidth: 1, borderRadius: 10}}
                editable={false}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Tanggal Kejadian</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>
                  {moment(dataById?.data?.tanggal).format(
                    'YYYY-MM-DD h:mm:ss a',
                  )}
                </Text>
              </View>
              {/* <TextInput
                placeholder={dataById?.data?.tanggal}
                style={{borderWidth: 1, borderRadius: 10}}
                editable={false}
              /> */}
            </View>
            <View>
              <Text style={{color: 'black'}}>Lokasi Terjadinya Bencana</Text>
              <View>
                <MapView
                  region={region}
                  initialRegion={region}
                  style={{
                    flex: 1,
                    height: 200,
                    width: 400,
                    position: 'absolute',
                    zIndex: 999999,
                    marginLeft: '0.5%',
                  }}>
                  <Marker
                    draggable
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    // onDragEnd={e =>
                    //   setMapRegion({
                    //     ...mapRegion,
                    //     latitude: e.nativeEvent.coordinate.latitude,
                    //     longitude: e.nativeEvent.coordinate.longitude,
                    //   })
                    // }
                  />
                </MapView>
              </View>
            </View>
            <View
              style={{
                marginTop: '50%',
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Kecamatan</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>
                  {dataById?.data?.kecamatan?.kecamatan}
                </Text>
              </View>
              {/* <TextInput
                placeholder={dataById?.data?.kecamatan?.kecamatan}
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Desa</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>
                  {dataById?.data?.desa?.desa}
                </Text>
              </View>
              {/* <TextInput
                placeholder={dataById?.data?.desa?.desa}
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black'}}>Alamat</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>{dataById?.data?.alamat}</Text>
              </View>
              {/* <TextInput
                placeholder={dataById?.data?.alamat}
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Kerusakan Rumah</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>Ringan</Text>
              </View>
              {/* <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Cakupan Banjir</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>Data Cakupan Banjir</Text>
              </View>
              {/* <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Deskripsi Kronologis</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>Data Deskripsi Kronologis</Text>
              </View>
              {/* <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black'}}>Tindakan</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>Data Tindakan</Text>
              </View>
              {/* <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black'}}>Peralatan dibutuhkan</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>
                  Data Peralatan yang dibutuhkan
                </Text>
              </View>
              {/* <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: 'black'}}>Rekomendasi</Text>
              </View>
              <View>
                <Text style={{color: 'black'}}>Data Rekomendasi</Text>
              </View>
              {/* <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              /> */}
            </View>
            <View style={style.viewVerifikator}>
              <View>
                <Text style={style.fontviewVerifikator}>ASESMENT</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={style.colorFortext}>
                  Data Barang Yang Di Butuhkan
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'black'}}>Nama Barang</Text>
                <Text style={{marginLeft: '55%', color: 'black'}}>Qty</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%'}}>
                  <SelectList
                    dropdownTextStyles={{color: 'black'}}
                    inputStyles={{color: 'black'}}
                    setSelected={handleDataBarang}
                    data={dataStokBrang}
                    save="key"
                    item="key"
                    itemLabel="name"
                    placeholder="Pilih Barang"
                  />
                </View>
                <View style={{marginLeft: '5%'}}>
                  <TextInput
                    style={{
                      flex: 1,
                      height: 40,
                      borderColor: 'black',
                      color: 'black',
                      borderWidth: 1,
                      borderRadius: 5,
                      marginRight: 10,
                      marginLeft: 5,
                      width: '70%', // set the width to 200 pixels
                    }}
                    onChangeText={text =>
                      setDataVerifikator({
                        ...dataVerifikator,
                        barangqty: text,
                      })
                    }
                  />
                </View>
                <View style={{marginLeft: '5%'}}>
                  <Button
                    title="+"
                    onPress={() => alert('FITUR BELUM TERSEDIA')}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text>Upload File Gambar</Text>
            </View>
            <View>
              <View>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginRight: '30%'}}>
                    {images && images[0] && images[0][0]?.uri && (
                      <Image
                        source={{
                          uri: images[0][0].uri,
                        }}
                        style={{height: 200, width: 200}}
                      />
                    )}
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
                    <Icon name="camera" size={20} style={{marginLeft: 10}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 10, width: 60}}
                    onPress={handleLaunchImageLibrary}>
                    <Icon
                      name="folder-images"
                      size={20}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{color: 'black'}}>Keterangan</Text>
                  <TextInput
                    placeholder="Masukan Keterangan gambar"
                    placeholderTextColor="black"
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                      marginBottom: 10,
                      color: 'black',
                    }}
                    onChangeText={text =>
                      setDataVerifikator({
                        ...dataVerifikator,
                        keteranganImage: [text],
                      })
                    }
                  />
                </View>
                <View>
                  <Text style={{color: 'black'}}>Rekomendasi</Text>
                  <TextInput
                    placeholder="Masukan Rekomendasi"
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                      marginBottom: 10,
                    }}
                    placeholderTextColor="black"
                    onChangeText={dataVerifikator =>
                      handleChangeForm(dataVerifikator, 'rekomendasi')
                    }
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', width: '100%', height: '15%'}}>
              <View style={{width: '40%', height: '15%'}}>
                <Chip
                  styicon="information"
                  onPress={handleTindakanTRCPress}
                  style={style.styleChip}>
                  <View>
                    <Icon name="hand" size={20} selectionColor />
                  </View>
                  <View>
                    <Text>Tindakan TRC</Text>
                  </View>
                </Chip>
              </View>
              <View style={{width: '60%', height: '15%'}}>
                <Chip
                  styicon="information"
                  onPress={handlePemberianPress}
                  // onPress={() => console.log('Pressed')}
                  style={style.chipLangsung}>
                  <View>
                    <Icon name="archive" size={20} selectionColor />
                  </View>
                  <View>
                    <Text>Pemberian Langsung</Text>
                  </View>
                </Chip>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '15%',
                marginTop: '-50%',
              }}>
              <View style={{width: '48%', height: '15%'}}>
                <Chip
                  styicon="information"
                  onPress={handleKontruksiPress}
                  // onPress={() => console.log('Pressed')}
                  style={style.styleChip}>
                  <View>
                    <Icon name="new" size={20} selectionColor />
                  </View>
                  <View>
                    <Text>Penangan Kontruksi</Text>
                  </View>
                </Chip>
              </View>
              <View style={{marginLeft: '3%'}}>
                <View style={{width: '100%', height: '15%'}}>
                  <Chip
                    styicon="information"
                    onPress={handleAlatPress}
                    // onPress={() => console.log('Pressed')}
                    style={style.styleChip}>
                    <View>
                      <Icon name="traffic-cone" size={20} selectionColor />
                    </View>
                    <View>
                      <Text>Alat Berat</Text>
                    </View>
                  </Chip>
                </View>
              </View>
            </View>
            <View style={{marginTop: '-50%'}}>
              <View style={{width: '50%', height: '15%'}}>
                <Chip
                  styicon="information"
                  onPress={handleDinasPress}
                  // onPress={() => console.log('Pressed')}
                  style={style.styleChip}>
                  <View>
                    <Icon name="users" size={20} selectionColor />
                  </View>
                  <View>
                    <Text>Ditangani Dinas Lain</Text>
                  </View>
                </Chip>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#1a75ff',
                height: '3%',
                borderRadius: 5,
                marginTop: '-48%',
              }}>
              <Pressable
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={handleCreateVerifikator}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', marginTop: '2%'}}>
                  Verifikasi & Simpan
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#ff1a1a',
                height: '3%',
                borderRadius: 5,
                marginTop: '5%',
              }}>
              <Pressable
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={navVerifikator}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', marginTop: '2%'}}>
                  Batal
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 1700,
  },
  containerInput: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 30,
    padding: 6,
    width: '100%',
    height: '100%',
    position: 'relative',
    marginTop: -20,
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
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 7,
    backgroundColor: '#ff0000',
    width: '100%',
    textAlign: 'center',
    height: 40,
    // marginTop: 10,
  },
  viewVerifikator: {
    backgroundColor: '#FF6A16',
    width: '100%',
    height: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderRadius: 20,
  },
  fontviewVerifikator: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorFortext: {
    color: 'black',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  multipleInputLeft: {
    borderWidth: 1,
    borderRadius: 10,
  },
  containerMulLeft: {
    width: '100%',
  },
  styleChip: {
    width: '100%',
    flex: 1,
  },
  chipLangsung: {
    width: '85%',
    flex: 1,
    marginLeft: '10%',
  },
  chipAlat: {
    width: '85%',
    flex: 1,
    marginLeft: '10%',
  },
  chipDinas: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipDitangani: {
    marginTop: '2%',
    height: '14%',
    width: '50%',
  },
  buttonStyle: {
    marginTop: '-35%',
    marginBottom: '3%',
    // backgroundColor: 'red',
  },
});
