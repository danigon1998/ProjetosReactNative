import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface IProps{
    resposta:string
    alcool:number|undefined
    gasolina:number|undefined
    fechar:()=>void
}

export default function Compensa({resposta, alcool, gasolina, fechar}:IProps){
    return(
        <View style={styles.container}>
            <Image
                source={require('../img/gas.png')}
                />
            <Text style={styles.resposta}>{resposta}</Text>
            <Text style={styles.text}>Com os preços:</Text>
            <Text style={styles.textDois}>Álcool: R$ {alcool}</Text>
            <Text style={styles.textDois}>Gasolina: R$ {gasolina}</Text>
            <TouchableOpacity style={styles.btn} onPress={fechar}>
                <Text style={styles.btnText}>
                    Calcular novamente
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#121212"
      },
    resposta:{
        fontSize:20,
        fontWeight:"bold",
        color:"green",
        marginTop:20,
        marginBottom:20
    },
    text:{
        fontSize:18,
        fontWeight:"bold",
        color:"#fff",
        marginBottom:10
    },
    textDois:{
        fontWeight:"bold",
        color:"#fff",
        marginBottom:10
    },
    btn:{
        backgroundColor:"#ff0000",
        borderRadius:10,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    btnText:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold"
    }
    
})