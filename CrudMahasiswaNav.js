import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { WebView } from 'react-native-webview';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Createdata from './Createdata';
import Datamahasiswa from './Listdata'


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

function WebScreen() {
  return (
    <WebView
      source={{ uri: 'https://github.com/Meynaan' }}

    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tambah" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Mahasiswa" component={DataMahasiswaScreen}
          options={{

            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGear} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="GitHUB" component={WebScreen}
          options={{

            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGithub} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}