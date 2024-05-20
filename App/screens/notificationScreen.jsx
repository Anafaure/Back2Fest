import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
    const navigation = useNavigation();
    const [PauseEnabled, setPauseEnabled] = React.useState(false);
    const [StartEventEnabled, setStartEventEnabled] = React.useState(false);
    const [NewEventEnabled, setNewEventEnabled] = React.useState(false);

    const handlePauseToggle = () => setPauseEnabled(!PauseEnabled);
    const handleStartEventToggle = () => setStartEventEnabled(!StartEventEnabled);
    const handleNewEventToggle = () => setNewEventEnabled(!NewEventEnabled);

    const switchStyle = {
        trackColor: { false: '#000', true: '#F72585' },
        thumbColorPause: '#fff' ,
        thumbColorStartEvent: '#fff',
        thumbColorNewEvent: '#fff'
    };

    return (
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Mode pause</Text>
                    <Switch
                        value={PauseEnabled}
                        onValueChange={handlePauseToggle}
                        trackColor={switchStyle.trackColor}
                        thumbColor={switchStyle.thumbColorPause}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Chaque début de concert</Text>
                    <Switch
                        value={StartEventEnabled}
                        onValueChange={handleStartEventToggle}
                        trackColor={switchStyle.trackColor}
                        thumbColor={switchStyle.thumbColorStartEvent}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Nouveaux événements</Text>
                    <Switch
                        value={NewEventEnabled}
                        onValueChange={handleNewEventToggle}
                        trackColor={switchStyle.trackColor}
                        thumbColor={switchStyle.thumbColorNewEvent}
            
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerContainer: {
        marginTop: '10%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
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
        marginVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#2A2A2A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16,
        padding: 16,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FDFDFD',
        marginBottom: 8,
    },
});

export default NotificationScreen;
