import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Contato() {

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Página Contato</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#000",
        fontSize: 30,
        fontWeight: "bold"
    }
}) 