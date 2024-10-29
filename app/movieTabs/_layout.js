// import { Tabs } from 'expo-router';
// import {View, Text, StyleSheet} from 'react-native';

// export default function MovieScreenLayout() {
    
//     return (
//           <View>
//             <Tabs>
//                 <Tabs.Screen 
//                     name="movies" 
//                     options={{title: "Movies"}}
//                 />
//                 <Tabs.Screen 
//                     name="addMovies"
//                     options={{title: "Add Movie"}}
//                 />
//         </Tabs>
//         <Text>sadasddddddddd</Text>
//         </View>
        
//     );
// }
// const styles = StyleSheet.create({
//     containerMain: {
//        flex: 1,
//        backgroundColor: "rgba(145, 188, 190, 1)",
//        alignItems: "center",
//        justifyContent: "center",
//     },
//   });

import { Tabs } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MovieTabsLayout() {
    return (
        <SafeAreaView style={styles.containerMain}>
            <Tabs>
                <Tabs.Screen 
                    name="movies" 
                    options={{ 
                        title: "Movies", 
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="film-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="addMovies" 
                    options={{ 
                        title: "Add Movie", 
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
});