import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Alert} from "react-native";
import Compensa from "./src/modal";

export default function App(){

  const [alcool, setAlcool] = useState('0')
  const [gasolina, setGasolina] = useState('0')
  const [resultado, setResultado] = useState<string>("")
  const [visivel, setVisivel] = useState<boolean>(false)

  function handleAlcoolChange(text:string){
    setAlcool(text)
  }

  function handleGasolinaChange(text:string){
    setGasolina(text)
  }

  function calcular(){
    if(alcool && gasolina && !isNaN(Number(alcool)) && !isNaN(Number(gasolina))){
      if(Number(alcool) / Number(gasolina) < 0.7){
        setResultado("Compensa usar Álcool")
      }else{
        setResultado("Compensa usar Gasolina")
      }
      setVisivel(true)
    }
    else{
      Alert.alert("Preencha os campos corretamente")
    }
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('./src/img/logo.png')}
      />
      <Text style={styles.titulo}>Qual é a melhor opção?</Text>
      <View style={styles.containerDois}>
        <Text style={styles.text}>Álcool (preço por litro):</Text>
        <TextInput
        style={styles.input}
        value={String(alcool)}
        onChangeText={handleAlcoolChange}
        />
        <Text style={styles.text}>Gasolina (preço por litro):</Text>
        <TextInput
        style={styles.input}
        value={String(gasolina)}
        onChangeText={handleGasolinaChange}
        />
        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visivel}>
        <Compensa resposta={resultado} alcool={Number(alcool)} gasolina={Number(gasolina)} fechar={()=>{setVisivel(false)}}/>
      </Modal>
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
  titulo:{
    color:"#fff",
    fontSize:30,
    fontWeight:"bold",
    marginTop:20,
    marginBottom:20
  },
  containerDois:{
    width:"100%",
    padding:20
  },
  text:{
    color:"#fff",
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10
  },
  input:{
    backgroundColor:"#fff",
    borderRadius:10,
    padding:10,
    marginBottom:20
  },
  botao:{
    backgroundColor:"#ff0000",
    borderRadius:10,
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20
  },
  textoBotao:{
    color:"#fff",
    fontSize:20,
    fontWeight:"bold"
  }
})