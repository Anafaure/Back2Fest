import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ref, push } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
import { database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

function add_basket(item, selectedFormat, navigation, user) {
  if (user) {
    const add_basket = ref(database, `user/${user.uid}/basket`);
    const itemToAdd = {
      ...item,
      selectedFormat: selectedFormat,
      price: item.price[selectedFormat]
    };
    push(add_basket, itemToAdd);
    navigation.goBack();
  }
}

function ProductScreen({ route, navigation }) {
  const { user } = useAuth();
  const { item } = route.params;
  const [selectedDot, setSelectedDot] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleDotPress = (dotIndex, format) => {
    setSelectedDot(dotIndex);
    setSelectedFormat(format);
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
        <Text style={styles.headerTitle}>Détails du produit</Text>
        <View style={styles.headerIcon}></View>
      </View>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.dotsContainer}>
          {Object.keys(item.price).map((format, index) => (
            <Dot
              key={index}
              onPress={() => handleDotPress(index, format)}
              selected={selectedDot === index}
              text={format}
              price={item.price[format]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => add_basket(item, selectedFormat, navigation, user)}
          disabled={selectedDot === null} // Disable button if no format is selected
        >
          <Text style={styles.buttonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Dot = ({ onPress, selected, text, price }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.dotContainer}>
      <View style={[styles.dot, selected && styles.selectedDot]} />
      <View style={styles.dotContent}>
        <Text style={styles.dotText}>{text}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fond noir
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#FDFDFD", // Fond blanc pour la carte
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 500, // Ajouté pour accommoder les pastilles
  },
  imageContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: 200,
    height: 100,
  },
  itemName: {
    fontSize: 24,
    color: "#560BAD",
    marginTop: 20,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15, // Pour rendre le cercle
    backgroundColor: "transparent", // Fond transparent
    borderWidth: 2,
    borderColor: "#F72585", // Bordure rose
  },
  selectedDot: {
    backgroundColor: "#F72585", // Fond rose lorsque sélectionné
  },
  dotContent: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 5, // Espacement entre la pastille et le texte
  },
  dotText: {
    color: "#F72585", // Couleur du texte
    fontSize: 12, // Taille de la police
    fontWeight: "bold", // Poids de la police
  },
  priceText: {
    color: "#F72585", // Couleur du texte
    fontSize: 10, // Taille de la police
  },
  button: {
    backgroundColor: "#F72585", // Fond rose pour le bouton
    color: "#FDFDFD", // Texte blanc
    padding: 10, // Espacement interne
    borderRadius: 5, // Coins arrondis
    marginTop: "auto", // Espacement du haut
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FDFDFD",
    fontSize: 18,
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
});

export default ProductScreen;
