import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

  const navigation = useNavigation<any>();

  function navegaDetalhes(){
    navigation.navigate('Detalhes');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Home</Text>
       <TouchableOpacity onPress={navegaDetalhes}>
              <Text>Ir para Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
              <Text>Abrir Drawer</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff0000"
    },
    text: {
        color: "#000",
        fontSize: 30,
        fontWeight: "bold"
    }
}) 