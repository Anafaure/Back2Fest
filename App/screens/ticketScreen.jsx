import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you've installed `react-native-vector-icons`
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { useAuth } from '../hooks/useAuth';
import { database, ref, onValue } from '../config/firebase';

function TicketScreen() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `user/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserInfo(data || {});
        setLoading(false);
      }, { onlyOnce: true });
    } else {
      setLoading(false);
      setUserInfo({});
    }
  }, [user]);

  if (loading) {
    return <Text style={styles.loading}>Chargement...</Text>;
  }

  const qrData = JSON.stringify({
    nom: userInfo.nom || 'N/A',
    prenom: userInfo.prenom || 'N/A',
    numeroBillet: userInfo.numeroBillet || 'N/A',
    age: userInfo.age || 'N/A',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Billet</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
  <Ionicons name="settings-outline" size={24} color="white" />
</TouchableOpacity>


      </View>
      <View style={styles.ticketContainer}>
        <Text style={styles.greeting}>Bonjour, {userInfo.prenom || 'Prénom'} {userInfo.nom || 'Nom'}</Text>
        <View style={styles.qrContainer}>
          <QRCode
            value={qrData}
            size={220}
            color="white"
            backgroundColor="transparent"
          />
        </View>
        <Text style={styles.passType}>Pass 2 jours</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '600',
  },
  ticketContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    color: 'white',
    fontSize: 32,
    marginBottom: 30,
  },
  qrContainer: {
    marginBottom: 30,
    marginTop: 70,
  },
  passType: {
    color: 'white',
    fontSize: 20,
  },
  loading: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default TicketScreen;
