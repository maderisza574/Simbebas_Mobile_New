import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from '../../utils/axios';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getDataPusdalopById} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDataAssesmen} from '../../stores/actions/asesmen';
import moment from 'moment';

export default function AsesmenDetail(props) {
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dataStokBrang, setDataStokBarang] = useState('');
  const [namaBarang, setnamaBarang] = useState('');
  const [dataById, setDataByID] = useState({});
  const pusdalopid = props.route.params.pusdalopId;
  const lat = parseFloat(dataById?.data?.lat);
  const lng = parseFloat(dataById?.data?.lng);
  const defaultLat = -7.43973580004;
  const defaultLng = 109.244402567;
  //  for map

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
      // setMapRegion({
      //   ...mapRegion,
      //   latitude: result.data.lat,
      //   longitude: result.data.lng,
      // });
    } catch (error) {
      alert('gagal mendapat kan data');
      console.log(error);
    }
  };
  useEffect(() => {
    handlegetPusdalopId();
  }, []);
  useEffect(() => {
    axios
      .get(`/v1/barang?page=1&perPage=5`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.namaBarang.id, value: item.namaBarang.nama_barang};
        });
        setDataStokBarang(newArray);
      })
      .catch(error => console.error(error));
  }, []);
  // untuk data barang
  const mapRegion = {
    latitude: isNaN(lat) ? defaultLat : lat,
    longitude: isNaN(lng) ? defaultLng : lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // Image
  const [images, setImages] = useState([]);
  const handleLaunchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera ',
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
              setDataAsesemen({
                ...dataAssesmen,
                image: [...dataAssesmen.image, response.assets],
              });
              // setImage({...image, image: source});
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
    const formData = new FormData();
    formData.append('image', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri: photo.assets[0].uri,
    });
    setImage(photo.assets[0].uri);
  };
  const [dataAssesmen, setDataAsesemen] = useState({
    rumahrusak_rr: '',
    rumahrusak_rs: '',
    rumahrusak_rb: '',
    potensi_susulan: '',
    petugas: '',
    kerugianrp: '',
    korban_jiwa: '',
    waktu_assesment: new Date().toISOString().slice(0, 10),
    unsur_terlibat: '',
    kebutuhan_mendesak: '',
    cakupan: '',
    deskripsi_kronologis: '',
    peralatan_dibutuhkan: '',
    tindakan: '',
    luka_berat: '',
    luka_sedang: '',
    luka_ringan: '',
    dampak: '',
    kerusakan_fasum: '',
    keteranganImage: [],
    id_barang: [],
    qty: [],
    image: images,
  });

  const handleChangeForm = (value, name) => {
    setDataAsesemen({...dataAssesmen, [name]: value});
  };
  const handleDataBarang = key => {
    setDataAsesemen(prevData => ({
      ...prevData,
      id_barang: [key],
    }));
  };
  const handleCreateAsesmen = async () => {
    try {
      const formData = new FormData();
      formData.append('rumahrusak_rr', dataAssesmen.rumahrusak_rr);
      formData.append('rumahrusak_rs', dataAssesmen.rumahrusak_rs);
      formData.append('rumahrusak_rb', dataAssesmen.rumahrusak_rb);
      formData.append('potensi_susulan', dataAssesmen.potensi_susulan);
      formData.append('petugas', dataAssesmen.petugas);
      formData.append('kerugianrp', dataAssesmen.kerugianrp);
      formData.append('korban_jiwa', dataAssesmen.korban_jiwa);
      formData.append('waktu_assesment', dataAssesmen.waktu_assesment);
      formData.append('unsur_terlibat', dataAssesmen.unsur_terlibat);
      formData.append('kebutuhan_mendesak', dataAssesmen.kebutuhan_mendesak);
      formData.append('cakupan', dataAssesmen.cakupan);
      formData.append(
        'deskripsi_kronologis',
        dataAssesmen.deskripsi_kronologis,
      );
      formData.append(
        'peralatan_dibutuhkan',
        dataAssesmen.peralatan_dibutuhkan,
      );
      formData.append('tindakan', dataAssesmen.tindakan);
      formData.append('luka_berat', dataAssesmen.luka_berat);
      formData.append('luka_sedang', dataAssesmen.luka_sedang);
      formData.append('luka_ringan', dataAssesmen.luka_ringan);
      formData.append('dampak', dataAssesmen.dampak);
      formData.append('kerusakan_fasum', dataAssesmen.kerusakan_fasum);
      formData.append('keteranganImage[0]', dataAssesmen.keteranganImage);
      formData.append('barang[0][qty]', dataAssesmen.qty);
      formData.append('barang[0][id_barang]', dataAssesmen.id_barang);
      // formData.append('', dataAssesmen.);
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
        url: `https://apisimbebas.banyumaskab.go.id/api/v1/assesment/${pusdalopid}`,
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${datauser}`,
        },
      });

      console.log(result);
      alert('SUKSES MEMBUAT ASSESMEN');
      props.navigation.navigate('Asesmen');
    } catch (error) {
      console.log(error);
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
              marginTop: '-1%',
            }}>
            <Icon
              name="Safety"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Lapor Bencana</Text>
              <Text style={{color: 'white'}}>(ASESMEN)</Text>
            </View>
          </View>
        </View>
        <View style={style.containerInput}>
          <View style={style.paddingAsesmen}>
            <Text style={style.textAsesmen}>Lapor Bencana</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={style.textTitleInput}>Jenis Bencana</Text>
            </View>
            <View>
              <Text>{dataById?.data?.bencana?.sub_jenis}</Text>
            </View>
            {/* <TextInput
              placeholder={dataById?.data?.bencana?.sub_jenis}
              style={{borderWidth: 1, borderRadius: 10}}
              editable={false}
            /> */}
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={style.textTitleInput}>Tanggal Kejadian</Text>
            </View>
            <View>
              <Text>
                {moment(dataById?.data?.tanggal).format('YYYY-MM-DD h:mm:ss a')}
              </Text>
            </View>
            {/* <TextInput
              placeholder={dataById?.data?.tanggal}
              style={{borderWidth: 1, borderRadius: 10, marginTop: 5}}
              editable={false}
            /> */}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>
              Titik Lokasi Terjadinya Bencana
            </Text>
            <View style={style.containerMap}>
              <MapView
                region={mapRegion}
                initialRegion={mapRegion}
                style={{flex: 1, height: 300, width: '100%'}}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                  onDragEnd={e =>
                    setMapRegion({
                      ...mapRegion,
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    })
                  }
                />
              </MapView>
            </View>
          </View>
          <View
            style={{
              marginTop: 200,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={style.textTitleInput}>Kecamatan</Text>
            </View>
            <View>
              <Text>{dataById?.data?.kecamatan?.kecamatan}</Text>
            </View>
            {/* <TextInput
              placeholder={dataById?.data?.kecamatan?.kecamatan}
              style={{borderWidth: 1, borderRadius: 10}}
              editable={false}
            /> */}
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={style.textTitleInput}>Desa</Text>
            </View>
            <View>
              <Text>{dataById?.data?.desa?.desa}</Text>
            </View>
            {/* <TextInput
              placeholder={dataById?.data?.desa?.desa}
              style={{borderWidth: 1, borderRadius: 10}}
            /> */}
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={style.textTitleInput}>Alamat</Text>
            <Text>{dataById?.data?.alamat}</Text>
            {/* <TextInput
              placeholder={dataById?.data?.alamat}
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            /> */}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
              marginBottom: '5%',
              backgroundColor: '#FF6A16',
              height: '2%',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              ISI BEBERAPA DATA BERIKUT UNTUK ASESMEN
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Tanggal Asesmen</Text>
            <TextInput
              value={date.toLocaleDateString()}
              placeholder={date.toLocaleDateString()}
              style={{borderWidth: 1, borderRadius: 10}}
              editable={false}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  waktu_assesment: text,
                })
              }
              // onChangeText={text => setDate(new Date(text))}
            />

            {/* <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            /> */}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Dampak</Text>
            <TextInput
              placeholder="Dampak"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  dampak: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Kerusakan Fasum</Text>
            <TextInput
              placeholder="Kerusakan Fasum"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  kerusakan_fasum: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Kerusakan Rumah</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '3%',
              }}>
              <View>
                <Text style={style.textAsesmen}>Rusak Ringan</Text>
                <TextInput
                  placeholder="Ringan"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      rumahrusak_rr: text,
                    })
                  }
                />
              </View>
              <View>
                <Text style={style.textAsesmen}>Rusak Sedang</Text>
                <TextInput
                  placeholder="Sedang"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      rumahrusak_rs: text,
                    })
                  }
                />
              </View>
              <View>
                <Text style={style.textAsesmen}>Rusak Berat</Text>
                <TextInput
                  placeholder="Berat"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      rumahrusak_rb: text,
                    })
                  }
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Kerugian</Text>
            <TextInput
              placeholder="Masukan Kerugian"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  kerugianrp: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Korban Luka</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
              }}>
              <View>
                <Text style={style.textAsesmen}>Luka Ringan</Text>
                <TextInput
                  placeholder="Ringan"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      luka_ringan: text,
                    })
                  }
                />
              </View>
              <View>
                <Text style={style.textAsesmen}>Luka Sedang</Text>
                <TextInput
                  placeholder="Sedang"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      luka_sedang: text,
                    })
                  }
                />
              </View>
              <View>
                <Text style={style.textAsesmen}>Luka Berat</Text>
                <TextInput
                  placeholder="Berat"
                  style={{borderWidth: 1, borderRadius: 10, marginTop: '5%'}}
                  onChangeText={text =>
                    setDataAsesemen({
                      ...dataAssesmen,
                      luka_berat: text,
                    })
                  }
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Korban Jiwa</Text>
            <TextInput
              placeholder="Korban Jiwa"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  korban_jiwa: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Cakupan Bencana</Text>
            <TextInput
              placeholder="Cakupan Bencana"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  cakupan: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Potensi Bencana Susulan</Text>
            <TextInput
              placeholder="Potensi Bencana Susulan"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  potensi_susulan: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Deskripsi Kronologis</Text>
            <TextInput
              placeholder="Kronologis"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  deskripsi_kronologis: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Tindakan akan dilakukan</Text>
            <TextInput
              placeholder="Tindakan"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  tindakan: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Peralatan yang dibutuhkan</Text>
            <TextInput
              placeholder="Peralatan"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  peralatan_dibutuhkan: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Kebutuhan mendesak</Text>
            <TextInput
              placeholder="Kebutuhan Mendesak"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  kebutuhan_mendesak: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Unsur terlibat</Text>
            <TextInput
              placeholder="Unsur Terlibat"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  unsur_terlibat: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>Petugas</Text>
            <TextInput
              placeholder="Petugas"
              style={{borderWidth: 1, borderRadius: 10}}
              onChangeText={text =>
                setDataAsesemen({
                  ...dataAssesmen,
                  petugas: text,
                })
              }
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>
              Data Barang Yang Di Butuhkan
            </Text>
            <View>
              <View>
                <SelectList
                  setSelected={handleDataBarang}
                  data={dataStokBrang}
                  save="key"
                  item="key"
                  itemLabel="name"
                  placeholder="Pilih Barang"
                  dropdownTextStyles={{color: 'black'}}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Qty"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '100%',
                  marginTop: '5%',
                }}
                onChangeText={text =>
                  setDataAsesemen({
                    ...dataAssesmen,
                    qty: [text],
                  })
                }
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.textTitleInput}>File Gambar</Text>
            <View style={{flexDirection: 'row', padding: 10}}>
              <View style={{marginRight: 60}}>
                <Text style={style.textAsesmen}>Preview Image</Text>
                {/* {dataAssesmen.image[0]?.uri && (
                  <Image
                    source={{
                      uri: dataAssesmen.image[0]
                        ? dataAssesmen.image[0]?.uri
                        : null,
                    }}
                    style={{height: 200, width: 200}}
                  />
                )} */}
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
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{marginRight: 10, width: 60}}
                onPress={handleLaunchCamera}>
                <Icon
                  name="camera"
                  size={20}
                  style={{marginLeft: 10}}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 10, width: 60}}
                onPress={handleLaunchImageLibrary}>
                <Icon
                  name="folder1"
                  size={20}
                  style={{marginLeft: 10}}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                placeholder="Masukan Keterangan"
                style={{borderWidth: 1, borderRadius: 10}}
                onChangeText={text =>
                  setDataAsesemen({
                    ...dataAssesmen,
                    keteranganImage: [text],
                  })
                }
              />
            </View>
          </View>
          <View style={{marginTop: -4}}>
            <Pressable style={style.buttonSimpan} onPress={handleCreateAsesmen}>
              <Text style={style.textLogin}>Simpan</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={style.buttonBatal}>
              <Text style={style.textLogin}>Batal</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={style.buttonganjal}>
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
    maxHeight: '5000%',
    // height: '1000%',
    position: 'relative',
    marginTop: -10,
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
  buttonSimpan: {
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
  containerMap: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    marginTop: 20,
  },
  textTitleInput: {
    color: 'black',
    marginBottom: '2%',
  },
  paddingAsesmen: {
    paddingHorizontal: '3%',
    marginTop: '3%',
  },
  textAsesmen: {
    color: 'black',
  },
  buttonganjal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ffffff',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 10,
  },
});
