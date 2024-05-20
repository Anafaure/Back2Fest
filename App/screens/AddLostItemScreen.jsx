import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { database, ref as databaseRef, push, FIREBASE_STORAGE } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

const AddLostItemScreen = () => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation();
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log("Image URI:", result.assets[0].uri); // Log the image URI from the assets array
            setImage(result.assets[0].uri);
        } else {
            console.log("Image selection was cancelled.");
        }
    };

    const handleAddItem = async () => {
        if (!image || !location || !description) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        setUploading(true);

        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const imageRef = storageRef(FIREBASE_STORAGE, `images/${new Date().getTime()}`);
            const uploadTask = uploadBytesResumable(imageRef, blob);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload failed', error);
                    Alert.alert('Erreur', `Échec du téléchargement de l'image: ${error.message}`);
                    setUploading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const itemRef = databaseRef(database, 'perdu');
                        push(itemRef, {
                            image: downloadURL,
                            lieu: location,
                            heure: new Date().toLocaleTimeString(),
                            description,
                            user: user.uid,
                        });
                        setUploading(false);
                        navigation.goBack();
                    }).catch((error) => {
                        console.error('Error getting download URL:', error);
                        Alert.alert('Erreur', `Échec de l'obtention de l'URL de téléchargement: ${error.message}`);
                        setUploading(false);
                    });
                }
            );
        } catch (error) {
            console.error('Upload failed', error);
            Alert.alert('Erreur', `Échec du téléchargement de l'image: ${error.message}`);
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ajouter un objet trouvé</Text>
            </View>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePickerText}>Sélectionner une image</Text>
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Lieu de dépôt"
                placeholderTextColor="#888"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem} disabled={uploading}>
                <Text style={styles.addButtonText}>{uploading ? 'Uploading...' : 'Ajouter l\'objet'}</Text>
            </TouchableOpacity>
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
    imagePicker: {
        height: 200,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16,
    },
    imagePickerText: {
        color: '#888',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    input: {
        height: 50,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#F72585',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddLostItemScreen;
