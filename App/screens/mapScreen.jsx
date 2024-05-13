import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function MapScreen() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (label) => {
    if (selectedButton === label) {
      // If the clicked button is already selected, deselect it
      setSelectedButton(null);
    } else {
      // Otherwise, select the clicked button
      setSelectedButton(label);
    }
  };

  return (
    <View style={{flex: 1,backgroundColor:"#121212"}}>
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Carte</Text>
      {/* Action Buttons */}
      <ScrollView horizontal contentContainerStyle={styles.actionButtonsContainer}>
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
          label="Parking"
          selected={selectedButton === "Parking"}
          onPress={() => handleButtonClick("Parking")}
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
        {/* Add other buttons similarly */}
      </ScrollView>
      <View style={styles.mapContainer}>
        <Image
          style={{ width: 400 }}
          source={require('../assets/map.png')}
        />
      </View>
      <Text style={styles.legendText}>Légende:</Text>
      <View style={styles.legend}>
 
  {/* Each LegendItem becomes a grid item */}
  <LegendItem color="#00FAFA" label="Scènes" />
  <LegendItem color="#FF0000" label="Restaurants / bars" />
  <LegendItem color="#ADFF00" label="Poubelles" />
  <LegendItem color="#FF9900" label="Toilettes" />
  <LegendItem color="#0500FF" label="Staff" />
  <LegendItem color="#FF008A" label="Parking" />
  <LegendItem color="#30A92D" label="Camping" />
  <LegendItem color="#803244" label="Infrastructures staff" />
</View>

    </SafeAreaView>
    </View>
  );
}

// Helper component for legend items
function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

// Helper component for action buttons
function ActionButton({ label, selected, onPress }) {
  return (
    <View style={[styles.actionButton, { backgroundColor: selected ? '#F72585' : '#121212' }]}>
      <Text style={[styles.buttonText, { color: selected ? '#121212' : 'white' }]} onPress={onPress}>{label}</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 36,
    color: '#FDFDFD',
    fontFamily: 'Rubik',
    fontWeight: '600',
    marginTop: 20,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    justifyContent: 'flex-start', // Align items to the start of the container
    alignItems: 'center',
    paddingHorizontal: 20, // Ensure there's padding to match the overall container padding
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,  // Maintain some space between items
    marginBottom: 10, // Add bottom margin for spacing between rows
    width: 'auto'
  },
  legendIcon: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  legendLabel: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15,
    fontFamily: 'Rubik',
  },
  legendText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Rubik',
    fontWeight: '700',
    marginBottom: 10,
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#121212',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F72585',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Sansation',
    fontWeight: '700',
  },
  mapContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});
