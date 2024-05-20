import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { ref, onValue, remove } from 'firebase/database';
import { database } from "../config/firebase";

const FavouriteArtistScreen = () => {
    const [loading, setLoading] = useState(true);
    const [artists, setArtists] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
            const userFollowingRef = ref(database, `user/${user.uid}/following`);
            onValue(userFollowingRef, async (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const artistNames = Object.keys(data);
                    const artistData = await Promise.all(artistNames.map(async (key) => {
                        const artistName = data[key].artistName;
                        const artistRef = ref(database, `artistes/${artistName}`);
                        const artistSnapshot = await new Promise((resolve) => {
                            onValue(artistRef, (snap) => resolve(snap), { onlyOnce: true });
                        });
                        const artistInfo = artistSnapshot.val();
                        return {
                            id: key,
                            artistName: artistInfo.nom,
                            imageUrl: artistInfo.image || 'https://via.placeholder.com/100',
                        };
                    }));
                    setArtists(artistData);
                } else {
                    setArtists([]);
                }
                setLoading(false);
            }, { onlyOnce: true });
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleUnfollow = (artistId) => {
        if (user) {
            const userFollowingRef = ref(database, `user/${user.uid}/following/${artistId}`);
            remove(userFollowingRef)
                .then(() => {
                    setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== artistId));
                })
                .catch((error) => {
                    console.error("Error removing follow status: ", error);
                });
        } else {
            console.error("No user logged in");
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FDFDFD" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes artistes préférés</Text>
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {artists.length > 0 ? (
                    artists.map((artist) => (
                        <View key={artist.id} style={styles.card}>
                            <TouchableOpacity
                                style={styles.cardContent}
                                onPress={() => navigation.navigate('Artist', { artistName: artist.artistName })}
                            >
                                <Image
                                    style={styles.cardImage}
                                    source={{ uri: artist.imageUrl }}
                                />
                                <Text style={styles.cardText}>{artist.artistName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.heartIcon} onPress={() => handleUnfollow(artist.id)}>
                                <Ionicons name="heart" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noArtistsText}>Aucun artiste suivi.</Text>
                )}
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
        width: '80%',
    },
    backButton: {
        marginRight: 10,
        padding: 8,
    },
    contentContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FDFDFD',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginLeft: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    noArtistsText: {
        color: '#FDFDFD',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    heartIcon: {
        padding: 8,
    },
});

export default FavouriteArtistScreen;
