import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
    const jsonUrl = 'http://192.168.129.53:3000/mahasiswa';
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    function deleteData(id) {
        fetch(jsonUrl + '/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                alert('Data terhapus');
                refreshPage();
            });
    }

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const filteredData = dataUser.filter((item) =>
                (item.first_name + ' ' + item.last_name).toLowerCase().includes(text.toLowerCase())
            );
            setDataUser(filteredData);
        } else {
            refreshPage();
        }
    };

    return (
        <SafeAreaView>
            <Text style={styles.title}>Daftar KK</Text>
            <View style={styles.searchContainer}>
            
                <TextInput
                    style={styles.searchInput}
                    placeholder="Cari nama..."
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>

            {isLoading ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.cardtitle}>Loading...</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        style={{ marginBottom: 0 }}
                        data={dataUser}
                        onRefresh={() => refreshPage()}
                        refreshing={refresh}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            'google.navigation:q=' +
                                            item.latitude +
                                            ',' +
                                            item.longitude,
                                        )
                                    }>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                size={50}
                                                color={{
                                                    '001': '#CB9DF0',
                                                    '002': '#FFB0B0',
                                                    '003': '#FC8F54',
                                                    '004': '#8D0B41',
                                                }[item.RT] || 'gray'}
                                            />
                                        </View>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text style={styles.cardtitle}>
                                                {item.first_name} {item.last_name}
                                            </Text>
                                            <Text>{item.RT}</Text>
                                            <Text>{item.email}</Text>
                                            <Text>
                                                {item.latitude}, {item.longitude}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.button}>
                                    <Button 
                                        title="Hapus"
                                        onPress={() =>
                                            Alert.alert(
                                                'Hapus data',
                                                'Yakin akan menghapus data ini?',
                                                [
                                                    {
                                                        text: 'Tidak',
                                                        onPress: () => console.log('button tidak'),
                                                    },
                                                    { text: 'Ya', onPress: () => deleteData(item.id) },
                                                ],
                                            )
                                        }
                                        color={'#AA5486'}
                                    />
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Listdata;

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: '#694F8E',
    },
    title: {
        paddingVertical: 12,
        backgroundColor: '#AB4459',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
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
        marginVertical: 7,
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
        borderBlockColor: '#FFE6E6',
    }
});
