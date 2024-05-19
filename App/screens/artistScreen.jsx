import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, onValue, getDatabase, remove, update } from 'firebase/database';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth'; // Import the authentication module

const ArtistScreen = () => {
    const [artist, setArtist] = useState(null);
    const [events, setEvents] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false); // State to track if the user is following the artist
    const route = useRoute();
    const navigation = useNavigation();
    const { artistName } = route.params;
    const database = getDatabase();
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    useEffect(() => {
        const artistRef = ref(database, `/artistes/${artistName}`);
        const unsubscribe = onValue(artistRef, (snapshot) => {
            if (snapshot.exists()) {
                setArtist(snapshot.val());
            } else {
                setArtist({
                    nom: 'Unknown Artist',
                    description: 'No description available.',
                    image: 'https://via.placeholder.com/150',
                    socialMedia: {}
                });
            }
        });

        return () => unsubscribe();
    }, [artistName]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsRef = ref(database, '/concert');
            onValue(eventsRef, (snapshot) => {
                const eventData = snapshot.val();
                if (eventData) {
                    const eventArray = Object.values(eventData).filter(
                        (event) => event.artiste === artistName
                    );
                    setEvents(eventArray);
                }
            });
        };

        fetchEvents();
    }, [artistName]);

    useEffect(() => {
        if (user) {
            const followRef = ref(database, `/user/${user.uid}/following/${artistName}`);
            onValue(followRef, (snapshot) => {
                setIsFollowing(snapshot.exists());
            });
        }
    }, [user, artistName]);

    const handleFollow = () => {
        if (user) {
            const followRef = ref(database, `/user/${user.uid}/following/${artistName}`);
            update(followRef, {
                artistName: artist.nom,
                followedAt: new Date().toISOString(),
            }).then(() => {
                setIsFollowing(true);
            }).catch((error) => {
                console.error("Error updating follow status: ", error);
            });
        } else {
            console.error("No user logged in");
        }
    };

    const handleUnfollow = () => {
        if (user) {
            const followRef = ref(database, `/user/${user.uid}/following/${artistName}`);
            remove(followRef).then(() => {  // Use `remove` from `firebase/database`
                setIsFollowing(false);
            }).catch((error) => {
                console.error("Error removing follow status: ", error);
            });
        } else {
            console.error("No user logged in");
        }
    };

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    if (!artist) {
        return (
            <View style={styles.container}>
                <Text>Loading artist information...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#F72585" />
                </TouchableOpacity>
                <Text style={styles.artistName}>{artist.nom}</Text>
            </View>
            <ScrollView width="100%" showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Image
                    style={styles.artistImage}
                    source={{ uri: artist.image }}
                />
                <Text style={styles.artistDescription}>{artist.description}</Text>
                <View style={styles.footer}>
                    {artist.socialMedia?.instagram && (
                        <TouchableOpacity style={styles.icon} onPress={() => openLink(artist.socialMedia.instagram)}>
                            <Entypo name="instagram" size={30} color="#F72585" />
                        </TouchableOpacity>
                    )}
                    {artist.socialMedia?.facebook && (
                        <TouchableOpacity style={styles.icon} onPress={() => openLink(artist.socialMedia.facebook)}>
                            <Entypo name="facebook" size={30} color="#F72585" />
                        </TouchableOpacity>
                    )}
                    {artist.socialMedia?.twitter && (
                        <TouchableOpacity style={styles.icon} onPress={() => openLink(artist.socialMedia.twitter)}>
                            <Entypo name="twitter" size={30} color="#F72585" />
                        </TouchableOpacity>
                    )}
                    {artist.socialMedia?.spotify && (
                        <TouchableOpacity style={styles.icon} onPress={() => openLink(artist.socialMedia.spotify)}>
                            <Entypo name="spotify" size={30} color="#F72585" />
                        </TouchableOpacity>
                    )}
                    {artist.socialMedia?.youtube && (
                        <TouchableOpacity style={styles.icon} onPress={() => openLink(artist.socialMedia.youtube)}>
                            <Entypo name="youtube" size={30} color="#F72585" />
                        </TouchableOpacity>
                    )}
                </View>
                <View>
                    {events.map((event, index) => (
                        <View key={index} style={styles.eventCard}>
                            <View style={styles.timeLine}>
                                <Text style={styles.time}>{event.heure_debut}</Text>
                                <Text style={styles.time}>|</Text>
                                <Text style={styles.time}>{event.heure_fin}</Text>
                            </View>
                            <Image source={{ uri: artist.image }} style={styles.eventImage} />
                            <View style={styles.eventDetails}>
                                <View>
                                    <Text style={styles.artist}>{event.artiste}</Text>
                                    <Text style={styles.duration}>{`${event.date}`}</Text>
                                    <Text style={styles.scene}>{`Scene ${event.scene}`}</Text>
                                </View>
                                <TouchableOpacity onPress={isFollowing ? handleUnfollow : handleFollow}>
                                    <Ionicons name={isFollowing ? "heart" : "heart-outline"} size={24} color={isFollowing ? "red" : "white"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#121212",
        height: "100%"
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
        resizeMode: 'cover',
        alignSelf: "center",
    },
    artistName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
        width: "90%",
        textAlign: "center",
        alignSelf: "center",
    },
    artistDescription: {
        fontSize: 16,
        color: "white",
        textAlign: 'justify'
    },
    header: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 20,
        marginTop: '10%',
    },
    footer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        minWidth: '90%',
    },
    timeLine: {
        paddingRight: 10,
        alignItems: 'center',
    },
    time: {
        fontSize: 16,
        color: 'grey',
    },
    eventImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    eventDetails: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    artist: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    duration: {
        fontSize: 12,
        color: 'grey',
    },
    scene: {
        fontSize: 12,
        color: 'grey',
    },
});

export default ArtistScreen;
