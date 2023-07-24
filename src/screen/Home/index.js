import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Logo from '../../assets/img/BPBD.png';
import {ImageSlider} from 'react-native-image-slider-banner';
import {ScrollView} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
// import Foto from '../../assets/img/';

export default function Home(props) {
  const Foto = '../../assets/img/';

  // const Item = ({image}) => {
  //   return <Image source={{uri: image}} style={{width: 100, height: 100}} />;
  // };
  const navPusdalop = () => {
    props.navigation.navigate('PusdalopCreate');
  };
  const navAsesmen = () => {
    props.navigation.navigate('Asesmen');
  };
  const navVerifikator = () => {
    props.navigation.navigate('Verifikator');
  };
  const navLogpal = () => {
    props.navigation.navigate('Gudang Logpal');
  };
  const navTrc = () => {
    props.navigation.navigate('TindakanTRC');
  };
  const navLogCepat = () => {
    props.navigation.navigate('LogpalCepat');
  };
  // const nav

  return (
    <>
      <View style={style.containerTop}></View>
      <View style={style.containerButton}>
        <View style={style.cardWelcome}>
          <View
            style={{marginLeft: '5%', marginTop: '3%', position: 'absolute'}}>
            <Image source={Logo} style={{width: 100, height: 100}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '10%',
              marginTop: '30%',
              position: 'absolute',
            }}>
            <Text style={style.textSim}>SIM</Text>
            <Text style={style.textBebas}>BEBAS</Text>
          </View>
          <View style={{marginLeft: '40%', marginTop: '10%', width: '50%'}}>
            <Text style={style.textwelcome}>
              Selamat Datang di aplikasi SIMBEBAS, untuk memulai tombol menu
              berada di kiri {'\n'} atas
            </Text>
          </View>
        </View>
        <ScrollView>
          <View>
            <View style={style.grupButton}>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    onPress={navPusdalop}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="filetext1" color={'white'} size={50} />
                    <Text style={{color: 'white'}}>PUSDALOP</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    onPress={navAsesmen}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="Safety" color={'white'} size={50} />
                    <Text style={{color: 'white'}}>Asesmen</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    onPress={navVerifikator}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="team" color={'white'} size={50} />
                    <Text style={{color: 'white'}}>Verifikator</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.grupButton2}>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    // onPress={alert('FITUR BELUM TERSEDIA')}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="inbox" color={'white'} size={50} />
                    <Text style={{color: 'white'}}>Logpal</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    // onPress={alert('FITUR BELUM TERSEDIA')}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{marginLeft: '10%', marginTop: '6%'}}>
                        <Icon name="flag" color={'white'} size={50} />
                      </View>
                      <View>
                        <Text style={{color: 'white'}}>TRC</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF6A16',
                    width: 90,
                    height: 90,
                    borderRadius: 44 / 1,
                  }}>
                  <TouchableOpacity
                    // onPress={alert('FITUR BELUM TERSEDIA')}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="exception1" color={'white'} size={50} />
                    <Text style={{color: 'white'}}>LogCepat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: '3%',
              marginTop: '2%',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Banner
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '80%',
                borderRadius: 5,
                marginTop: -30,
              }}>
              <ImageSlider
                data={[
                  {
                    img: 'https://monitorindonesia.com/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-16-at-16.25.20.jpeg',
                  },
                  {
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg8cikBsNwefxO12X8Q3QxwME_YxKu9iRahA&usqp=CAU',
                  },
                  {
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHmFWobSfzJNBV_NL2Gb0wKxbfwtabxy1mg&usqp=CAU',
                  },
                ]}
                autoPlay={true}
                timer={5000}
                // onItemChanged={item => console.log('item', item)}
                closeIconColor="#fff"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  // dummy style
  textwelcome: {
    color: 'black',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardWelcome: {
    marginTop: '-20%',
    width: '95%',
    backgroundColor: '#ffffff',
    height: '18%',
    marginHorizontal: 11,
    borderRadius: 20,
    zIndex: 999,
    borderWidth: 1,
    borderColor: '#FF6A16',
    // position: 'absolute',
  },
  textSim: {
    color: '#0000ff',
    marginRight: '3%',
  },
  textBebas: {
    color: '#ff0000',
  },
  card: {
    width: '100%',
    height: '100%',
    marginHorizontal: '10%',
    marginTop: '20%',
    backgroundColor: 'Blue',
    borderColor: 'Black',
  },
  containerButton: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    marginTop: -30,
  },
  containerTop: {
    backgroundColor: '#FF6A16',
    width: '100%',
    height: '20%',
  },
  grupButton: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  grupButton2: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    marginTop: '15%',
  },
});
