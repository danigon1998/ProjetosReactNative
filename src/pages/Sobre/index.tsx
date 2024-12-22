import React, {useLayoutEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Sobre() {

    const navigation = useNavigation<any>();

    function navegaContato() {
        navigation.navigate("Contato")
    }

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Página Sobre</Text>
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