import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
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
                <Text style={styles.headerTitle}>Politique de confidentialité</Text>
            </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Text style={styles.textHeader}>Dernière mise à jour : 16.05.2024</Text>
                <Text style={styles.textContent}>
                    <Text style={styles.textTitle}>Préambule</Text>{"\n"}
                    La Plateforme Melodica Festival est exploitée par la société Melodica Festival, SARL, immatriculée au RCS de Bordeaux sous le numéro B 250 920 238, dont le siège social est 16 Rue Théodore Blanc, 33520 Bruges, France, pouvant être contactée par mail à privacy@melodicafestival.com.{"\n\n"}
                    L’accès à la Plateforme et à ses fonctionnalités nécessite la collecte et le traitement des données à caractère personnel des Utilisateurs. Il était donc nécessaire d’établir une politique de protection des données personnelles permettant de respecter les recommandations d’usage en matière de traitement des données personnelles telles qu’instaurées par la loi et la réglementation applicables.{"\n\n"}
                    La Politique de protection des données de la Plateforme a été établie en accord avec les préconisations de la Commission Nationale de l’informatique et des libertés (dite « CNIL »). Elle a pour objectif d’informer les Utilisateurs de la Plateforme de la façon dont leurs données personnelles sont traitées et des engagements et mesures que nous avons pris afin de veiller au respect des données à caractère personnel des Utilisateurs de la Plateforme.{"\n\n"}
                    Elle a été établie conformément aux dispositions de :{"\n"}
                    • La Loi Informatique et Liberté du 6 janvier 1978 ;{"\n"}
                    • Du Règlement Européen sur les Données Personnelles (dit « R.G.P.D. ») du 23 mai 2018 ;{"\n"}
                    • La Loi de transposition du Règlement Européen sur la Protection des Données Personnelles (R.G.P.D.) du 20 juin 2018.{"\n\n"}
                    La version actuellement publiée sur la Plateforme est la version en vigueur de cette politique. Melodica Festival se réserve le droit de la modifier à tout instant afin de se conformer aux obligations légales en vigueur.{"\n"}
                    Toute modification apportée à la Politique de Confidentialité sera communiquée aux Utilisateurs afin de recueillir leur consentement à la nouvelle politique.{"\n"}
                    En navigant sur notre Plateforme, l’Utilisateur reconnaît avoir lu, compris et accepter la présente politique de protection des données. Toute question relative à cette politique peut être formulée à l’adresse suivante : dpo@melodicafestival.com.{"\n"}
                </Text>
                <Text style={styles.textTitle}>ARTICLE 1 - Définitions</Text>
                <Text style={styles.textContent}>
                    Sur la Plateforme, les termes ci-dessous ont la signification qui leur est attribuée au sens du R.G.P.D. (art.4) :{"\n\n"}
                    <Text style={styles.textSubtitle}>Consentement :</Text> « de la personne concernée, toute manifestation de volonté, libre, spécifique, éclairée et univoque par laquelle la personne concernée accepte, par une déclaration ou par un acte positif clair, que des données à caractère personnel la concernant fassent l'objet d'un traitement » ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Responsable du traitement :</Text> « la personne physique ou morale, l'autorité publique, le service ou un autre organisme qui, seul ou conjointement avec d'autres, détermine les finalités et les moyens du traitement; lorsque les finalités et les moyens de ce traitement sont déterminés par le droit de l'Union ou le droit d'un État membre, le responsable du traitement peut être désigné ou les critères spécifiques applicables à sa désignation peuvent être prévus par le droit de l'Union ou par le droit d'un État membre » ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Traitement :</Text> « toute opération ou tout ensemble d'opérations effectuées ou non à l'aide de procédés automatisés et appliquées à des données ou des ensembles de données à caractère personnel, telles que la collecte, l'enregistrement, l'organisation, la structuration, la conservation, l'adaptation ou la modification, l'extraction, la consultation, l'utilisation, la communication par transmission, la diffusion ou toute autre forme de mise à disposition, le rapprochement ou l'interconnexion, la limitation, l'effacement ou la destruction » ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Violation de données à caractère personnel :</Text> « une violation de la sécurité entraînant, de manière accidentelle ou illicite, la destruction, la perte, l'altération, la divulgation non autorisée de données à caractère personnel transmises, conservées ou traitées d'une autre manière, ou l'accès non autorisé à de telles données ».{"\n\n"}
                    <Text style={styles.textSubtitle}>Application mobile :</Text> désigne l’application mobile ByteShare accessible via les plateformes de téléchargement APPLE STORE et PLAY STORE ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Plateforme :</Text> la Plateforme « Melodica Festival » par laquelle sont délivrés les Services ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Responsable du traitement :</Text> « la personne physique ou morale, l'autorité publique, le service ou un autre organisme qui, seul ou conjointement avec d'autres, détermine les finalités et les moyens du traitement; lorsque les finalités et les moyens de ce traitement sont déterminés par le droit de l'Union ou le droit d'un État membre, le responsable du traitement peut être désigné ou les critères spécifiques applicables à sa désignation peuvent être prévus par le droit de l'Union ou par le droit d'un État membre » ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Traitement :</Text> « toute opération ou tout ensemble d'opérations effectuées ou non à l'aide de procédés automatisés et appliquées à des données ou des ensembles de données à caractère personnel, telles que la collecte, l'enregistrement, l'organisation, la structuration, la conservation, l'adaptation ou la modification, l'extraction, la consultation, l'utilisation, la communication par transmission, la diffusion ou toute autre forme de mise à disposition, le rapprochement ou l'interconnexion, la limitation, l'effacement ou la destruction » ;{"\n\n"}
                    <Text style={styles.textSubtitle}>Violation de données à caractère personnel :</Text> « une violation de la sécurité entraînant, de manière accidentelle ou illicite, la destruction, la perte, l'altération, la divulgation non autorisée de données à caractère personnel transmises, conservées ou traitées d'une autre manière, ou l'accès non autorisé à de telles données ».{"\n\n"}
                    <Text style={styles.textSubtitle}>Données personnelles :</Text> toute information permettant d'identifier directement ou indirectement une personne physique.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 2 - Responsable du traitement des données</Text>
                <Text style={styles.textContent}>
                    Le responsable du traitement des données personnelles collectées via l'application Melodica Festival et le site web www.melodicafestival.com est Madame Ayodélé BANSOU.{"\n"}
                    Pour toute question relative à la protection des données ou à vos droits en tant qu'utilisateur, vous pouvez contacter le responsable de la protection des données à l'adresse e-mail suivante : dpo@melodicafestival.com.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 3 - Collecte de données personnelles</Text>
                <Text style={styles.textContent}>
                    Nous collectons les données personnelles suivantes lorsque vous utilisez notre application et notre site web :{"\n"}
                    Date de naissance (pour vérifier l'âge minimum requis pour accéder au festival){"\n"}
                    Prénom & Nom{"\n"}
                    Adresse e-mail{"\n"}
                    Numéro de téléphone
                </Text>
                <Text style={styles.textTitle}>ARTICLE 4 - Utilisation des données</Text>
                <Text style={styles.textContent}>
                    Les données personnelles collectées sont utilisées dans les buts suivants :{"\n"}
                    Vérifier l'âge minimum requis pour accéder au festival (18 ans ou plus){"\n"}
                    Communiquer avec vous concernant les mises à jour, les offres spéciales et les informations relatives au festival{"\n"}
                    Répondre à vos questions et demandes de renseignements{"\n"}
                    Améliorer notre application et notre site web
                </Text>
                <Text style={styles.textTitle}>ARTICLE 5 - Protection des données</Text>
                <Text style={styles.textContent}>
                    Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, toute utilisation abusive ou toute divulgation non autorisée. Seules les personnes autorisées ont accès à vos données personnelles, et elles sont tenues de les traiter de manière confidentielle.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 6 - Qu'est-ce qu'un cookie ?</Text>
                <Text style={styles.textContent}>
                    Un cookie est un petit fichier texte qui est stocké sur votre appareil lorsque vous visitez un site web. Les cookies permettent au site web de se souvenir de vos actions et préférences (telles que la langue choisie, la taille de la police et d'autres préférences d'affichage) sur une période de temps, vous évitant ainsi de les saisir à chaque fois que vous revenez sur le site ou naviguez d'une page à l'autre.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 7 - Comment utilisons-nous les cookies ?</Text>
                <Text style={styles.textContent}>
                    Nous utilisons différents types de cookies sur notre site web pour les finalités suivantes :{"\n"}
                    <Text style={styles.textSubtitle}>Cookies essentiels :</Text> Ces cookies sont nécessaires au fonctionnement de notre site web et vous permettent d'accéder à certaines fonctionnalités, telles que la navigation sur les pages sécurisées.{"\n"}
                    <Text style={styles.textSubtitle}>Cookies de performance :</Text> Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en recueillant des informations sur les pages visitées, le temps passé sur le site et les erreurs éventuelles rencontrées. Ces données nous aident à améliorer la performance de notre site web.{"\n"}
                    <Text style={styles.textSubtitle}>Cookies de fonctionnalité :</Text> Ces cookies permettent au site web de se souvenir de vos choix et préférences (comme votre nom d'utilisateur, votre langue ou votre région) et fournissent des fonctionnalités améliorées et plus personnalisées.{"\n"}
                    <Text style={styles.textSubtitle}>Cookies de ciblage :</Text> Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. Ils sont également utilisés pour limiter le nombre de fois où vous voyez une publicité et mesurer l'efficacité des campagnes publicitaires.
                </Text>
                <Text style={styles.textTitle}>ARTICLE 8 - Gestion des cookies</Text>
                <Text style={styles.textContent}>
                    Vous pouvez accepter ou refuser l'utilisation de cookies sur notre site web à tout moment en modifiant les paramètres de votre navigateur. La plupart des navigateurs web sont configurés pour accepter les cookies par défaut, mais vous pouvez généralement modifier ces paramètres pour refuser les cookies ou être averti lorsque des cookies sont envoyés à votre appareil. Veuillez noter que si vous désactivez les cookies, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement.{"\n\n"}
                    Pour plus d'informations sur la manière de gérer les cookies dans votre navigateur, veuillez consulter les pages d'aide de votre navigateur ou visiter www.allaboutcookies.org.{"\n"}
                    Nous utilisons des cookies sur notre site web www.melodicafestival.com pour améliorer votre expérience utilisateur et analyser l'utilisation du site. En continuant à naviguer sur notre site, vous consentez à l'utilisation de cookies conformément à la présente politique de cookies. Pour plus d'informations sur les cookies que nous utilisons et comment les désactiver, veuillez consulter notre Politique de cookies.{"\n\n"}
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur notre site web. Nous vous encourageons à consulter régulièrement cette politique de confidentialité pour rester informé des dernières mises à jour.{"\n\n"}
                    Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à l'adresse e-mail privacy@melodicafestival.com.
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
    textSubtitle: {
        color: '#FDFDFD',
        fontSize: 18,
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

export default PrivacyPolicyScreen;
