import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import image from "../assets/senatv.png";
import { useRouter } from "expo-router"; 

export default function WelcomeScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.text}>
            Descubre, organiza y disfruta tus series como nunca antes.
        </Text>
        <Image source={image} style={styles.image} />
            <Pressable  style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.5 : 1 }, // Cambia la opacidad si está presionado
        ]}
        onPress={() => router.push("login")}>
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
      