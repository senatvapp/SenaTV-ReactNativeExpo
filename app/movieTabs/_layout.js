import { Tabs } from 'expo-router';


export default function MovieTabsLayout() {
    return (
      <Tabs>
        <Tabs.Screen name="addMovies" options={{ title: "Inbox" }} />
        <Tabs.Screen name="movies" options={{ title: "Lobby" }} />
    </Tabs>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
});