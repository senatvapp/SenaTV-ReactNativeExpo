import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';


const generoMap = {
  "1": "Acción",
  "2": "Comedia",
  "3": "Drama",
  "4": "Terror",
  "5": "Romance",
  "6": "Ciencia Ficción",
  "7": "Musical"
};

const MovieCard = ({ movie }) => {
  const router = useRouter(); // Hook de expo-router para navegar
  const handlePress = () => {
    router.push('detailMoviesUser'); 
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onDelete(movie.id)} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        {movie.imagen_url ? ( // Validación antes de mostrar la imagen
          <Image source={{ uri: movie.imagen_url }} style={styles.image} />
        ) : null}
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Text>{generoMap[movie.genero_contenido_codigo] || "Género desconocido"}</Text>
        <Text>Director: {movie.director}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MovieList = () => {
  const [email, setEmail] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://192.168.1.13:3000/api/contenido'); 
        const data = await response.json();
        setMovies(data); 
      } catch (error) {
        Alert.alert('Error', `Error al obtener las películas: ${error.message}`);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,             // Para ocupar todo el espacio disponible
        justifyContent: "center", // Centra verticalmente
        alignItems: "center",
        backgroundColor: '#91BCBE',   // Centra horizontalmente
      },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  inputContainer: {
    width: "95%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 40,
    marginHorizontal: 10,
  },
  input: {
    margin:5,
    flex: 1,
    height: 40,
    color: "black",
  },
  card: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});