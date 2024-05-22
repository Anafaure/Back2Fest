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
  useWindowDimensions,
  ScrollView,
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
    numeroBillet:"",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const { width, height } = useWindowDimensions();
  const responsiveStyles = createResponsiveStyles(width, height);

  const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function signUp() {
    if (value.email === "" || value.password === "" || value.passwordCheck === "" || value.birthdate === "" || value.firstname === "" || value.lastname === ""|| value.numeroBillet === "") {
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
        numeroBillet: value.numeroBillet
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
    <ImageBackground source={background} style={responsiveStyles.background} resizeMode="cover" blurRadius={2}>
      <ScrollView>
        <View style={responsiveStyles.container}>
          <Image
            source={logo}
            style={responsiveStyles.logo}
          />
          <Text style={responsiveStyles.title}>Crée un nouveau compte !</Text>

          <View style={responsiveStyles.form}>
            <View style={responsiveStyles.inputWrapper}>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="email" size={18} color="gray" />
                <TextInput
                  placeholder="Email"
                  value={value.email}
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, email: text })}
                />
              </View>

              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="lock" size={18} color="gray" />
                <TextInput
                  placeholder="Mot de passe"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, password: text })}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="gray"
                    style={responsiveStyles.icon}
                  />
                </Pressable>
              </View>
              <Text style={responsiveStyles.passwordPolicy}>
                Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
              </Text>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="lock" size={18} color="gray" />
                <TextInput
                  placeholder="Confirmer le mot de passe"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, passwordCheck: text })}
                  secureTextEntry={!showPasswordCheck}
                />
                <Pressable onPress={() => setShowPasswordCheck(!showPasswordCheck)}>
                  <Icon
                    name={showPasswordCheck ? "eye-off" : "eye"}
                    size={18}
                    color="gray"
                    style={responsiveStyles.icon}
                  />
                </Pressable>
              </View>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="calendar" size={18} color="gray" />
                <TextInput
                  placeholder="Date de naissance (JJ/MM/AAAA)"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, birthdate: text })}
                />
              </View>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="account" size={18} color="gray" />
                <TextInput
                  placeholder="Prénom"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, firstname: text })}
                />
              </View>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="account" size={18} color="gray" />
                <TextInput
                  placeholder="Nom"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, lastname: text })}
                />
              </View>
              <View style={responsiveStyles.inputContainer}>
                <Icon style={responsiveStyles.icon} name="ticket" size={18} color="gray" />
                <TextInput
                  placeholder="Numéro de Billet (AA111AA)"
                  style={responsiveStyles.input}
                  onChangeText={(text) => setValue({ ...value, numeroBillet: text })}
                />
              </View>
            </View>
            <Pressable style={responsiveStyles.button} onPress={signUp}>
              <Text style={responsiveStyles.buttonText}>Créer un compte</Text>
            </Pressable>
          </View>
          <Text style={responsiveStyles.termsText}>
            En vous inscrivant, vous acceptez les{" "}
            <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("Terms of Service")}>
              conditions générales d'utilisation
            </Text>{" "}
            et la{" "}
            <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("Privacy Policy")}>
              politique de confidentialité
            </Text>.
          </Text>
          <Text style={responsiveStyles.bottomText}>
            Déjà un compte ?{" "}
            <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("Sign In")}>
              Connecte-toi ici
            </Text>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default SignUpScreen;

const createResponsiveStyles = (width, height) => StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.04,
    marginTop: height * 0.1,
    marginBottom: height * 0.1,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: height * 0.02,
  },
  form: {
    width: width * 0.8,
    marginVertical: height * 0.03,
  },
  inputWrapper: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    backgroundColor: "#f3f3f3",
    marginBottom: height * 0.02,
    width: "100%",
  },
  icon: {
    padding: width * 0.02,
  },
  input: {
    flex: 1,
    paddingTop: height * 0.01,
    paddingRight: width * 0.02,
    paddingBottom: height * 0.01,
    paddingLeft: 0,
    backgroundColor: "#f3f3f3",
    color: "#424242",
  },
  passwordPolicy: {
    color: "white",
    marginBottom: height * 0.02,
    fontSize: width * 0.03,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F72585",
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    margin: height * 0.02,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  termsText: {
    textAlign: "center",
    color: "white",
    fontSize: width * 0.03,
    marginBottom: height * 0.02,
  },
  bottomText: {
    textAlign: "center",
    color: "white",
  },
  linkText: {
    color: "#F72585",
  },
});
