import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(user); // Envía el correo de verificación al crear la cuenta
        Alert.alert('Verification email sent', 'Please check your email to verify your account.');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);

        if (user.emailVerified) {
          navigation.navigate('Home');
        } else {
          Alert.alert(
            'Email not verified',
            'Please verify your email before proceeding.',
            [
              { text: 'OK' },
              {
                text: 'Resend Verification',
                onPress: () => sendEmailVerification(user).then(() => Alert.alert('Verification email sent')),
              },
            ]
          );
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  // Función para manejar el restablecimiento de contraseña
  const handlePasswordReset = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert(
            'Password Reset Email Sent',
            'Check your email to reset your password.'
          );
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Enter Email', 'Please enter your email address to reset your password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hello</Text>
      <Text style={styles.subtitulo}>Sign In to your account</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholder='juan@gmail.com'
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        placeholder='password'
        style={styles.textInput}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
      </TouchableOpacity>
      {/* Botón para restablecimiento de contraseña */}
      <TouchableOpacity onPress={handlePasswordReset}>
        <Text style={styles.resetText}>Forgot your password?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    color: 'gray',
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetText: {
    color: '#00CFEB',
    fontSize: 14,
    marginTop: 10,
  },
});
