import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const items = [
  {
    "name": "Coca-Cola (Canette)",
    "price": "1.50€",
    "image": require("../assets/Coca-Cola.png"),
    "category": "Boissons",
  },
  {
    "name": "Lays (Chips)",
    "price": "4€",
    "image": require("../assets/chips.png"),
    "category": "Snacks",
  },
  {
    "name": "Sandwich",
    "price": "7€",
    "image": require("../assets/sandwich.png"),
    "category": "Sandwichs",
  },
  {
    "name": "Desperados (Bière)",
    "price": "2€",
    "image": require("../assets/biere.png"),
    "category": "Alcools",
  },
  {
    "name": "Frites",
    "price": "2€",
    "image": require("../assets/frites.png"),
    "category": "Snacks",
  },
  {
    "name": "Burger",
    "price": "4€",
    "image": require("../assets/burger.png"),
    "category": "Sandwichs",
  },
];

const ShopScreen = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);

  const navigation = useNavigation();

  const handleButtonClick = (label) => {
    if (selectedButton === label) {
      // Deselect the currently selected filter
      setSelectedButton(null);
      setFilteredItems(items); // Show all items again
    } else {
      // Select the clicked filter and apply it
      setSelectedButton(label);
      setFilteredItems(items.filter((item) => item.category === label));
    }
  };

  const renderItems = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("Product", { item })}
    >
      <View>
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text style={styles.itemText}>
          {item.name} - {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boutique</Text>
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
              <Ionicons name="basket-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.actionButtonsContainer}
        >
          <ActionButton
            label="Boissons"
            selected={selectedButton === "Boissons"}
            onPress={() => handleButtonClick("Boissons")}
          />
          <ActionButton
            label="Alcools"
            selected={selectedButton === "Alcools"}
            onPress={() => handleButtonClick("Alcools")}
          />
          <ActionButton
            label="Sandwichs"
            selected={selectedButton === "Sandwichs"}
            onPress={() => handleButtonClick("Sandwichs")}
          />
          <ActionButton
            label="Snacks"
            selected={selectedButton === "Snacks"}
            onPress={() => handleButtonClick("Snacks")}
          />
        </ScrollView>
        <FlatList
          style={styles.shop}
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          ListEmptyComponent={
            <Text style={styles.noInfoText}>Aucun achat disponible</Text>
          }
          numColumns={2}
          contentContainerStyle={styles.gainList}
        />
      </SafeAreaView>
    </View>
  );
};

function ActionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        { backgroundColor: selected ? "#F72585" : "#121212" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.buttonText, { color: selected ? "#121212" : "white" }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    padding: 20,
    margin: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#121212",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#F72585",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  headerContainer: {
    marginTop: "10%",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#FDFDFD",
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
  itemCard: {
    flexDirection: "column",
    width: "45%",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  itemText: {
    color: "#000",
    fontSize: 18,
    marginTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  shop: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    alignContent: "center",
  },
});

export default ShopScreen;
