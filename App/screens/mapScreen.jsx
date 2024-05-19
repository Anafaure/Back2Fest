import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";

export default function MapScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (label) => {
    if (selectedButton === label) {
      setSelectedButton(null);
    } else {
      setSelectedButton(label);
    }
  };

  const getMapImageSource = () => {
    switch (selectedButton) {
      case "Scènes":
        return require("../assets/maps/map_scenes.png");
      case "Restauration":
        return require("../assets/maps/map_restaurant.png");
      case "Toilettes":
        return require("../assets/maps/map_toilettes.png");
      case "Poubelles":
        return require("../assets/maps/map_poubelles.png");
      case "Camping":
        return require("../assets/maps/map_camping.png");
      case "Staff":
        return require("../assets/maps/map_staff.png");
      default:
        return require("../assets/maps/map.png");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: width * 0.05,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, { fontSize: width * 0.09 }]}>Carte</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.actionButtonsContainer}
          style={styles.actionButtonsScrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <ActionButton
            label="Scènes"
            selected={selectedButton === "Scènes"}
            onPress={() => handleButtonClick("Scènes")}
          />
          <ActionButton
            label="Restauration"
            selected={selectedButton === "Restauration"}
            onPress={() => handleButtonClick("Restauration")}
          />
          <ActionButton
            label="Toilettes"
            selected={selectedButton === "Toilettes"}
            onPress={() => handleButtonClick("Toilettes")}
          />
          <ActionButton
            label="Poubelles"
            selected={selectedButton === "Poubelles"}
            onPress={() => handleButtonClick("Poubelles")}
          />
          <ActionButton
            label="Camping"
            selected={selectedButton === "Camping"}
            onPress={() => handleButtonClick("Camping")}
          />
          <ActionButton
            label="Staff"
            selected={selectedButton === "Staff"}
            onPress={() => handleButtonClick("Staff")}
          />
        </ScrollView>
        <View style={styles.mapContainer}>
          <Image
            style={{ width: width * 0.9, height: width * 0.9 }}
            source={getMapImageSource()}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.legendText, { fontSize: width * 0.05 }]}>
          Légende:
        </Text>
        <View style={styles.legend}>
          <LegendItem color="#00FAFA" label="Scènes" />
          <LegendItem color="#FF0000" label="Restaurants / bars" />
          <LegendItem color="#ADFF00" label="Poubelles" />
          <LegendItem color="#FF9900" label="Toilettes" />
          <LegendItem color="#0500FF" label="Staff" />
          <LegendItem color="#30A92D" label="Camping" />
          <LegendItem color="#803244" label="Infrastructures staff" />
        </View>
      </SafeAreaView>
    </View>
  );
}

function LegendItem({ color, label }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.legendItem, { width: "45%" }]}>
      <View
        style={[
          styles.legendIcon,
          {
            backgroundColor: color,
            width: width * 0.075,
            height: width * 0.075,
          },
        ]}
      />
      <Text style={[styles.legendLabel, { fontSize: width * 0.04 }]}>
        {label}
      </Text>
    </View>
  );
}

function ActionButton({ label, selected, onPress }) {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.actionButton,
        {
          backgroundColor: selected ? "#F72585" : "#121212",
          paddingVertical: width * 0.02,
          paddingHorizontal: width * 0.04,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          { color: selected ? "#121212" : "white", fontSize: width * 0.035 },
        ]}
        onPress={onPress}
      >
        {label}
      </Text>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  header: {
    color: "#FDFDFD",
    fontFamily: "Rubik",
    fontWeight: "600",
    marginTop: 5, // reduced marginTop
    marginBottom: 5,
    textAlign: "left",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5, // reduced marginVertical
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2, // reduced marginVertical
  },
  legendIcon: {
    borderRadius: 5,
  },
  legendLabel: {
    marginLeft: 10,
    color: "white",
    fontFamily: "Rubik",
  },
  legendText: {
    fontFamily: "Rubik",
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "left",
    color: "white",
  },
  actionButtonsContainer: {
    alignItems: "center",
  },
  actionButtonsScrollView: {
    marginTop: 5, // reduced marginTop
  },
  actionButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#F72585",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5, // reduced marginRight
  },
  buttonText: {
    fontFamily: "Sansation",
    fontWeight: "700",
  },
  mapContainer: {
    alignItems: "center",
    // marginVertical: 5,
  },
});

