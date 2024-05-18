import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HelpScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.mainContainer}>
                <View style={styles.circleContainer}>
            <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Comment utiliser mon gain ?</Text>
                    <View style={styles.boxContainer}>
                        <View style={styles.boxContent}>
                            <Image
                                style={styles.placeholderImage}
                                source={require('../assets/nfc.png')}
                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>Comment avoir vos gains ?</Text>
                        </View>
                    </View>
                    <Text style={styles.infoText}>
                        Vos informations sont stockées dans la puce NFC de votre gourde ECH₂O.
                    </Text>

                    <View style={styles.boxContainer}>
                        <View style={styles.emptyBox} />
                        <View style={styles.label}>
                            <Text style={styles.labelText}>À votre arrivée au stand</Text>
                        </View>
                    </View>
                    <Text style={styles.infoText}>
                        Donnez votre gourde ECH₂O au vendeur qui va effectuer un scan de votre gourde. Il ne vous reste plus qu’à choisir le gain à récupérer.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainContainer: {
        width: '100%',
        paddingTop: 65,
        paddingBottom: 20,
        paddingLeft: 22,
        paddingRight: 22,
        backgroundColor: '#121212',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // gap: 50,
    },
    circleContainer: {
        width:'100%',
     alignContent: 'flex-start',
    },
    content: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 75,
    },
    title: {
        textAlign: 'center',
        color: '#FDFDFD',
        fontSize: 25,
        fontWeight: '600',
    },
    boxContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    boxContent: {
        width: 308,
        height: 165,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 41,
        paddingBottom: 41,
        backgroundColor: '#560BAD',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    placeholderImage: {
        width: 77,
        height: 77,
    },
    label: {
        height: 32,
        padding: 10,
        position: 'absolute',
        backgroundColor: '#F72585',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    labelText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        height: 20,
    },
    infoText: {
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#FDFDFD',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyBox: {
        width: 308,
        height: 165,
        backgroundColor: '#560BAD',
        borderRadius: 5,
    },
    backButton: {
        marginRight: 10,
        padding: 8,
    },
});

export default HelpScreen;
