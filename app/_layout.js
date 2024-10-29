import {View, Text} from 'react-native';
import { Slot, Tabs} from 'expo-router';
import { StyleSheet } from 'react-native';


export default function Layout(props){
    return (
        
        <View style={styles.containerMain}>
            <Slot />
        </View>
    );
}


const styles = StyleSheet.create({
    containerMain: {
       flex: 1,
       backgroundColor: "rgba(145, 188, 190, 1)",
       alignItems: "center",
       justifyContent: "center",
    },
  });