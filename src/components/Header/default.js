import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function DefaultHeader(props) {
  const backScreen = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={backScreen} style={styles.section}>
        <Icon name="arrowleft" size={25} color={'white'} />
      </TouchableOpacity>
      <View style={(styles.section, styles.sectionCenter)}>
        <Text>{props.name}</Text>
      </View>
      <View style={styles.section} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FF6A16',
  },
  section: {
    flex: 1,
  },
  sectionCenter: {
    alignItems: 'center',
  },
});
