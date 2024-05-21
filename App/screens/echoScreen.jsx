import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert, FlatList, ScrollView, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { database, ref, onValue, push } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av'; // Import Video from expo-av

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
    const [reward, setReward] = useState(null);
    const [gains, setGains] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const videoPlayer = useRef(null);

    const handleRouletteClick = () => setActiveTab('roulette');
    const handleGainsClick = () => setActiveTab('gains');

    const handleCircleClick = async () => {
        const lastSpinDate = await AsyncStorage.getItem('lastSpinDate');
        const today = new Date().toISOString().split('T')[0];

        if (lastSpinDate === today) {
            Alert.alert('Attention', 'Vous avez déjà utilisé la roulette aujourd\'hui.');
            return;
        }

        setModalVisible(true);
    };

    const onVideoEnd = async () => {
        setModalVisible(false);

        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        setReward(randomReward);
        Alert.alert(
            'Récompense',
            `Récompense : ${randomReward.type}`,
            [{ text: 'Fermer', onPress: () => {} }],
            { cancelable: true }
        );

        if (user && randomReward.type !== 'Perdu') {
            const gainsRef = ref(database, `user/${user.uid}/gains`);
            push(gainsRef, randomReward);
        }

        const today = new Date().toISOString().split('T')[0];
        await AsyncStorage.setItem('lastSpinDate', today);
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

    const sendAlert = () => {
        Alert.alert('Transfert effectué', 'Vos gains/achats ont été transférés à votre gourde')
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
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
                <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => {sendAlert()}}
                    >
                        <Text style={styles.logoutText}>Transférer mes gains/achats à ma gourde</Text>
                    </TouchableOpacity>

                <Text style={styles.mainTitle}>Vos achats</Text>
                <View style={styles.shopContainer}>
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

            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Video
                        ref={videoPlayer}
                        source={require('../assets/roueAnimee.mp4')}
                        style={styles.video}
                        resizeMode="cover"
                        shouldPlay={true} // Ensure the video starts playing automatically
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                onVideoEnd();
                            }
                        }}
                        repeat={false}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        // padding: 26,
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
        marginLeft:"5%"
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
        borderRadius: 50,
    },
    shop: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        alignContent: 'center',
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    video: {
        width: 300,
        height: 300,
    },
    shopContainer: {
        alignSelf: 'center',
    },
    logoutButton: {
        backgroundColor: '#F72585',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 20,
        alignItems: 'center',
        maxWidth: '90%', 
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
});

export default EchoScreen;
