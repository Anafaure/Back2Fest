import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ref, onValue, off, database } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [artists, setArtists] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const artistsRef = ref(database, '/artistes');
    const listener = onValue(
      artistsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const allArtists = Object.keys(data).map((key) => ({
            artistName: data[key].nom,
            imageUrl: data[key].image || 'https://via.placeholder.com/100', // Fallback placeholder if image is not available
          }));
          setArtists(allArtists);
        }
      },
      { onlyOnce: false }
    );

    return () => off(artistsRef, 'value', listener);
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view content.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Raccourcis</Text>
      <View style={styles.sosmap}>
        <Text style={styles.sos}>S.O.S</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Image
            style={styles.map}
            source={{ uri: "https://i.pinimg.com/736x/c4/aa/29/c4aa29390e06dbc542bbcd498a19546e.jpg" }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Aujourd'hui</Text>
      <Text style={styles.subtitle}>Artistes</Text>
      <ScrollView horizontal>
        {artists.map((artist, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Artist', { artistName: artist.artistName })}>
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{ uri: artist.imageUrl }}
              />
              <Text style={styles.cardText}>{artist.artistName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Activités</Text>
      <ScrollView horizontal>
        {artists.map((artist, index) => (
          <View style={styles.card} key={index}>
            <Image
              style={styles.cardImage}
              source={{ uri: artist.imageUrl }}
            />
            <Text style={styles.cardText}>{artist.artistName}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#121212',
  },
  title: {
    color: '#FDFDFD',
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    color: '#FDFDFD',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 150,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  cardText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  sos: {
    color: '#FDFDFD',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#E12020',
    padding: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sosmap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  map: {
    width: 180,
    height: 150,
    borderRadius: 10,
  },
});
