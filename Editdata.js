import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGraduationCap, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'

const Createdata = () => {
    const jsonUrl = 'http://192.168.129.53:3000/mahasiswa';
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [noKK, setnoKK] = useState('');
    const [JAK, setJAK] = useState('');
    const [RT, setRT] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');

    const [selectedUser, setSelectedUser] = useState({});

    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setDataUser(json)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setDataUser(json)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const selectItem = (item) => {
        setSelectedUser(item);
        setFirstName(item.first_name);
        setLastName(item.last_name);
        setnoKK(item.noKK);
        setJAK(item.JAK);
        setRT(item.RT);
        setlatitude(item.latitude);
        setlongitude(item.longitude);
    }

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
        fetch(`http://192.168.129.53:3000/mahasiswa/${selectedUser.id}`, {
            method: 'PATCH',
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
                refreshPage();
                FlatList.refresh();
            })
    }

    return (
        <SafeAreaView>
            <View>
            <Text style={styles.title}>Edit Data KK</Text>
                {isLoading ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.cardtitle}>Loading...</Text>
                    </View>
                ) : (
                    
                    <View>
                        <ScrollView style={styles.form}>
                        <View>
                            
                            <View style={styles.form}>
                                <TextInput style={styles.input} placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
                                <TextInput style={styles.input} placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
                                <TextInput style={styles.input} placeholder="No KK" value={noKK} onChangeText={(value) => setnoKK(value)} />
                                <TextInput style={styles.input} placeholder="Jumlah Anggota Keluarga" value={JAK} onChangeText={(value) => setJAK(value)} />
                                <TextInput style={styles.input} placeholder="RT" value={RT} onChangeText={(value) => setRT(value)} />
                                
                                <Button title="Edit" style={styles.button} onPress={submit} color={'#AA5486'} />
                            </View>
                        </View>
                        <View style={styles.devider}></View>
                        
                            <FlatList
                                style={{ marginBottom: 10 }}
                                data={dataUser}
                                onRefresh={() => { refreshPage() }}
                                refreshing={refresh}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity onPress={() => selectItem(item)}>
                                            <View style={styles.card}>
                                                <View style={styles.avatar}>
                                                    <FontAwesomeIcon icon={faUser} size={30}
                                                        color={{
                                                            '001': '#CB9DF0',
                                                            '002': '#FFB0B0',
                                                            '003': '#FC8F54',
                                                            '004': '#8D0B41',
                                                        }[item.RT] || 'gray'} />
                                                </View>
                                                <View>
                                                    <Text style={styles.cardtitle}>{item.first_name} {item.last__name}</Text>

                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </ScrollView>
                    </View>
                )}
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
        marginBottom: 20,
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
        color: '#694F8E',
        borderRadius: 10,
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        alignItems: 'flex-start'
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFE6E6',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    }
})
