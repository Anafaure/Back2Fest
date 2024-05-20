import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { database, ref, onValue } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebase';

const SettingsScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { user } = useAuth();
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        if (user) {
            const userRef = ref(database, `user/${user.uid}`);
            onValue(
                userRef,
                (snapshot) => {
                    const data = snapshot.val();
                    setUserInfo(data || {});
                    setLoading(false);
                },
                { onlyOnce: true }
            );
        } else {
            setLoading(false);
            setUserInfo({});
        }
    }, [user]);


    const handleLogout = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
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
                        <Text style={styles.headerTitle}>Paramètres</Text>
                    </View>
                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                    <Text style={styles.userName}>{userInfo.prenom || 'Prénom'} {userInfo.nom || 'Nom'}</Text>

                    <View style={styles.sectionContainer}>
                        <MenuOption
                            iconName="lock-closed"
                            label="Mot de passe et sécurité"
                            onPress={() => navigateToScreen('Security')}
                        />
                        <MenuOption
                            iconName="person-circle"
                            label="Informations personnelles"
                            onPress={() => navigateToScreen('User Datas')}
                        />
                        <MenuOption
                            iconName="shield-checkmark"
                            label="Politique de confidentialité"
                            onPress={() => navigateToScreen('Privacy Policy')}
                        />
                        <MenuOption
                            iconName="reader"
                            label="CGU"
                            onPress={() => navigateToScreen('CGU')}
                        />
                        <MenuOption
                            iconName="notifications"
                            label="Gérer mes notifications"
                            onPress={() => navigateToScreen('Notifications')}
                        />
                        <MenuOption
                            iconName="heart"
                            label="Mes artistes préférés"
                            onPress={() => navigateToScreen('Favourite Artist')}
                        />
                        <MenuOption
                            iconName="document-text"
                            label="Objets trouvés"
                            onPress={() => navigateToScreen('Lost Property')}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Déconnexion</Text>
                    </TouchableOpacity>
                </ScrollView>
        </View>
    );
};

const MenuOption = ({ iconName, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.menuOption} onPress={onPress}>
            <Ionicons name={iconName} size={40} color="#F72585" />
            <Text style={styles.optionLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    headerContainer: {
        marginTop: '10%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#FDFDFD',
   
    },
    userName: {
        fontSize: 32,
        fontWeight: '500',
        color: '#FDFDFD',
        marginBottom: 16,
    },
    contentContainer: {
        flex: 1,
    },
    sectionContainer: {
        flexDirection: 'column',
        gap: 20,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#2A2A2A',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    optionLabel: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    logoutButton: {
        backgroundColor: '#F72585',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
    },
    backButton: {
        marginRight: 10,
        padding: 8,
    },
});

export default SettingsScreen;
