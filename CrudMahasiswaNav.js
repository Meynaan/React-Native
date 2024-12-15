import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGear, faCirclePlus, faUserPen, faMap, faHouse } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Createdata from './Createdata';
import Datamahasiswa from './Listdata';
import Editdata from './Editdata';

function ProfilScreen() {
  return <Profil />;
}
function HomeScreen() {
  return <Createdata />;
}

function DataMahasiswaScreen() {
  return <Datamahasiswa />;
}

function EditScreen() {
  return <Editdata />;
}

function WebScreen() {
  return <WebView source={{ uri: 'https://leaflet-app-dusky.vercel.app/home' }} />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 5, // Jarak dari bawah layar
            left: 20, // Jarak dari kiri
            right: 20, // Jarak dari kanan
            borderRadius: 15, // Membuat sudut membulat
            height: 70, // Tinggi bar
            backgroundColor: 'white', // Warna latar belakang
            shadowColor: '#000', // Warna bayangan
            shadowOffset: { width: 0, height: 5 }, // Posisi bayangan
            shadowOpacity: 0.1, // Transparansi bayangan
            shadowRadius: 10, // Radius bayangan
            elevation: 10, // Bayangan untuk Android
          },
          tabBarItemStyle: {
            margin: 5, // Jarak antar ikon
          },
          tabBarLabelStyle: {
            fontSize: 12, // Ukuran teks label
          },
          tabBarActiveTintColor: '#AB4459', // Warna ikon aktif
          tabBarInactiveTintColor: '#8e8e93', // Warna ikon tidak aktif
        }}
      >
        <Tab.Screen
          name="Home"
          component={ProfilScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouse} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Daftar KK"
          component={DataMahasiswaScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Tambah"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCirclePlus} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUserPen} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Map"
          component={WebScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMap} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
