import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function MainLayout() {
    return (
        <View style={styles.containerMain}>
            <Stack>
                {/* Primera ruta que se mostrará */}
                <Stack.Screen name="index" options={{ headerShown: false }} />
                {/* Aquí es donde activaremos las Tabs */}
                <Stack.Screen name="movieTabs" options={{ headerShown: false }} />
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
});