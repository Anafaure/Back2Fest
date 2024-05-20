import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNfcManager, writeNfcData, generateRandomData } from '../hooks/useNfcManager';  // Adjust the path as needed

const NfcScreen = () => {
  useNfcManager();  // Initialize NFC Manager when the screen mounts

  const [randomData, setRandomData] = useState(generateRandomData());

  const handleWriteNfc = async () => {
    await writeNfcData(randomData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NFC Writer</Text>
      <Text style={styles.data}>Name: {randomData.name}</Text>
      <Text style={styles.data}>Age: {randomData.age}</Text>
      <Text style={styles.data}>Tickets: {randomData.tickets}</Text>
      <Button title="Write to NFC" onPress={handleWriteNfc} />
      <Button title="Generate New Data" onPress={() => setRandomData(generateRandomData())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default NfcScreen;
