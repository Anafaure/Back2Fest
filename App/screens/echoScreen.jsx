import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Modal, Button, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { database, ref, onValue, push } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook


const rewards = [
    { type: 'Boisson 1€', utilise: 'non' },
    { type: 'Boisson gratuite', utilise: 'non' },
    { type: 'RedBull offerte', utilise: 'non' },
    { type: 'Merch offert', utilise: 'non' },
    { type: 'Perdu', utilise: 'non' },
];

const items = [
    { name: 'Coca-Cola (Canette)', price: '1.50€', image: require('../assets/Coca-Cola.png') },
    { name: 'Lays (Chips)', price: '4€', image: require('../assets/chips.png') },
    { name: 'Sandwich', price: '7€', image: require('../assets/sandwich.png') },
    { name: 'Desperados (Bière)', price: '2€', image: require('../assets/biere.png') }
];

function EchoScreen() {
    const [activeTab, setActiveTab] = useState('roulette');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reward, setReward] = useState(null);
    const [gains, setGains] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation(); // Initialize navigation

    const handleRouletteClick = () => setActiveTab('roulette');
    const handleGainsClick = () => setActiveTab('gains');

    const handleCircleClick = () => {
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        setReward(randomReward);
        setIsModalVisible(true);

        if (user && randomReward.type !== 'Perdu') {
            const gainsRef = ref(database, `user/${user.uid}/gains`);
            push(gainsRef, randomReward);
        }
    };

    useEffect(() => {
        if (activeTab === 'gains' && user) {
            const gainsRef = ref(database, `user/${user.uid}/gains`);
            onValue(gainsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const gainsArray = Object.values(data);
                    setGains(gainsArray);
                } else {
                    setGains([]);
                }
            });
        }
    }, [activeTab, user]);

    const getRewardIcon = (type) => {
        if (type === 'RedBull offerte') {
            return 'flash-outline';
        } else if (type.includes('Boisson')) {
            return 'beer-outline';
        } else if (type === 'Merch offert') {
            return 'shirt-outline';
        } else {
            return 'warning-outline';
        }
    };

    const renderItem = ({ item }) => {
        const iconName = getRewardIcon(item.type);

        return (
            <View style={styles.gainCard}>
                <Ionicons
                    name={iconName}
                    size={24}
                    color='white'
                    style={styles.gainIcon}
                />
                <Text style={styles.gainText}>
                    {item.type} - Utilisé: {item.utilise}
                </Text>
            </View>
        );
    };

    const renderItems = ({ item }) => (
        <View style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImage} resizeMode="contain"/>
            <Text style={styles.itemText}>
                {item.name} - {item.price}
            </Text>
        </View>
    );

    const renderContent = () => {
        if (activeTab === 'roulette') {
            return (
                <View style={styles.mainSectionContent}>
                    <View style={styles.dailyWheelContainer}>
                        <Image
                            style={styles.dailyWheelImage}
                            source={require('../assets/roue.png')}
                        />
                        <TouchableOpacity onPress={handleCircleClick} style={styles.centerCircle} />
                    </View>
                </View>
            );
        } else if (activeTab === 'gains') {
            return (
                <View style={styles.mainSectionContent}>
                    <FlatList
                        data={gains}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text style={styles.noInfoText}>Aucun gain disponible</Text>}
                        numColumns={2}
                        contentContainerStyle={styles.gainList}
                    />
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <Image
                            style={{ width: 150, marginTop: 20 }}
                            source={require('../assets/logo_echo_rose.png')}
                        />
                    </View>
                    <View style={styles.headerIcon}>
                        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                            <Ionicons name="storefront-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.mainSection}>
                    <Text style={styles.mainTitle}>Ma gourde</Text>
                    <View style={styles.options}>
                        <TouchableOpacity
                            onPress={handleRouletteClick}
                            style={[
                                styles.option,
                                activeTab === 'roulette' ? styles.activeOption : styles.inactiveOption,
                            ]}
                        >
                            <Text style={styles.optionText}>Roulette</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleGainsClick}
                            style={[
                                styles.option,
                                activeTab === 'gains' ? styles.activeOption : styles.inactiveOption,
                            ]}
                        >
                            <Text style={styles.optionText}>Mes gains ({gains.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.optionQuestionMark}>
    <View>
        <Text style={styles.optionQuestionMarkText}>?</Text>
    </View>
</TouchableOpacity>
                    </View>

                    {renderContent()}
                </View>

                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Récompense : {reward?.type || 'Perdu'}</Text>
                            <Button title="Fermer" onPress={() => setIsModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
                <Text style={styles.mainTitle}>Vos achats</Text>
                <View>
                    <FlatList
                        style={styles.shop}
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItems}
                        ListEmptyComponent={<Text style={styles.noInfoText}>Aucun achat disponible</Text>}
                        numColumns={2}
                        contentContainerStyle={styles.gainList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        padding: 26,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    headerTitleContainer: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        width: 35,
        height: 35,
        position: 'relative',
        display: 'flex',
    },
    mainSection: {
        width: '100%',
    },
    mainTitle: {
        fontSize: 36,
        color: '#FDFDFD',
        marginBottom: 20,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    option: {
        backgroundColor: '#560BAD',
        padding: 20,
        width: '50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    activeOption: {
        opacity: 1,
    },
    inactiveOption: {
        opacity: 0.4,
    },
    optionText: {
        color: '#FDFDFD',
        fontSize: 18,
    },
    optionQuestionMark: {
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 10,
        position: 'absolute',
        top: 4,
        right: 10,
    },
    optionQuestionMarkText: {
        color: '#FDFDFD',
        fontSize: 18,
    },
    mainSectionContent: {
        width: '100%',
        backgroundColor: '#560BAD',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    dailyWheelContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    centerCircle: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: '41.25%',
        left: '42.25%',
    },
    noInfoText: {
        color: '#FDFDFD',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
    },
    gainCard: {
        flexDirection: 'column',
        width: '45%',
        alignItems: 'center',
        backgroundColor: '#F72585',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    gainList: {
        justifyContent: 'space-around',
    },
    gainIcon: {
        marginRight: 10,
    },
    gainText: {
        color: '#FFF',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#560BAD',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
    },
    itemCard: {
        flexDirection: 'column',
        width: '45%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    itemText: {
        color: '#000',
        fontSize: 18,
        marginTop: 5,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Adjust if necessary
    },
    shop:{
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        alignContent: 'center',
    }
});

export default EchoScreen;
