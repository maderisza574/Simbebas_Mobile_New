import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {List} from 'react-native-paper';

export default function LogpalCepatDetail(Props) {
  const [dataBarang, setDataBarang] = useState([
    {name: 'Ben', id: 1},
    {name: 'Susan', id: 2},
    {name: 'Robert', id: 3},
    {name: 'Mary', id: 4},
    {name: 'Daniel', id: 5},
    {name: 'Laura', id: 6},
    {name: 'John', id: 7},
    {name: 'Debra', id: 8},
    {name: 'Aron', id: 9},
    {name: 'Ann', id: 10},
    {name: 'Steve', id: 11},
    {name: 'Olivia', id: 12},
  ]);
  const BottomFlatList = () => {
    return (
      <View style={{position: 'absolute', zIndex: 100}}>
        <Text>Data Barang yang Dibutuhkan</Text>
        <FlatList
          data={dataBarang}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={item => item.id.toString()}
          style={{flex: 1}}
        />
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={style.titleScreen}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -3,
          }}>
          <Text>Lihat Laporan (LogpalCepat Detail)</Text>
        </View>
      </View>
      <View style={style.containerInput}>
        <View>
          <Text>Jenis Bencana</Text>
          <TextInput
            placeholder="Tanah Longsor"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <View>
          <Text>Tanggal Kejadian</Text>
          <TextInput
            placeholder="08/12/98"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <View>
          <Text>Titik Lokasi Terjadinya Bencana</Text>
          <TextInput
            placeholder="08/12/98"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <View>
          <Text>Kecamatan</Text>
          <TextInput
            placeholder="Patikraja"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <View>
          <Text>Desa</Text>
          <TextInput
            placeholder="Desa"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <View>
          <Text>Alamat</Text>
          <TextInput
            placeholder="Desa"
            editable={false}
            style={{borderWidth: 1}}
          />
        </View>
        <List.Section>
          <List.Accordion
            title="Lihat Semua Barang Yang Dibutuhkan"
            left={props => <List.Icon {...props} icon="folder" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}>
            {dataBarang.map(item => (
              <List.Item key={item.id} title={item.name} />
            ))}
          </List.Accordion>
        </List.Section>
        <View />
      </View>
    </ScrollView>
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
    // maxHeight: 1000,
    height: 2800,
    position: 'relative',
    marginTop: -10,
  },
});
