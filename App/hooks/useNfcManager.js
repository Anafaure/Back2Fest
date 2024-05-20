import { useEffect } from 'react';
import { Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// Hook to initialize NFC Manager
export const useNfcManager = () => {
  useEffect(() => {
    const initializeNfc = async () => {
      try {
        await NfcManager.start();
      } catch (error) {
        console.warn('Failed to start NFC Manager:', error);
      }
    };

    initializeNfc();

    return () => {
      NfcManager.setEventListener(NfcTech.Ndef, null);
    };
  }, []);
};

// Function to write data to NFC tag
export const writeNfcData = async (data) => {
  try {
    // Request NFC technology
    await NfcManager.requestTechnology(NfcTech.Ndef);

    const message = [
      Ndef.textRecord(`Name: ${data.name}`),
      Ndef.textRecord(`Age: ${data.age}`),
      Ndef.textRecord(`Tickets: ${data.tickets}`),
    ];

    // Write the message to NFC tag
    await NfcManager.ndefHandler.writeNdefMessage(message);

    Alert.alert('Success', 'Data written to NFC tag successfully!');
  } catch (ex) {
    console.warn(ex);
    Alert.alert('Error', 'Failed to write data to NFC tag.');
  } finally {
    // Close the NFC manager
    NfcManager.cancelTechnologyRequest();
  }
};

// Function to generate random data
export const generateRandomData = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = Math.floor(Math.random() * 60) + 18;
  const randomTickets = Math.floor(Math.random() * 10) + 1;

  return {
    name: randomName,
    age: randomAge,
    tickets: randomTickets,
  };
};
