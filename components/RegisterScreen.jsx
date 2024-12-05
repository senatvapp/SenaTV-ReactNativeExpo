import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { BACK } from '@env';

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        sendEmailVerification(user);
        saveUserToDatabase(name, lastName, email, "Usuario"); // Envía el correo de verificación al crear la cuenta
        Alert.alert('Email de verificación enviado', 'Revisa ru correo para verificar la cuenta.');
        navigation.navigate('login')
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };
  const saveUserToDatabase = (nombre, apellido, correo, tipo_usuario_id) => {
    fetch(`${BACK}/api/usuarios`, { // Cambia esta URL a tu endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        tipo_usuario_id: tipo_usuario_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el usuario en la base de datos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuario guardado exitosamente en la base de datos:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "No se pudo guardar el usuario en la base de datos.");
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/senatv.png")} style={styles.logo} />
      <Text style={styles.welcomeText}>Crear cuenta</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
         placeholderTextColor="gray"
        /> 
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => setName(text)}
          keyboardType="text"
          autoCapitalize="none"
         placeholderTextColor="gray"
        /> 
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          keyboardType="text"
          autoCapitalize="none"
         placeholderTextColor="gray"
        /> 
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="gray"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable 
        disabled={password !== confirmPassword}        
        onPress={handleCreateAccount} style={[
          styles.loginButton,
          password !== confirmPassword && styles.disabledButton, // Estilo de botón desactivado
        ]}>
          <Text style={styles.loginButtonText}>Registrarse</Text>
        </Pressable>
      </View>
        <Text>Al aceptar una cuenta o registrarte,</Text>
        <Text>aceptas nuestros:</Text>
        <Pressable>
            <Text style={styles.termsText}>Términos y condicones</Text>
        </Pressable> 
                   
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
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 15,
  },
  input: {
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
  buttonContainer: {
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
    paddingHorizontal: 35,
  },
  disabledButton: {
    backgroundColor: "gray", // Color de fondo del botón deshabilitado
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  termsText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});