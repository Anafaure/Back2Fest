import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Politique de confidentialité</Text>
                    </View>
                    <Text style={styles.textHeader}>Dernière mise à jour : 29 avril 2024</Text>
                    {/* You can place additional sections or options here */}
                    <Text style={styles.textContent}>La présente Politique de confidentialité décrit comment les informations personnelles sont collectées, utilisées et partagées lorsque vous utilisez l'application mobile Mélodica et les gourdes géolocalisables associées.</Text>
                    <Text style={styles.textTitle}>1- Collecte et utilisation des informations personnelles</Text>
                    <Text style={styles.textContent}>Lorsque vous utilisez l'Application, nous collectons les informations suivantes :

Lorsque vous créez un compte, nous recueillons votre nom, votre adresse e-mail, votre numéro de téléphone et toute autre information que vous choisissez de fournir.</Text>
                    <Text style={styles.textTitle}>2-Informations de géolocalisation </Text>
                    <Text style={styles.textContent}>Si vous utilisez la fonction de géolocalisation de l'Application pour localiser une gourde perdue, nous collectons et traitons vos informations de géolocalisation afin de vous fournir ce service.</Text>
                    <Text style={styles.textTitle}>3-Informations sur l'utilisation </Text>
                    <Text style={styles.textContent}>Nous recueillons des informations sur votre utilisation de l'Application, telles que les fonctionnalités que vous utilisez et la façon dont vous interagissez avec l'Application.</Text>
                    <Text style={styles.textTitle}>4-Partage des informations personnelles</Text>
                    <Text style={styles.textContent}>Nous ne partageons vos informations personnelles avec des tiers que dans les cas suivants (avec votre consentement)

Nous pouvons partager vos informations personnelles avec des tiers lorsque vous nous donnez votre consentement pour le faire.</Text>
                    <Text style={styles.textTitle}>6-Prestataires de services </Text>
                    <Text style={styles.textContent}>Nous pouvons faire appel à des tiers pour fournir des services liés à l'Application, tels que le traitement des paiements ou l'analyse de l'utilisation de l'Application. Ces tiers auront accès à vos informations personnelles uniquement pour effectuer ces tâches en notre nom et sont tenus de ne pas les divulguer ou les utiliser à d'autres fins.
</Text>
                    <Text style={styles.textTitle}>**Conformité à la loi :** 
</Text>
                    <Text style={styles.textContent}>- Nous pouvons divulguer vos informations personnelles si nous y sommes légalement tenus ou si nous croyons de bonne foi que cette divulgation est nécessaire pour nous conformer à une obligation légale, protéger nos droits ou nous défendre contre des réclamations légales.</Text>
                    <Text style={styles.textTitle}>**Conservation des données**</Text>
                    <Text style={styles.textContent}>Nous conserverons vos informations personnelles aussi longtemps que nécessaire pour remplir les finalités décrites dans la présente Politique de confidentialité, sauf si une période de conservation plus longue est requise ou autorisée par la loi.</Text>
                    <Text style={styles.textTitle}>**Vos droits**</Text>
                    <Text style={styles.textContent}>Si vous êtes résident de l'Union européenne, vous avez le droit d'accéder aux informations personnelles que nous détenons à votre sujet et de demander que vos informations personnelles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter à l'adresse indiquée ci-dessous.</Text>
                    <Text style={styles.textTitle}>**Contactez-nous**</Text>
                    <Text style={styles.textContent}>Pour plus d'informations sur nos pratiques en matière de confidentialité, ou si vous avez des questions ou des préoccupations, veuillez nous contacter par e-mail à l'adresse suivante : contact@festivalgo.com.</Text>

                </ScrollView>
            )}
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
    textHeader:{
        color: '#FDFDFD',
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    textTitle:{
        color: '#FDFDFD',
        fontSize: 24,
        lineHeight: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    textContent:{
        color: '#FDFDFD',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    
    }
});

export default PrivacyPolicyScreen;