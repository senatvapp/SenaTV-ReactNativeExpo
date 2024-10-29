import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';


export default function RecoveryScreen() {
  const [email, setEmail] = useState("");
  const isEmailEmpty = email === ""; 
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handlePasswordReset = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert(
            'Correo electrónico de restablecimiento de contraseña enviado',
            'Revisa tu correo electrónico para restablecer tu contraseña.'
          );
          navigation.navigate('login');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Ingresar Email', 'Ingrese su dirección de correo electrónico para restablecer su contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/senatv.png")} style={styles.logo} />
      <Text style={styles.titleText}>¿ Tienes problemas para entrar ? </Text>
      <Text style={styles.subText}>Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</Text>
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
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePasswordReset}
          style={[styles.loginButton, isEmailEmpty && styles.buttonDisabled]} // Desactiva el botón si el email está vacío
        >
          <Text style={styles.loginButtonText}>Enviar verificación</Text>
        </TouchableOpacity>
      </View>
        <Pressable>
            <Text style={styles.termsText}>¿ Necesitas más ayuda ?</Text>
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
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  subText: {
    margin:10,
    fontSize: 17,
    color: "black",
    marginBottom: 30,
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
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  termsText: {
    marginBottom: 40,
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});