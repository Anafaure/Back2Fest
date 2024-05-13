import React, { useState } from "react";
import logo from "../assets/logo_melodica.png";
import background from "../assets/Concert_ombre.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth();
const database = getDatabase();

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function SignUpScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    birthdate: "",
    firstname: "",
    lastname: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      const user = userCredential.user;

      const userAge = calculateAge(value.birthdate);

      // Store additional user information in Firebase Realtime Database
      const userRef = ref(database, `user/${user.uid}`);
      await set(userRef, {
        email: value.email,
        prenom: value.firstname,
        nom: value.lastname,
        dateNaissance: value.birthdate,
        age: userAge,
        numeroBillet: Math.floor(Math.random() * 1000000),
      });

      navigation.navigate("Sign In");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Image
          source={logo}
          style={{ width: 400, alignSelf: "center" }}
        />
        <Text style={styles.title}>Crée un nouveau compte !</Text>

        <View style={{ marginVertical: 24 }}>
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="calendar" size={18} color="gray" />
              <TextInput
                placeholder="Birthdate (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, birthdate: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="account" size={18} color="gray" />
              <TextInput
                placeholder="Firstname"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, firstname: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="account" size={18} color="gray" />
              <TextInput
                placeholder="Lastname"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, lastname: text })}
              />
            </View>
          </View>
          <Pressable style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </Pressable>
        </View>
        <Text style={styles.bottomText}>
          Déjà un compte ?
          <Text style={styles.linkText} onPress={() => navigation.navigate("Sign In")}>
            Connecte-toi ici
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    marginHorizontal: 16,
    height: "83%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#f3f3f3",
    marginBottom: 16,
    width: "100%",
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#f3f3f3",
    color: "#424242",
  },
  button: {
    backgroundColor: "#F72585",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 16,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomText: {
    textAlign: "center",
    color: "white",
  },
  linkText: {
    color: "#F72585",
  },
});
