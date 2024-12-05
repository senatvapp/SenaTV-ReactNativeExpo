import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACK } from '@env';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const handleSignIn = () => {    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          fetchUserEmails();
          if(email.toLowerCase() === 'senatvapp@gmail.com') {
            router.push({
              pathname: '/movieTabs/movies',
              params: { user:user},
            });
            
          }
          else{
            router.push({
              pathname: '/movieUser',
              params: { user:user},
            });
        }
          
        } else {
          Alert.alert(
            'Email no verificado',
            'Por favor verifica tu email antes de proceder.',
            [
              { text: 'OK' },
              {
                text: 'Reenviar verificación',
                onPress: () => sendEmailVerification(user).then(() => Alert.alert('Correo de verificación enviado')),
              },
            ]
          );
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  const fetchUserEmails = async () => {
    try {
      const response = await fetch(`${BACK}/api/usuarios`); // Reemplaza con el endpoint real
      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.correo === email
      );
      await storeData('user', { usuarioEncontrado });
     
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error al guardar los datos:", e);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={require("../assets/senatv.png")} style={styles.logo} />

      <Text style={styles.welcomeText}>Bienvenido a SENATV</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          placeholderTextColor="gray"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
          <FontAwesome
            name={rememberMe ? "check-circle" : "circle-o"}
            size={20}
            color="black"
          />
          <Text style={styles.rememberMeText}>Recuérdame</Text>
        </Pressable>
        <Link href="/recovery" style={styles.forgotPassword}>¿Clave olvidada?</Link>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSignIn} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Ingresar</Text>
        </Pressable>
      </View>

      <View style={styles.registerContainer}>
        <Text>¿No tienes una cuenta?</Text>
        <Link href="/register" style={styles.registerText}>Registrate</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90BCBE",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 15,
    color: "black",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    color: "black",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 10,
    color: "black",
  },
  forgotPassword: {
    color: "black",
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});