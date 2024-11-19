import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

export default function AddMovieForm() {

  const { movieId } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const usuario_creacion = '1'; 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:3000/api/contenido/${movieId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la película');
        }
        const data = await response.json();
        setMovie(data);

        // Actualiza los campos del formulario con los datos de la película
        setTitle(data.nombre || '');
        setYear(String(data.anio_lanzamiento) || '');
        setGenre(String(data.genero_contenido_codigo) || '');
        setType(String(data.tipo_contenido_codigo) || '');
        setDirector(data.director || '');
        setDescription(data.sinopsis || '');
        setImage(data.imagen_url || '');
      } catch (error) {
        Alert.alert('Error', `Error al obtener la película: ${error.message}`);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);


  const handleEditMovie = async () => {
    const updatedMovie = {
      nombre: title,
      sinopsis: description,
      anio_lanzamiento: year,
      imagen_url: image,
      director,
      usuario_creacion, // Puedes usar un valor estático o dinámico
      tipo_contenido_codigo: type,
      genero_contenido_codigo: genre,
    };
  
    try {
      const response = await fetch(`http://192.168.1.13:3000/api/contenido/${movieId}`, {
        method: 'PUT', // Cambiado a PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
  
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Éxito', 'Película editada correctamente');
        router.push('movieTabs/movies');
        // Opcional: Redirigir o resetear los campos del formulario
        setTitle('');
        setYear('');
        setGenre('');
        setType('');
        setDirector('');
        setDescription('');
        setImage('');

      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Error al editar: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error en la petición: ${error.message}`);
    }
  };
  return (
    
    <View style={styles.container}>
      <Text style={styles.mainText}>Edita tu pelicula</Text>
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
          <Picker.Item label="Acción" value="1" />
          <Picker.Item label="Comedia" value="2" />
          <Picker.Item label="Drama" value="3" />
          <Picker.Item label="Terror" value="4" />
          <Picker.Item label="Romance" value="5" />
          <Picker.Item label="Ciencia Ficción" value="6" />
          <Picker.Item label="Musical" value="7" />

         </Picker> 
       </View> 
      <View style={styles.inputContainer}>
      <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccionar Tipo" value="" />
          <Picker.Item label="Película" value="1" />
          <Picker.Item label="Serie" value="2" />
          <Picker.Item label="Documental" value="3" />
          <Picker.Item label="Cortometraje" value="4" />
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
        onPress={handleEditMovie} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Editar pelicula</Text>
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