import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';
import Avatar from '../../assets/img/john.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

function DrawerContent(props) {
  const [name, setName] = useState('Anonymous');
  const [roles, setRoles] = useState('Pusdalop');

  const handleLogout = async () => {
    try {
      alert('Logout');
      await AsyncStorage.clear();
      props.navigation.replace('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {}
  };
  const fetchUserData = async () => {
    try {
      const nameFromStorage = await AsyncStorage.getItem('nama');
      const rolesFromStorage = await AsyncStorage.getItem('role');
      // if (nameFromStorage && rolesFromStorage) {
      setName(nameFromStorage);
      setRoles(rolesFromStorage);
      // }
    } catch (error) {
      console.log('error');
      // Handle error if needed
    }
  };
  useEffect(() => {
    // Function to fetch data from AsyncStorage and set the state

    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <View style={styles.avatar}>
            <Image source={Avatar} style={{width: 40, height: 40}} />
          </View>
          <View style={styles.biodata}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.rolesContainer}>
              <Text style={styles.caption}>{roles}</Text>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon color={color} size={size} name="log-out" />
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rolesContainer: {
    maxWidth: 200,
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
    color: 'black',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'black',
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;
