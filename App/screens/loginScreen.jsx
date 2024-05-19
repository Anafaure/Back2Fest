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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignInScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      alert("Un email et un mot de passe sont requis.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      alert("Email ou mot de passe incorrect(s).");
    }
  }

  return (
    <ImageBackground source={background} style={styles.background} blurRadius={2}> 
      <View style={styles.container}>
        <Image
          source={logo}
          style={{ width: 400, alignSelf: "center" }}
        />
        <Text style={styles.title}>Connecte-toi à ton compte !</Text>

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
          </View>
          <Pressable style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
        </View>
        <Text style={styles.bottomText}>
          Pas de compte ? {" "}
          <Text style={styles.linkText} onPress={() => navigation.navigate("Sign Up")}>
            Inscris toi ici
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

export default SignInScreen;

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
    flex: 1,
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
    width: "120%",
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
