import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDJn6Nsc_kU477Symn0acKq1Js7C-1ALbIs');

export default function Map(props) {
  const [latitudedata, setLatitude] = useState('');
  const [longitudedata, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [addresscoder, setAddressCoder] = useState('');
  console.log(addresscoder);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    requestLocationPermission();
    // getAddressFromLatLng();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          error => {
            if (error.code === error.TIMEOUT) {
              alert('Position unavailable. Please try again later.');
            } else {
              alert('An error occurred while retrieving your location.');
            }
          },
          {enableHighAccuracy: true, timeout: 10000},
        );
      } else {
        alert('Error', 'ALAMAT YANG ANDA MASUKAN SALAH');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const search = () => {
    // console.log('INI DATA LAT', latitude);
    // console.log('INI DATA LONG', longitude);
    // const latitude = parseFloat(address.split(',')[0]);
    // const longitude = parseFloat(address.split(',')[1]);
    const latitude = parseFloat(latitudedata);
    const longitude = parseFloat(longitudedata);
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    getAddressFromLatLng();
  };
  const getAddressFromLatLng = async () => {
    try {
      // const latitude = parseFloat(latitudedata);
      // const longitude = parseFloat(longitudedata);
      const response = await Geocoder.from(latitudedata, longitudedata);
      const address = response.results[0].formatted_address;
      console.log(address);
      // setAddressCoder(address);
    } catch (error) {
      console.log(error);
    }
  };

  const onMarkerDragEnd = e => {
    const newRegion = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    setRegion(newRegion);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Latitude, Longitude"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <View>
          <Text style={styles.address}>{addresscoder}</Text>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => search()}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Latitude"
          value={latitudedata}
          onChangeText={text => setLatitude(text)}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Longitude"
          value={longitudedata}
          onChangeText={text => setLongitude(text)}
        />
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={e => console.log(e.nativeEvent.coordinate)}>
        <Marker
          draggable
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          onDragEnd={onMarkerDragEnd}
        />
        {/* <Marker
          coordinate={region}
          onDragEnd={e =>
            getAddressFromLatLng(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
            )
          }
          draggable
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    margin: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  address: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
  },
});
