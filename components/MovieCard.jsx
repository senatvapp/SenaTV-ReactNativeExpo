import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const MovieCard = ({ movie, onDelete }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onDelete(movie.id)} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.year}</Text>
      <Text>{movie.genre}</Text>
      <Text>Director: {movie.director}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    card: {
      width: 150,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      margin: 10,
      alignItems: 'center',
      position: 'relative',
    },
    image: {
      width: 100,
      height: 150,
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    closeButton: {
      position: 'absolute',
      top: 5,
      right: 5,
    },
    closeText: {
      color: 'red',
      fontWeight: 'bold',
    },
  });
