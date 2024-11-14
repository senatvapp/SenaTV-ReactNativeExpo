import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  // Obtenemos el id de la ruta
  // Datos de la película almacenados en useState
  const [movie, setMovie] = useState({
    title: 'Mulholland Drive',
    year: '2001',
    genre: 'Thriller',
    description: 'It tells the story of an aspiring actress named Betty Elms (Watts), newly arrived in Los Angeles, who meets and befriends an amnesiac woman (Harring) recovering from a car accident. The story follows several other vignettes and characters, including a Hollywood film director (Theroux).',
    image: 'https://image.tmdb.org/t/p/w500/example.jpg' // Cambia esto a la URL real de la imagen
  });

  const [comments, setComments] = useState([
    { id: '1', user: 'Usuario 1', text: 'Me pareció genial la película, tiene una muy buena trama' },
    { id: '2', user: 'Usuario 2', text: 'No me gustó, muy difícil de entender.' },
  ]);
  
  const [newComment, setNewComment] = useState('');

  const handleDelete = (id) => {
    setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
  };

  const handleEdit = (id) => {
    // Lógica para editar el comentario
    console.log("Editar comentario con ID:", id);
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
        {/* Cerrar screen */}
        <TouchableOpacity onPress={() => onEdit(comment.id)} style={styles.editButton}>
         <Icon name="pencil" size={20} color="#91BCBE" />
        </TouchableOpacity>

        {/* Título y Año */}
        <View style={styles.header}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>

        {/* Imagen de la película */}
        {/* <Image source={{ uri: movie.image ? movie.image : 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg' }} onError={() => console.log('Error al cargar la imagen.')} style={styles.image} /> */}
        <Image
          style={styles.movieImage}
          source={{ uri: movie.image }} // Imagen de la película desde el estado
        />
        <View style={styles.header}>
          {/* Género */}
          <Text style={styles.genre}>Género: {movie.genre}</Text>
          {/* Descripción */}
          <Text style={styles.description}>{movie.description}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(comment.id)} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="#91BCBE" />
      </TouchableOpacity>
        
      </View>

      {/* Comentarios */}
      <View style={styles.commentsSection}>
        <ScrollView style={styles.comment}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={handleDelete}
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
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Icon name="send" size={16} color="white" /> {/* Ícono de enviar */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default MovieScreen;
