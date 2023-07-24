import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default function GudangLogpal(props) {
  const navTambahGudangLogpal = () => {
    props.navigation.navigate('TambahLogpal');
  };
  const [people, setPeople] = useState([
    {
      name: 'Shaun',
      image: 'https://via.placeholder.com/100x100',
      key: '1',
    },
    {
      name: 'San',
      image: 'https://via.placeholder.com/100x100',
      key: '2',
    },
    {
      name: 'Sun',
      image: 'https://via.placeholder.com/100x100',
      key: '3',
    },
    {
      name: 'dab',
      image: 'https://via.placeholder.com/100x100',
      key: '4',
    },
    {
      name: 'dun',
      image: 'https://via.placeholder.com/100x100',
      key: '5',
    },
    {
      name: 'dor',
      image: 'https://via.placeholder.com/100x100',
      key: '6',
    },
    {
      name: 'dur',
      image: 'https://via.placeholder.com/100x100',
      key: '7',
    },
    {
      name: 'der',
      image: 'https://via.placeholder.com/100x100',
      key: '8',
    },
    {
      name: 'doel',
      image: 'https://via.placeholder.com/100x100',
      key: '9',
    },
    {
      name: 'doer',
      image: 'https://via.placeholder.com/100x100',
      key: '10',
    },
  ]);
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
            name="inbox"
            size={40}
            color={'white'}
            style={{marginLeft: 10}}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Data Inventory</Text>
            <Text style={{color: 'white'}}>(Gudang Logpal)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <Text>GudangLogpal</Text>
        <Pressable style={style.buttonTambah} onPress={navTambahGudangLogpal}>
          <Text style={style.textTambah}>Tambah</Text>
        </Pressable>
        <FlatList
          data={people}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View style={style.card}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: `${item.image}`}}
                  style={{width: 100, height: 100}}
                />
                <View>
                  <Text style={{marginLeft: 10}}>Bencana</Text>
                  <Text style={{marginLeft: 10}}>Location</Text>
                  <Text style={{marginLeft: 10}}>Butuh asesment</Text>
                  <Text style={{marginLeft: 10}}>
                    lorem ipsum lorem lorem lorem lorem lorem lorem
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 300,
                    flexDirection: 'row',
                    position: 'absolute',
                  }}>
                  <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                      marginRight: 5,
                    }}>
                    <Text style={{marginLeft: 10}}>Lihat</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
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
  containerInput: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 30,
    padding: 6,
    width: '100%',
    maxHeight: '100%',
    height: 2800,
    position: 'relative',
    marginTop: -10,
  },
  buttonTambah: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#3399ff',
    width: '30%',
    textAlign: 'center',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  textTambah: {
    color: 'white',
    marginLeft: -5,
    fontWeight: 'bold',
  },
});
