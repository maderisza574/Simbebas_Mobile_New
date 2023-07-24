import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Map from '../screen/map';

import Pusdalop from '../screen/Pusdalop';
import PusdalopDetail from '../screen/Pusdalop Detail';
import PusdalopCreate from '../screen/PusdalopCreate';
import DrawerContent from '../components/DrawerContent';
import HeaderHome from '../components/Header/home';
import HeaderDefault from '../components/Header/default';
import Asesmen from '../screen/Asesmen';
import Verifikator from '../screen/Verifikator';
import AsesmenDetail from '../screen/Asesmen Detail';
import Counter from '../screen/Counter';
import GudangLogpal from '../screen/Gudang Logpal';
import TambahLogpal from '../screen/Tambah Logpal';
import TindakanTRC from '../screen/TindakanTrc';
import LogpalCepat from '../screen/Logpal Cepat';
import LogpalCepatDetail from '../screen/Logpal Cepat Detail';
import VerifikatorDetail from '../screen/Verifikator Detail';
import Coba from '../screen/coba';
function MenuNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA AKAN MASUK KE DALAM DRAWER DISINI
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: props => <HeaderHome {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pusdalop"
        component={Pusdalop}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="filetext1" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Asesmen"
        component={Asesmen}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="Safety" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verifikator"
        component={Verifikator}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="team" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Gudang Logpal"
        component={GudangLogpal}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="inbox" color={color} size={size} />
          ),
        }}
      />
      {/* Tindakan TRC*/}
      <Drawer.Screen
        name="TindakanTRC"
        component={TindakanTRC}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="flag" color={color} size={size} />
          ),
        }}
      />
      {/* Logpal Cepat */}
      <Drawer.Screen
        name="LogpalCepat"
        component={LogpalCepat}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="exception1" color={color} size={size} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="enviroment" color={color} size={size} />
          ),
        }}
      /> */}
      {/* Counter */}
      {/* <Drawer.Screen
        name="Counter"
        component={Counter}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="enviroment" color={color} size={size} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Coba"
        component={Coba}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="enviroment" color={color} size={size} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default function AppStackNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA DAPAT DI AKSES DILUAR DRAWER DISINI
    <Stack.Navigator initialRouteName="MenuNavigator">
      {/* HOME SCREEN */}
      <Stack.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Detail" component={Detail} />
      {/* ASESMEN DETAIL */}
      <Stack.Screen
        name="AsesmenDetail"
        component={AsesmenDetail}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />
      {/* PUSDALOP DETAIL*/}
      <Stack.Screen
        name="PusdalopDetail"
        component={PusdalopDetail}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />

      {/* Tambah Logpal*/}
      <Stack.Screen
        name="TambahLogpal"
        component={TambahLogpal}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />
      {/* Logpal Cepat Detail */}
      <Stack.Screen
        name="LogpalCepatDetail"
        component={LogpalCepatDetail}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />
      <Stack.Screen
        name="VerifikatorDetail"
        component={VerifikatorDetail}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />
      <Stack.Screen
        name="PusdalopCreate"
        component={PusdalopCreate}
        options={{
          header: props => <HeaderDefault {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
