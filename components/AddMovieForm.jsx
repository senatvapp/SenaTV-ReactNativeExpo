import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function AddMovieForm() {

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const usuario_creacion = '1'; 
  const genero_contenido_codigo= '2';
  const tipo_contenido_codigo = '2';

  const handleAddMovie = async () => {
    const newMovie = {
      nombre: title,
      sinopsis: description,
      anio_lanzamiento: year,
      imagen_url: image,
      director,
      usuario_creacion, // Puedes usar un valor estático o dinámico
      tipo_contenido_codigo,
      genero_contenido_codigo,
    };

    try {
      const response = await fetch('http://localhost:3000/api/contenido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', 'Película agregada correctamente');
        // Resetear los campos del formulario
        setTitle('');
        setYear('');
        setGenre('');
        setType('');
        setDirector('');
        setDescription('');
        setImage('');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Error al agregar película: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error al conectarse al servidor: ${error.message}`);
    }
  };
  return (
    
    <View style={styles.container}>
      <Text style={styles.mainText}>Agrega tu propia pelicula</Text>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Año"
        value={year}
        onChangeText={setYear}
        style={styles.input}
      />
      </View>
      <View style={styles.inputContainer}>
      <Picker
          selectedValue={genre}
          onValueChange={(itemValue) => setGenre(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccionar Género" value="" />
          <Picker.Item label="Acción" value="Acción" />
          <Picker.Item label="Comedia" value="Comedia" />
          <Picker.Item label="Drama" value="Drama" />
          <Picker.Item label="Terror" value="Terror" />
          <Picker.Item label="Romance" value="Romance" />
          <Picker.Item label="Ciencia Ficción" value="Ciencia Ficción" />
          <Picker.Item label="Musical" value="Musical" />

         </Picker> 
       </View> 
      <View style={styles.inputContainer}>
      <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccionar Tipo" value="" />
          <Picker.Item label="Película" value="Película" />
          <Picker.Item label="Serie" value="Serie" />
          <Picker.Item label="Documental" value="Documental" />
          <Picker.Item label="Cortometraje" value="Cortometraje" />
         </Picker>
       </View> 
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Director"
        value={director}
        onChangeText={setDirector}
        style={styles.input}
      />
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Sinopsis"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Agregar url de imagen"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable    
        onPress={handleAddMovie} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
};


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
  pickerItem:{

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
    borderColor: "white",
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
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 40,
  },
});