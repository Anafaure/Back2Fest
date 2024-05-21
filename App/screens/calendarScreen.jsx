import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ref, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from "../config/firebase";

const EventApp = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("05/07/2024");
  const [followingArtists, setFollowingArtists] = useState({});

  const auth = getAuth();
  const user = auth.currentUser;

  // Helper function to fetch the artist image
  const fetchArtistImage = async (artistName) => {
    return new Promise((resolve) => {
      const artistRef = ref(database, `/artistes/${artistName}`);
      onValue(
        artistRef,
        (snapshot) => {
          const artistData = snapshot.val();
          resolve(artistData?.image || "https://via.placeholder.com/69x69");
        },
        {
          onlyOnce: true, // Stop listening after receiving the data
        }
      );
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = ref(database, "/concert");
        const snapshot = await new Promise((resolve) =>
          onValue(eventsRef, resolve, { onlyOnce: true })
        );

        const eventData = snapshot.val();
        if (eventData) {
          let eventArray = Object.values(eventData);

          // Filter events by selected date
          eventArray = eventArray.filter(
            (event) => event.date === selectedDate
          );

          // Sort filtered events by start time
          eventArray.sort((a, b) => {
            const timeA = a.heure_debut.split(":").map(Number);
            const timeB = b.heure_debut.split(":").map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
          });

          // Fetch and assign artist images for each event
          const updatedEvents = await Promise.all(
            eventArray.map(async (event) => {
              const artistImage = await fetchArtistImage(event.artiste);
              return { ...event, image: artistImage };
            })
          );

          setEvents(updatedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  useEffect(() => {
    if (user) {
      const followRef = ref(database, `/user/${user.uid}/following`);
      onValue(followRef, (snapshot) => {
        const followingData = snapshot.val() || {};
        setFollowingArtists(followingData);
      });
    }
  }, [user]);

  const handleFollow = (artistName, artistNom) => {
    if (user) {
      const followRef = ref(
        database,
        `/user/${user.uid}/following/${artistName}`
      );
      update(followRef, {
        artistName: artistNom,
        followedAt: new Date().toISOString(),
      })
        .then(() => {
          setFollowingArtists((prev) => ({
            ...prev,
            [artistName]: {
              artistName: artistNom,
              followedAt: new Date().toISOString(),
            },
          }));
        })
        .catch((error) => {
          console.error("Error updating follow status: ", error);
        });
    } else {
      console.error("No user logged in");
    }
  };

  const handleUnfollow = (artistName) => {
    if (user) {
      const followRef = ref(
        database,
        `/user/${user.uid}/following/${artistName}`
      );
      remove(followRef)
        .then(() => {
          setFollowingArtists((prev) => {
            const updated = { ...prev };
            delete updated[artistName];
            return updated;
          });
        })
        .catch((error) => {
          console.error("Error removing follow status: ", error);
        });
    } else {
      console.error("No user logged in");
    }
  };

  // Function to determine the scene text color
  const getSceneTextColor = (scene) => {
    switch (scene) {
      case "1":
        return { color: "#560BAD" };
        case "2":
          return { color: "#F72585" };
      default:
        return { color: "grey" };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.dateSelector}>
            {[
              ["05/07/2024", "5", "Jeu"],
              ["06/07/2024", "6", "Ven"],
              ["07/07/2024", "7", "Sam"],
            ].map((date) => (
              <TouchableOpacity
                key={date[0]}
                style={styles.dateBox}
                onPress={() => setSelectedDate(date[0])}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date[0] && { color: "#F72585" },
                  ]}
                >
                  {date[1]}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date[0] && { color: "#F72585" },
                  ]}
                >
                  {date[2]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.headerText}>Programme</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
        {events.map((event, index) => (
          <View key={index} style={styles.eventCard}>
            <View style={styles.timeLine}>
              <Text style={styles.time}>{event.heure_debut}</Text>
              <Text style={styles.time}>|</Text>
              <Text style={styles.time}>{event.heure_fin}</Text>
            </View>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
              <View>
                <Text style={styles.artist}>{event.artiste}</Text>
                <Text
                  style={styles.duration}
                >{`${event.heure_debut} - ${event.heure_fin}`}</Text>
                <Text style={[styles.scene, getSceneTextColor(event.scene)]}>
                  {`Scene ${event.scene}`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const isFollowing = followingArtists[event.artiste];
                  if (isFollowing) {
                    handleUnfollow(event.artiste);
                  } else {
                    handleFollow(event.artiste, event.artiste);
                  }
                }}
              >
                <Ionicons
                  name={
                    followingArtists[event.artiste] ? "heart" : "heart-outline"
                  }
                  size={24}
                  color={followingArtists[event.artiste] ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  dateBox: {
    padding: 10,
    backgroundColor: "#121212",
    alignItems: "center",
    borderRadius: 10,
  },
  dateText: {
    color: "white",
    fontSize: 25,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  timeLine: {
    paddingRight: 10,
    alignItems: "center",
  },
  time: {
    fontSize: 16,
    color: "grey",
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  eventDetails: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  artist: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 12,
    color: "grey",
  },
  scene: {
    fontSize: 12,
    // Default color, will be overridden by getSceneTextColor
  },
});

export default EventApp;
