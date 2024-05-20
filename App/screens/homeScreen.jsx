import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { ref, onValue, off, database } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [artists, setArtists] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const artistsRef = ref(database, '/artistes');
    const listener = onValue(
      artistsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const allArtists = Object.keys(data).map((key) => ({
            artistName: data[key].nom,
            imageUrl: data[key].image || 'https://via.placeholder.com/100',
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

  const responsiveStyles = createResponsiveStyles(width, height);

  const handleSOSPress = () => {
    Alert.alert(
      "Êtes-vous sûr de vouloir contacter les secours ?",
      "",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            Alert.alert(
              "Les secours sont en chemin",
              "Veuillez rester là où vous êtes. Arrivée dans 5 minutes.",
              [
                { text: "Fermer" }
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={responsiveStyles.scrollContainer} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
        <Text style={responsiveStyles.title}>Raccourcis</Text>
        <View style={responsiveStyles.sosmap}>
          <View style={responsiveStyles.sosContainer}>
            <TouchableOpacity onPress={handleSOSPress}>
              <Text style={responsiveStyles.sos}>S.O.S</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Image
              style={responsiveStyles.map}
              source={{ uri: "https://i.pinimg.com/736x/c4/aa/29/c4aa29390e06dbc542bbcd498a19546e.jpg" }}
            />
          </TouchableOpacity>
        </View>
        <Text style={responsiveStyles.title}>Aujourd'hui</Text>
        <Text style={responsiveStyles.subtitle}>Artistes</Text>
        <ScrollView horizontal showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          {artists.map((artist, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Artist', { artistName: artist.artistName })}>
              <View style={responsiveStyles.card}>
                <Image
                  style={responsiveStyles.cardImage}
                  source={{ uri: artist.imageUrl }}
                />
                <Text style={responsiveStyles.cardText} numberOfLines={1} ellipsizeMode="tail">{artist.artistName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={responsiveStyles.subtitle}>Activités</Text>
        <ScrollView horizontal showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
          {artists.map((artist, index) => (
            <TouchableOpacity key={index}>
              <View style={responsiveStyles.card}>
                <Image
                  style={responsiveStyles.cardImage}
                  source={{ uri: artist.imageUrl }}
                />
                <Text style={responsiveStyles.cardText} numberOfLines={1} ellipsizeMode="tail">{artist.artistName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const createResponsiveStyles = (width, height) => StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.03,
    backgroundColor: '#121212',
  },
  title: {
    color: '#FDFDFD',
    fontSize: width * 0.09,
    fontWeight: '600',
    marginBottom: height * 0.01,
    marginTop: height * 0.05,
  },
  subtitle: {
    color: '#FDFDFD',
    fontSize: width * 0.06,
    fontWeight: '600',
    marginBottom: height * 0.01,
  },
  card: {
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    padding: width * 0.025,
    alignItems: 'center',
    width: width * 0.4,
    justifyContent: 'center',
    marginHorizontal: width * 0.01,
    marginBottom: height * 0.02,
    height: height * 0.20,
  },
  cardText: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cardImage: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: height * 0.01,
  },
  sosContainer: {
    width: width * 0.40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E12020',
    padding: width * 0.06,
    borderRadius: 10,
    marginRight: width * 0.08,
  },
  sos: {
    color: '#FDFDFD',
    fontSize: width * 0.1,
    fontWeight: '700',
    textAlign: 'center',
  },
  sosmap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  map: {
    width: width * 0.40,
    height: height * 0.18,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
