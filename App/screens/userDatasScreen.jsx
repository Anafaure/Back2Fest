import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, database, ref, update,updateEmail, sendEmailVerification } from '../config/firebase';

const EditUserDataScreen = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        email: auth.currentUser?.email || '',
    });

    const handleUpdate = async () => {
        try {
            // Check if the email has changed and update it in Firebase Auth
            if (userData.email !== auth.currentUser.email) {
                await updateEmail(auth.currentUser, userData.email);
                await sendEmailVerification(auth.currentUser);
                alert('A verification email has been sent to your new email address. Please verify it to complete the update.');
                return; // Return early to stop further execution until email is verified
            }
    
            // Update the other details in the Firebase Realtime Database
            const userRef = ref(database, `user/${auth.currentUser.uid}`);
            await update(userRef, {
                firstname: userData.firstname,
                lastname: userData.lastname,
                birthdate: userData.birthdate,
            });
    
            alert('User data updated successfully!');
            navigation.goBack();
        } catch (error) {
            alert('Failed to update user data: ' + error.message);
        }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && user.emailVerified) {
                // Proceed with enabling full user functionality or re-enabling the update functionality
            }
        });
    
        return () => unsubscribe(); // Cleanup the subscription
    }, []);
    

    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Informations personnelles</Text>
                </View>
                
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        value={userData.firstname}
                        placeholderTextColor="grey"
                        onChangeText={(text) => setUserData({...userData, firstname: text})}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        placeholderTextColor="grey"
                        value={userData.lastname}
                        onChangeText={(text) => setUserData({...userData, lastname: text})}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Date de naissance</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Date de naissance"
                        placeholderTextColor="grey"
                        value={userData.birthdate}
                        onChangeText={(text) => setUserData({...userData, birthdate: text})}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Adresse e-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse e-mail"
                        placeholderTextColor="grey"
                        value={userData.email}
                        onChangeText={(text) => setUserData({...userData, email: text})}
                    />
                </View>

                <Button
                    title="Mettre à jour"
                    color="#F72585"
                    onPress={handleUpdate}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#FDFDFD',
        marginLeft: 10,
    },
    backButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
    },
    input: {
        backgroundColor: '#333',
        color: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 5,
        borderRadius: 5,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#FFF',
        marginBottom: 5,
        fontWeight: '500',
    },
});

export default EditUserDataScreen;
