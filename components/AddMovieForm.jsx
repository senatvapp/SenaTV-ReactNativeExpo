import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [image, setImage] = useState('');

  const handleAddMovie = () => {
    const newMovie = {
      id: Math.random().toString(),
      title,
      year,
      genre,
      director,
      image,
    };
    onAddMovie(newMovie);
    setTitle('');
    setYear('');
    setGenre('');
    setDirector('');
    setImage('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Año"
        value={year}
        onChangeText={setYear}
        style={styles.input}
      />
      <TextInput
        placeholder="Género"
        value={genre}
        onChangeText={setGenre}
        style={styles.input}
      />
      <TextInput
        placeholder="Director"
        value={director}
        onChangeText={setDirector}
        style={styles.input}
      />
      <TextInput
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <Button title="Añadir Película" onPress={handleAddMovie} />
    </View>
  );
};

export default AddMovieForm;

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});