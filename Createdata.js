import React, {useState} from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';

const Createdata = () => {
    const jsonUrl = 'http://192.168.129.53:3000/mahasiswa';
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [noKK, setnoKK] = useState('');
    const [JAK, setJAK] = useState('');
    const [RT, setRT] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');

    const submit = () => {
        const data = {
          first_name: first_name,
          last_name: last_name,
          noKK: noKK,
          JAK: JAK,
          RT: RT,
          latitude: latitude,
          longitude: longitude,
        };
        fetch('http://192.168.129.53:3000/mahasiswa', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          alert('Data tersimpan');
          setFirstName('');
          setLastName('');
          setnoKK('');
          setJAK('');
          setRT('');
          setlatitude('');
          setlongitude('');
        })
      }
     
     
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Tambah Data KK</Text>
                <ScrollView style={styles.form}>
                    <TextInput style={styles.input} placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
                    <TextInput style={styles.input} placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
                    <TextInput style={styles.input} placeholder="No KK" value={noKK} onChangeText={(value) => setnoKK(value)} />
                    <TextInput style={styles.input} placeholder="Jumlah Anggota Keluarga" value={JAK} onChangeText={(value) => setJAK(value)} />
                    <TextInput style={styles.input} placeholder="RT" value={RT} onChangeText={(value) => setRT(value)} />
                    <TextInput style={styles.input} placeholder="Latitude" value={latitude} onChangeText={(value) => setlatitude(value)} />
                    <TextInput style={styles.input} placeholder="Longitude" value={longitude} onChangeText={(value) => setlongitude(value)} />
                    <Button title="Simpan" style={styles.button} onPress={submit} color={'#AA5486'} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Createdata


const styles = StyleSheet.create({
    title: {
      paddingVertical: 12,
      backgroundColor: '#AB4459',
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    form: {
      padding: 10,
      marginBottom: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#694F8E',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
      },
      button: {
        marginVertical: 10,
        backgroundColor: '#694F8E',
        color : '#694F8E',
        
      }
     })
     