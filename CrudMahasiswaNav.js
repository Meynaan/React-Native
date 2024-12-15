import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGear, faCirclePlus, faUserPen, faMap, faHouse } from '@fortawesome/free-solid-svg-icons'
import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Createdata from './Createdata';
import Datamahasiswa from './Listdata'
import Editdata from './Editdata'

function ProfilScreen() {
  return (
    <Profil />
  );
}
function HomeScreen() {
  return (
    <Createdata />
  );
}

function DataMahasiswaScreen() {
  return (
    < Datamahasiswa />
  );
}

function EditScreen() {
  return (
    < Editdata />
  );
}

function WebScreen() {
  return (
    <WebView
      source={{ uri: 'https://leaflet-app-dusky.vercel.app/home' }}
    />
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ProfilScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHouse} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Daftar KK" component={DataMahasiswaScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Tambah" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faCirclePlus} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen name="Edit" component={EditScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen name="Map" component={WebScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={20} />
            ),
          }}
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
}