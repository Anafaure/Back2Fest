import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { database, ref, onValue } from '../config/firebase';

const LostItemDetailScreen = () => {
    const [item, setItem] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { itemId } = route.params;

    useEffect(() => {
        const itemRef = ref(database, `perdu/${itemId}`);
        onValue(itemRef, (snapshot) => {
            const data = snapshot.val();
            setItem(data);
        });
    }, [itemId]);

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Détails de l'objet</Text>
            </View>
            <ScrollView style={styles.contentContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemTitle}>Lieu de récupération : {item.lieu}</Text>
                <Text style={styles.itemDescription}>Description : {item.description}</Text>
                <Text style={styles.itemTime}>Heure de mise en ligne : {item.heure}</Text>
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
    itemImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FDFDFD',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 16,
        color: '#FDFDFD',
        marginBottom: 8,
    },
    itemTime: {
        fontSize: 16,
        color: '#FDFDFD',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FDFDFD',
    },
});

export default LostItemDetailScreen;
