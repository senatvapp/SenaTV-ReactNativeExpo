import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
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
const CommentCard = ({ comment, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      {/* Contenido del comentario */}
      <Text style={styles.commentUser}>{comment.user}</Text>
      <Text style={styles.commentText}>{comment.text}</Text>

      {/* Ícono de basura para eliminar */}
      <TouchableOpacity onPress={() => onDelete(comment.id)} style={styles.deleteButton}>
        <Icon name="trash" size={16} color="#91BCBE" />
      </TouchableOpacity>
    </View>
  );
};

const MovieScreen = () => {
  const { movieId } = useLocalSearchParams();
  const [movie, setMovie] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const router = useRouter();

  const [comments, setComments] = useState([
    { id: '1', user: 'Usuario 1', text: 'Me pareció genial la película, tiene una muy buena trama' },
    { id: '2', user: 'Usuario 2', text: 'No me gustó, muy difícil de entender.' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Fetch de la información de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:3000/api/contenido/${movieId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la película');
        }
        const data = await response.json();
        setMovie(data);
        console.log("Movie fetched:", data);
      } catch (error) {
        Alert.alert('Error', `Error al obtener la película: ${error.message}`);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);



  const handleDeleteComments = (id) => {
    setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
  };

  

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Math.random().toString(),
        user: 'Usuario nuevo',
        text: newComment,
      };
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailSection}>
        {/* Editar película */}
        

        

        {/* Título y Año */}
        <View style={styles.header}>
          <Text style={styles.title}>{movie.nombre}</Text>
          <Text style={styles.year}>{movie.anio_lanzamiento}</Text>
        </View>

        {/* Imagen de la película */}
        <Image
          style={styles.movieImage}
          source={{ uri: movie.
            imagen_url || 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg' }}
        />
        
        {/* Género y Descripción */}
        <View style={styles.header}>
        <Text style={styles.genre}>
            Género: {generoMap[movie.genero_contenido_codigo] || "Género desconocido"}
          </Text>
          <Text style={styles.description}>{movie.sinopsis}</Text>
        </View>

        {/* Eliminar película */}
        

      </View>

      {/* Sección de Comentarios */}
      <View style={styles.commentsSection}>
        <ScrollView style={styles.comment}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={() => handleDelete(comment.id)}
              onEdit={() => handleEdit(comment.id)}
            />
          ))}
        </ScrollView>

        {/* Input para nuevo comentario */}
        <View style={styles.commentInputSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Escribir comentario"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Icon name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop:50,
    backgroundColor: '#91BCBE',
  },
  detailSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
  },
  closeIcon: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 16,
    color: 'gray',
  },
  movieImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  genre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  commentsSection: {
    marginTop: 20,
  },
  comment: {
    marginTop: 20,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  commentInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15, // Para bordes redondeados
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 5,
    fontSize: 14,
    color: '#333',
  },
  commentButton: {
    backgroundColor: '#91BCBE', // Color de fondo del botón
    padding: 10,
    borderRadius: 50, // Bordes redondeados para el botón
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

