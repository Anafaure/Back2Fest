import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { database } from "../config/firebase";
import { ref, get, remove, push, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

function BasketScreen() {
  const [basket, setBasket] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();

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

  const removeItem = async (itemId) => {
    const itemRef = ref(database, `user/${user.uid}/basket/${itemId}`);
    await remove(itemRef);
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== itemId));
  };

  const handlePurchase = async () => {
    const achatRef = ref(database, `user/${user.uid}/achat`);
    for (const item of basket) {
      await push(achatRef, item);
    }
    const basketRef = ref(database, `user/${user.uid}/basket`);
    await set(basketRef, {});
    setBasket([]);
    Alert.alert(
      "Merci pour votre achat",
      "Vous pouvez le mettre sur la gourde et le récupérer dans le bar restaurant de votre choix",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Echo"),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="close-circle" size={24} color="#F72585" />
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    return basket
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("€", "").replace(",", "."));
        return total + (isNaN(price) ? 0 : price);
      }, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panier</Text>
        <View style={styles.headerIcon}></View>
      </View>
      <View style={styles.card}>
        <FlatList
          data={basket}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total à payer: {calculateTotal()}€</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: basket.length === 0 ? "#ccc" : "#F72585" },
          ]}
          onPress={handlePurchase}
          disabled={basket.length === 0} // Disable button if basket is empty
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
  headerContainer: {
    marginTop: "10%",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#FDFDFD",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
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
