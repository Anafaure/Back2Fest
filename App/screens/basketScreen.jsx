import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { database } from "../config/firebase";
import { push, getDatabase, ref, get } from "firebase/database";

function BasketScreen() {
    const [basket, setBasket] = useState([]);
    const { user } = useAuth();
    const get_items = async () => {
        const basket_ref = ref(database, `user/${user.uid}/basket`);
    const basket_snapshot = await get(basket_ref);
    if (basket_snapshot.exists()) {
      setBasket(basket_snapshot.val());
      console.log(basket_snapshot.val());
    }
  };
  useEffect(() => {
      get_items();
        console.log(basket);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>{basket.name}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Payer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fond noir
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FDFDFD", // Fond blanc pour la carte
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 500, // Ajouté pour accommoder les pastilles
  },
  button: {
    backgroundColor: "#F72585", // Fond rose pour le bouton
    color: "#FDFDFD", // Texte blanc
    padding: 10, // Espacement interne
    borderRadius: 5, // Coins arrondis
    marginTop: "70%", // Espacement du haut
    borderRadius: 10,
    alignItems: "center",
  },
});

export default BasketScreen;
