import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const image = require("./assets/senatv.png");
export default function App(props) {
  const { onPress, title = "Save" } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.text}>
        asdas, organiza y disfruta tus series como nunca antes.
      </Text>
      <Image source={image} style={styles.image} />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>Iniciar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 52,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(145, 188, 190, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 40,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "center",
    marginBottom: 50,
  },
});
