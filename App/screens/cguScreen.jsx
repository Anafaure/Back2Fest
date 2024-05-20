import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TermsOfServiceScreen = () => {
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
                <Text style={styles.headerTitle}>Conditions Générales d'Utilisation</Text>
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Text style={styles.textHeader}>Dernière mise à jour : 16.05.2024</Text>
                <Text style={styles.textTitle}>ARTICLE 1 - Objet</Text>
                <Text style={styles.textContent}>
                    Les présentes CGU ou Conditions Générales d’Utilisation encadrent juridiquement l’utilisation des services du site et de l’application Melodica Festival  (ci-après dénommé « la plateforme »).{"\n\n"}
                    Constituant le contrat entre la société Melodica Festival, l’Utilisateur, l’accès au site doit être précédé de l’acceptation de ces CGU. L’accès à cette plateforme signifie l’acceptation des présentes CGU.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 2 - Mentions légales</Text>
                <Text style={styles.textContent}>
                    L’édition du plateforme Melodica Festival est assurée par la société Melodica Festival immatriculée au RCS de Bordeaux sous le numéro B 250 920 238, dont le siège social est 16 Rue Théodore Blanc, 33520 Bruges, France Métropolitaine.{"\n\n"}
                    L’hébergeur du site Melodica Festival.fr est la société LHW, sise au 5 Rue Keller, 59100 Roubaix, France.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 3 - Eligibilité</Text>
                <Text style={styles.textContent}>
                    Pour utiliser nos Services, vous devez avoir au moins 18 ans. En utilisant nos Services, vous déclarez et garantissez avoir au moins 18 ans.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 4 - Collecte de données personnelles</Text>
                <Text style={styles.textContent}>
                    Pour accéder à certains services et fonctionnalités de Melodica Festival, nous pouvons collecter et traiter vos données personnelles, y compris mais sans s'y limiter, votre date de naissance, votre prénom, votre nom, votre adresse e-mail et votre numéro de téléphone. Nous nous engageons à protéger vos données personnelles conformément à notre Politique de Confidentialité.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 5 - Utilisation des Services</Text>
                <Text style={styles.textContent}>
                    En utilisant nos Services, vous vous engagez à respecter les lois applicables et les présentes CGU. Vous vous engagez également à ne pas utiliser nos Services à des fins illégales, abusives, frauduleuses ou en violation de ces CGU.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 6 - Propriété intellectuelle</Text>
                <Text style={styles.textContent}>
                    Tous les contenus présents sur nos Services, y compris mais sans s'y limiter, les textes, les images, les vidéos, les logos, les marques de commerce et les logiciels, sont la propriété exclusive de Melodica Festival ou de ses concédants de licence, et sont protégés par les lois sur la propriété intellectuelle.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 7 - Limitation de responsabilité</Text>
                <Text style={styles.textContent}>
                    Dans toute la mesure permise par la loi, Melodica Festival ne sera en aucun cas responsable envers vous ou tout tiers pour tout dommage direct, indirect, accessoire, spécial, consécutif ou punitif découlant de ou lié à l'utilisation ou à l'incapacité d'utiliser nos Services.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 8 - Modifications des CGU</Text>
                <Text style={styles.textContent}>
                    Nous nous réservons le droit de modifier ces CGU à tout moment, à notre seule discrétion. Toute modification prendra effet dès sa publication sur nos Services. Nous vous recommandons de consulter régulièrement ces CGU pour rester informé des éventuelles modifications.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 9 - Contact</Text>
                <Text style={styles.textContent}>
                    Si vous avez des questions concernant ces CGU, veuillez nous contacter à l'adresse e-mail suivante : contact@melodicafestival.com
                </Text>
                <Text style={styles.textContent}>
                    En utilisant nos Services, vous acceptez d'être lié par ces CGU. Merci de votre compréhension et bienvenue sur Melodica Festival !
                </Text>
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
        width: '80%',
    },
    backButton: {
        marginRight: 10,
        padding: 8,
    },
    contentContainer: {
        flex: 1,
    },
    textHeader: {
        color: '#FDFDFD',
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    textTitle: {
        color: '#FDFDFD',
        fontSize: 24,
        lineHeight: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    textContent: {
        color: '#FDFDFD',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
});

export default TermsOfServiceScreen;
