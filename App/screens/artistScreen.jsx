import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, onValue, getDatabase } from 'firebase/database'; // Make sure you're importing correctly based on your Firebase version
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const ArtistScreen = () => {
    const [artist, setArtist] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const { artistName } = route.params;
    const database = getDatabase(); // Adjust based on how you initialize Firebase

    useEffect(() => {
        const artistRef = ref(database, `/artistes/${artistName}`);
        // onValue now returns a function to unsubscribe
        const unsubscribe = onValue(artistRef, (snapshot) => {
            if (snapshot.exists()) {
                setArtist(snapshot.val());
            } else {
                setArtist({
                    nom: 'Unknown Artist',
                    description: 'No description available.',
                    image: 'https://via.placeholder.com/150'
                });
            }
        });

        return () => unsubscribe(); // Use the unsubscribe function for cleanup
    }, [artistName]);

    if (!artist) {
        return (
            <View style={styles.container}>
                <Text>Loading artist information...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#F72585" />
            </TouchableOpacity>
            <Text style={styles.artistName}>{artist.nom}</Text>
            </View>
            <Image
                style={styles.artistImage}
                source={{ uri: artist.image }}
            />
            <Text style={styles.artistDescription}>{artist.description}</Text>
            <View style={styles.footer}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-instagram" size={30} color="#F72585" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-facebook" size={30} color="#F72585" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-tiktok" size={30} color="#F72585" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-twitter" size={30} color="#F72585" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-spotify" size={30} color="#F72585" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="logo-youtube" size={30} color="#F72585" />
            </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor:"#121212"
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        },
    artistImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode:'cover'
    },
    artistName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"white",
        width:"90%",
        textAlign:"center",
        alignSelf:"center",
    },
    artistDescription: {
        fontSize: 16,
        color:"white",
        textAlign: 'justify'
    },
    header:{
        flexDirection:"row",
        width:"100%",
        marginBottom:20,
        marginTop:'10%',
     
    },
    footer:{
        flexDirection:"row",
        width:"100%",
        marginTop:20,
    },
    icon:{
        marginHorizontal:10,
    }
});

export default ArtistScreen;
