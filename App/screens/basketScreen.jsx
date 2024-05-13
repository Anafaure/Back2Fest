import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BasketScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Basket Screen</Text>
            {/* Add your components and content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default BasketScreen;