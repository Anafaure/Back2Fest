import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { database } from "../config/firebase";
import { ref, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";


function BasketScreen() {
  const [basket, setBasket] = useState([]);
  const { user } = useAuth();

  const get_items = async () => {
    if (user && user.uid) {
      const basket_ref = ref(database, `user/${user.uid}/basket`);
      const basket_snapshot = await get(basket_ref);
      if (basket_snapshot.exists()) {
        const basketData = basket_snapshot.val();
        const basketArray = Object.keys(basketData).map((key) => ({
          id: key,
          ...basketData[key],
        }));
        setBasket(basketArray);
        console.log("Fetched basket:", basketArray); // Log fetched data
      }
    } else {
      console.log("User is not authenticated"); // Log when user is not authenticated
    }
  };

  useEffect(() => {
    get_items();
  }, [user]);

  useEffect(() => {
    console.log("Basket updated:", basket);
  }, [basket]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  const calculateTotal = () => {
    return basket
      .reduce((total, item) => {
        // Extract numeric value from the price string
        const price = parseFloat(item.price.replace("€", "").replace(",", "."));
        return total + (isNaN(price) ? 0 : price);
      }, 0)
      .toFixed(2);
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          data={basket}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total à payer: {calculateTotal()}€
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Payer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400, // Limite la largeur de la carte pour une meilleure lisibilité
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  itemName: {
    color: "#000",
  },
  itemPrice: {
    color: "#000",
  },
  totalContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#F72585",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FDFDFD",
  },
});

export default BasketScreen;
