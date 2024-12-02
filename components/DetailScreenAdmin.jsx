
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACK } from '@env';
const CommentCard = ({ comment, onDelete, onEdit }) => {

  console.log(onDelete);
  
  
  return (
    <View style={styles.card}>
      {/* Contenido del comentario */}
      <Text style={styles.commentUser}>{comment.user}</Text>
      <Text style={styles.commentText}>{comment.text}</Text>

      {/* Ícono de basura para eliminar */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="trash" size={16} color="#91BCBE" />
      </TouchableOpacity>
    </View>
  );
};

const generoMap = {
  "1": "Acción",
  "2": "Comedia",
  "3": "Drama",
  "4": "Terror",
  "5": "Romance",
  "6": "Ciencia Ficción",
  "7": "Musical"
};

const MovieScreen = () => {
  const { movieId} = useLocalSearchParams();
  const [movie, setMovie] = useState({});
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userCommentId, setUserCommentId] = useState('');
  
  // Fetch de la información de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${BACK}/api/contenido/${movieId}`);
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
     // Llamar a fetchComments después de obtener los detalles de la película
     if (movieId) {
      fetchComments(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    fetchUserData(); // Se ejecutará solo una vez al montar el componente
  }, []);

  const fetchComments = async (contenidoId) => {
    try {
      const response = await fetch(`${BACK}/api/clasificaciones/${contenidoId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
      
      const data = await response.json();
  
      // Formatear los comentarios según la estructura deseada
      const formattedComments = data.map(comment => ({
        id: comment.id,
        text: comment.comentario,
        contenido_id: comment.contenido_id,
        usuario_id: comment.usuario_id,
        user: comment.usuario_nombre + ' ' + comment.usuario_apellido,
      }));
  
      // Supongamos que tienes un estado para almacenar los comentarios
      setComments(formattedComments);
    } catch (error) {
      Alert.alert('Error', `Error al obtener los comentarios: ${error.message}`);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BACK}/api/contenido/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }
      Alert.alert('Eliminación exitosa', 'La película ha sido eliminada.');
      router.push('/movieTabs/movies');
    } catch (error) {
      console.error('Error al eliminar la película:', error.message);
      Alert.alert('Error', `No se pudo eliminar la película: ${error.message}`);
    }
  };
  const handleEdit = () => {
    router.push({
      pathname: '/editMovie',
      params: { movieId: movie.id },
    });
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newCommentObj = {
        usuario_id: userCommentId, // Aquí puedes reemplazarlo con el usuario real
        comentario: newComment,
        contenido_id: movie.id,
      };
  
      try {
        const response = await fetch(`${BACK}/api/clasificaciones`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommentObj),
        });
  
        if (!response.ok) {
          throw new Error(`Error al agregar el comentario: ${response.statusText}`);
        }
  
        const savedComment = await response.json();
         // Actualiza la lista de comentarios
        // Formatear el comentario según la estructura deseada
        // Agrega el comentario recién guardado a la lista local
        setComments((prevComments) => [...prevComments, savedComment]);

        setNewComment(''); // Limpia el campo de texto
        console.log("Comentario guardado:", comments);
        await fetchComments(movie.id);
      } catch (error) {
        Alert.alert('Error', `No se pudo agregar el comentario: ${error.message}`);
      }
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${BACK}/api/clasificaciones/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el comentario');

      // Eliminar el comentario del estado local
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      Alert.alert('Éxito', 'Comentario eliminado correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Error al leer los datos:", e);
    }
  };
  const fetchUserData = async () => {
    try {
      const userLocalStorage = await getData("user");
      setUserCommentId(userLocalStorage.usuarioEncontrado.id);
       console.log("Datos del usuario:", userLocalStorage);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  

  console.log("Este es el nombre del usuario por fuera",userCommentId);
  

  return (
    <View style={styles.container}>
      <View style={styles.detailSection}>
        {/* Editar película */}
        <TouchableOpacity onPress={() => handleEdit(movie.id)} style={styles.editButton}>
          <Icon name="pencil" size={20} color="#91BCBE" />
        </TouchableOpacity>

        

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
        <TouchableOpacity onPress={() => handleDelete(movie.id)} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#91BCBE" />
        </TouchableOpacity>

      </View>

      {/* Sección de Comentarios */}
      <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Sección de Comentarios */}
      <View style={styles.commentsSection}>
        <ScrollView style={styles.comment}>
          {comments.map((comment, index) => (
            <CommentCard
              key={comment.id || index}
              comment={comment}
              onDelete={() => handleDeleteComment(comment.id)}
              onEdit={handleEdit}
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
          <TouchableOpacity
            style={styles.commentButton}
            onPress={handleAddComment}
          >
            <Icon name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  containerComment: {	
    flex: 1,
  },
  commentsSection: {
    flex: 1,
    marginBottom: 10,
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

