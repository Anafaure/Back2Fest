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

function isValidEuropeanDate(dateString) {
  // Check if the date matches the format DD/MM/YYYY
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Check for valid month and day
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  
  // Check for days in month
  if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) return false;
  if (month === 2) {
    // Check for leap year
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (day > (isLeap ? 29 : 28)) return false;
  }

  // Check for invalid characters
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  
  // Check if date is in the future or more than 100 years ago
  const age = today.getFullYear() - year;
  if (birthDate > today || age > 100) return false;

  return true;
}

function calculateAge(birthdate) {
  const [day, month, year] = birthdate.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
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
    passwordCheck: "",
    birthdate: "",
    firstname: "",
    lastname: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function signUp() {
    if (value.email === "" || value.password === "" || value.passwordCheck === "" || value.birthdate === "" || value.firstname === "" || value.lastname === "") {
      setValue({
        ...value,
        error: "All fields are mandatory.",
      });
      alert("Tous les champs sont obligatoires.");
      return;
    }

    if (value.password !== value.passwordCheck) {
      setValue({
        ...value,
        error: "Passwords do not match.",
      });
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!regex_password.test(value.password)) {
      setValue({
        ...value,
        error: "Your password doesn't respect the rule of the strong password.",
      });
      alert("Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    if (!isValidEuropeanDate(value.birthdate)) {
      setValue({
        ...value,
        error: "Invalid birthdate. Please use the format DD/MM/YYYY and ensure the date is valid.",
      });
      alert("Date de naissance invalide. Veuillez utiliser le format JJ/MM/AAAA et vous assurer que la date est valide.");
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
      alert(error.message);
    }
  }

  return (
    <ImageBackground source={background} style={styles.background} blurRadius={2}>
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
                placeholder="Mot de passe"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color="gray"
                  style={styles.icon}
                />
              </Pressable>
            </View>
            <Text style={styles.passwordPolicy}>
              Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
            </Text>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Confirmer le mot de passe"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, passwordCheck: text })}
                secureTextEntry={!showPasswordCheck}
              />
              <Pressable onPress={() => setShowPasswordCheck(!showPasswordCheck)}>
                <Icon
                  name={showPasswordCheck ? "eye-off" : "eye"}
                  size={18}
                  color="gray"
                  style={styles.icon}
                />
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="calendar" size={18} color="gray" />
              <TextInput
                placeholder="Date de naissance (JJ/MM/AAAA)"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, birthdate: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="account" size={18} color="gray" />
              <TextInput
                placeholder="Prénom"
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, firstname: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="account" size={18} color="gray" />
              <TextInput
                placeholder="Nom"
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
          Déjà un compte ? {" "}
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
    // height: "83%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // gap: 24,
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
    width: "80%",
    alignSelf: "center",
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
  passwordPolicy: {
    color: "white",
    marginBottom: 16,
    fontSize: 12,
    textAlign: "center",
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
