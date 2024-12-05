import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BACK } from '@env';



const generoMap = {
  "1": "Acción",
  "2": "Comedia",
  "3": "Drama",
  "4": "Terror",
  "5": "Romance",
  "6": "Ciencia Ficción",
  "7": "Musical"
};


const MovieCard = ({ movie, onDelete }) => {
  const router = useRouter();
    
  const handlePress = () => {
    router.push({
      pathname: '/detailMoviesAdmin',
      params:  {movieId: movie.id },
    });
  };


  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onDelete(movie.id)} style={styles.closeButton}>
         <Icon name="trash" size={16} color="#91BCBE" />
        </TouchableOpacity>
        {movie.imagen_url ? ( // Validación antes de mostrar la imagen
          <Image source={{ uri: movie.imagen_url }} style={styles.image} />
        ) : null}
        <Text style={styles.title}>{movie.nombre}</Text>
        <Text>{movie.anio_lanzamiento}</Text>
        <Text>{generoMap[movie.genero_contenido_codigo] || "Género desconocido"}</Text>
        <Text>Director: {movie.director}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MovieList = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
 
  const fetchMovies = async () => {
    try {
      const response = await fetch(`${BACK}/api/contenido`);
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      Alert.alert('Error', `Error al obtener las películas: ${error.message}`);
    }
  };
  // useEffect(() => {
  //    fetchMovies();
  // }, []);

  useEffect(() => {
    // Iniciar el intervalo de pooling cada segundo (1000 ms)
    const intervalId = setInterval(fetchMovies, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    // Filtrar las películas en función del texto ingresado
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.nombre.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]); // Ejecutar el filtrado cada vez que cambie la búsqueda o las películas


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BACK}/api/contenido/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }

      // Elimina la película del estado y actualiza la interfaz
      setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
      Alert.alert('Eliminación exitosa', 'La película ha sido eliminada.');
    } catch (error) {
      console.error('Error al eliminar la película:', error.message);
      Alert.alert('Error', `No se pudo eliminar la película: ${error.message}`);
    }
  };


  return (
    <View style={styles.parentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={setSearchQuery} 
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#91BCBE',
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
    margin: 5,
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
    right: 1,
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
