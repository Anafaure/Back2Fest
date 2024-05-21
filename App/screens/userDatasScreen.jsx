import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, database, ref, update, sendPasswordResetEmail, verifyBeforeUpdateEmail } from '../config/firebase';

const { height, width } = Dimensions.get('window');

const isValidEuropeanDate = (dateString) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31) return false;
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) return false;
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (day > (isLeap ? 29 : 28)) return false;
    }

    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - year;
    if (birthDate > today || age > 100) return false;

    return true;
}

const calculateAge = (birthdate) => {
    const [day, month, year] = birthdate.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const EditUserDataScreen = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        email: auth.currentUser?.email || '',
    });

    const [newEmail, setNewEmail] = useState('');

    const handleUpdate = async () => {
        try {
            // Update email if a new one is provided
            if (newEmail !== '') {
                await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
                await sendEmailVerification(auth.currentUser);
                Alert.alert('Email de vérification envoyé', 'Un email de vérification a été envoyé à votre nouvelle adresse. Veuillez le vérifier pour compléter la mise à jour.');
            }

            // Update other details if they are not empty
            const updates = {};
            if (userData.firstname !== '') updates.prenom = userData.firstname;
            if (userData.lastname !== '') updates.nom = userData.lastname;
            if (userData.birthdate !== '') {
                if (!isValidEuropeanDate(userData.birthdate)) {
                    Alert.alert('Erreur', 'La date de naissance n\'est pas valide.');
                    return;
                }
                updates.dateNaissance = userData.birthdate;
                updates.age = calculateAge(userData.birthdate);
            }

            if (Object.keys(updates).length > 0) {
                const userRef = ref(database, `user/${auth.currentUser.uid}`);
                await update(userRef, updates);
                Alert.alert('Succès', 'Les informations utilisateur ont été mises à jour avec succès !');
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert('Échec de la mise à jour', `Échec de la mise à jour des informations utilisateur : ${error.message}`);
        }
    };

    const handleChangePassword = async () => {
        try {
            await sendPasswordResetEmail(auth, userData.email);
            Alert.alert('Email de réinitialisation envoyé', 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse. Veuillez vérifier votre email pour réinitialiser votre mot de passe.');
        } catch (error) {
            Alert.alert('Erreur', `Échec de l'envoi de l'email de réinitialisation de mot de passe : ${error.message}`);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserData(prevUserData => ({ ...prevUserData, email: user.email }));
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Informations personnelles</Text>
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Prénom</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            value={userData.firstname}
                            placeholderTextColor="grey"
                            onChangeText={(text) => setUserData({ ...userData, firstname: text })}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Nom</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            placeholderTextColor="grey"
                            value={userData.lastname}
                            onChangeText={(text) => setUserData({ ...userData, lastname: text })}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Date de naissance</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Date de naissance"
                            placeholderTextColor="grey"
                            value={userData.birthdate}
                            onChangeText={(text) => setUserData({ ...userData, birthdate: text })}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Nouvelle adresse e-mail</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={userData.email}
                            placeholderTextColor="grey"
                            value={newEmail}
                            onChangeText={(text) => setNewEmail(text)}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={handleChangePassword}>
                    <Text style={styles.linkText}>Cliquer ici pour changer votre mot de passe</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateText}>Mettre à jour</Text>
                </TouchableOpacity>
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
    inputWrapper: {
        marginTop: height * 0.01,
        marginBottom: height * 0.02,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        backgroundColor: "#f3f3f3",
        marginBottom: height * 0.02,
        width: "100%",
    },
    icon: {
        padding: width * 0.02,
    },
    input: {
        flex: 1,
        paddingTop: height * 0.01,
        paddingRight: width * 0.02,
        paddingBottom: height * 0.01,
        paddingLeft: 0,
        backgroundColor: "#f3f3f3",
        color: "#424242",
    },
    emailText: {
        flex: 1,
        paddingTop: height * 0.01,
        paddingRight: width * 0.02,
        paddingBottom: height * 0.01,
        paddingLeft: 0,
        backgroundColor: "#f3f3f3",
        color: "#424242",
        textAlignVertical: 'center',
    },
    label: {
        color: '#FFF',
        marginBottom: 5,
        fontWeight: '500',
    },
    linkText: {
        color: '#1E90FF',
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
    updateButton: {
        backgroundColor: '#F72585',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    updateText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
    },
});

export default EditUserDataScreen;
