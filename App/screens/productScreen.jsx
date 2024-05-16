import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductScreen = () => {
  const [selectedDot, setSelectedDot] = useState(null);
  const [prices] = useState({
    "33cl": "1,50€",
    "50cl": "2,50€",
    "75cl": "4,50€",
  });

  const item = 1;
  const add_basket = () => {
    if (user) {
      const add_basket = ref(database, `user/${user.uid}/basket`);
      push(add_basket, item);
    }
  }

  const handleDotPress = (dotIndex) => {
    setSelectedDot(dotIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/Coca-Cola.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.format}>Format</Text>
        <View style={styles.dotsContainer}>
          <Dot
            onPress={() => handleDotPress(0)}
            selected={selectedDot === 0}
            text="33cl"
            price={prices["33cl"]}
          />
          <Dot
            onPress={() => handleDotPress(1)}
            selected={selectedDot === 1}
            text="50cl"
            price={prices["50cl"]}
          />
          <Dot
            onPress={() => handleDotPress(2)}
            selected={selectedDot === 2}
            text="75cl"
            price={prices["75cl"]}
          />
        </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

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
  format: {
    fontSize: 24,
    color: "#560BAD",
    marginTop: 40,
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
    marginTop: "70%", // Espacement du haut
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ProductScreen;
