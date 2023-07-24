import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TambahLogpal() {
  const dataBarang = [
    {
      key: '1',
      value: 'air mineral (LOGISTIK-Kardus)',
    },
    {
      key: '2',
      value: 'air mineral 29622 (LOGISTIK-Kardus)',
    },
    {
      key: '3',
      value: 'air mineral 7122022 (LOGISTIK-Kardus)',
    },
    {
      key: '4',
      value: 'alat deteksi dini dan peringatan (Peralatan-unit)',
    },
    {
      key: '5',
      value: 'alat kebersihan (LOGISTIK-paket)',
    },
    {
      key: '6',
      value: 'alat kesehatan (LOGISTIK-paket)',
    },
    {
      key: '7',
      value: 'alat/Paket pemadam kebakaran (PERALATAN-Unit)',
    },
    {
      key: '8',
      value: 'alat/Paket pemotong baja dan beton (PERALATAN-Unit)',
    },
    {
      key: '9',
      value: 'Alkohol (Logistik-litter)',
    },
    {
      key: '10',
      value: 'antena tunner i come (PERALATAN - Unit)',
    },
    {
      key: '11',
      value: 'arit (PERALATAN - buah)',
    },
    {
      key: '12',
      value: 'ascender biru (PERALATAN - buah)',
    },
    {
      key: '13',
      value: 'baju Selam (PERALATAN - set)',
    },
    {
      key: '14',
      value: 'ban dalam merk uma 200/750-16 (PERALATAN - pcs)',
    },
    {
      key: '15',
      value: 'BANTUAN PROV REKREASIONAL (Logistik - box)',
    },
    {
      key: '16',
      value: 'baskom besar (Peralatan - buah)',
    },
    {
      key: '17',
      value: 'bayclean (Logistik - pcs)',
    },
    {
      key: '18',
      value: 'bedong bayi (Logistik - pcs)',
    },
    {
      key: '19',
      value: 'bendo (Peralatan - buah)',
    },
    {
      key: '20',
      value: 'beras (Logistik - kg)',
    },
    {
      key: '21',
      value: 'Beras Kenpan (Logistik - kg)',
    },
    {
      key: '22',
      value: 'Beras Provinsi 2022 (Logistik - kg)',
    },
    {
      key: '23',
      value: 'Beras Provinsi 2022 (Logistik - kg)',
    },
    {
      key: '24',
      value: 'Beras Reguler 29622 (Logistik - kg)',
    },
    {
      key: '25',
      value: 'bindai spinai (Peralatan - unit)',
    },
    {
      key: '26',
      value: 'B.PROV REKREASIONAL 1822 (Logistik - box)',
    },
    {
      key: '27',
      value: 'breathing appars (PERALATAN - Unit)',
    },
    {
      key: '28',
      value: 'Brojong (MATERIAL - lembar)',
    },
    {
      key: '29',
      value: 'Brojong BTT 2022 (MATERIAL - lembar)',
    },
    {
      key: '30',
      value: 'cairan desifektan (LOGISTIK - kantong)',
    },
    {
      key: '31',
      value: 'calsiboard (MATERIAL - lembar)',
    },
    {
      key: '32',
      value: 'Calsiboard BTT 2022 (MATERIAL - lembar)',
    },
    {
      key: '33',
      value: 'cadung/ kudi (PERALATAN - Unit)',
    },
    {
      key: '34',
      value: 'carabinner abu-abu (PERALATAN - buah)',
    },
    {
      key: '35',
      value: 'carabinner biru (PERALATAN - buah)',
    },
    {
      key: '36',
      value: 'carabinner silver (PERALATAN - buah)',
    },
    {
      key: '37',
      value: 'celurit (PERALATAN - unit)',
    },
    {
      key: '38',
      value: 'centong nasi (PERALATAN - buah)',
    },
    {
      key: '39',
      value: 'centong sayur besar (PERALATAN - buah)',
    },
    {
      key: '40',
      value: 'centong sayur kecil (PERALATAN - buah)',
    },
  ];
  const [barang, setBarang] = useState({});
  const sumberBarang = [
    {
      key: '1',
      value: 'APBD REGULER',
    },
    {
      key: '2',
      value: 'BANTUAN MASYARAKAT',
    },
    {
      key: '3',
      value: 'BANTUAN PROVINSI',
    },
    {
      key: '4',
      value: 'BTT COVID19 2020',
    },
    {
      key: '5',
      value: 'BTT COVID19 2021',
    },
    {
      key: '6',
      value: 'APBD REGULER 2021',
    },
    {
      key: '7',
      value: 'BANTUAN PROVINSI 2021',
    },
    {
      key: '8',
      value: 'BTT BENCAL 2022',
    },
  ];
  const [tampungSumberBarang, settampungSumberBarang] = useState({});
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
            <Text style={{color: 'white'}}>(Input Inventory Baru)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <Text>Masukan Data Baru</Text>
        <View>
          <Text>Nama Barang</Text>
          <SelectList
            dropdownTextStyles={{color: 'black'}}
            setSelected={val => setBarang(val)}
            data={dataBarang}
            save="value"
            placeholder="Pilih Data Barang"
          />
        </View>
        <View>
          <Text>Qty</Text>
          <TextInput placeholder="Qty" style={style.inputBarang} />
        </View>
        <View>
          <Text>Harga</Text>
          <TextInput placeholder="Harga" style={style.inputBarang} />
        </View>
        <View>
          <Text>Sumber Barang</Text>
          <SelectList
            dropdownTextStyles={{color: 'black'}}
            setSelected={val => settampungSumberBarang(val)}
            data={sumberBarang}
            save="value"
            placeholder="Pilih Sumber Barang"
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text>Tanggal Expaired</Text>
          <TextInput placeholder="Tanggal Expaired" style={style.inputBarang} />
        </View>
        <View style={{marginTop: 10}}>
          <Text>Kode Posisi Barang</Text>
          <TextInput
            placeholder="Kode Posisi Barang"
            style={style.inputBarang}
          />
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin}>
              <Text style={style.textLogin}>Simpan</Text>
            </Pressable>
            <Pressable style={style.buttonBatal}>
              <Text style={style.textLogin}>Batal</Text>
            </Pressable>
          </View>
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
  inputBarang: {
    width: 370,
    height: 40,
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 7,
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#3399ff',
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
