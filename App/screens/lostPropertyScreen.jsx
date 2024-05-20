import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { database, ref, onValue } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';

const LostPropertyScreen = () => {
    const [lostItems, setLostItems] = useState([]);
    const navigation = useNavigation();
    const { user } = useAuth();

    useEffect(() => {
        const itemsRef = ref(database, 'perdu');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const items = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setLostItems(items);
            } else {
                setLostItems([]);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Objets trouvés</Text>
            </View>
            <ScrollView style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddLostItem')}
                >
                    <Text style={styles.addButtonText}>Ajouter un objet</Text>
                </TouchableOpacity>
                <View style={styles.grid}>
                    {lostItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => navigation.navigate('LostItemDetail', { itemId: item.id })}
                        >
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    headerContainer: {
        marginTop: '10%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#FDFDFD',
    },
    backButton: {
        marginRight: 10,
        padding: 8,
    },
    contentContainer: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#F72585',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        width: '48%',
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
});

export default LostPropertyScreen;
