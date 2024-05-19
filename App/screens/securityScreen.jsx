import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SecurityScreen = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
 
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Mot de passe et sécurité</Text>
                    </View>
                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                    <View style={styles.sectionContainer}>
                        <MenuOption
                            iconName="key"
                            label="Modifier le mot de passe"
                        />
                        <MenuOption
                            iconName="shield-checkmark"
                            label="Authentification à deux facteurs"
                        />
                        </View>
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
    backButton: {
        marginRight: 10,
        padding: 8,
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
});

export default SecurityScreen;
