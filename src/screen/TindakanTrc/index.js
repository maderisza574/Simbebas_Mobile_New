import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function TindakanTRC() {
  return (
    <View>
      <ScrollView>
        <View style={style.titleScreen}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -3,
            }}>
            <Icon
              name="flag"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
              <Text style={{color: 'white'}}>(PUSDALOP)</Text>
            </View>
          </View>
        </View>
        <View style={style.containerInput}>
          <View>
            <Text>Lapor Bencana</Text>
            <Text>Perbaiki Isian Data Bencana</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text>Jenis Bencana</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Titik Lokasi Terjadinya Bencana</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kecamatan</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Desa</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Alamat</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Risalah</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Penanggung Jawab</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Jenis Bantuan</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>File Gambar</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
            <TextInput placeholder="Keterangan" style={style.inputAduan} />
          </View>
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin}>
              <Text style={style.textLogin}>Kirim</Text>
            </Pressable>
            <Pressable style={style.buttonBatal}>
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
    maxHeight: '100%',
    // height: 2800,
    position: 'relative',
    marginTop: -10,
    flexGrow: 1,
    // flex: 1,
  },
  inputAduan: {
    width: 370,
    height: 50,
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10,
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
});
