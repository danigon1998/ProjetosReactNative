import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Keyboard} from "react-native";
import api from "./src/services/api";

export default function App(){

  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState<any>(null);
  const inputRef = useRef<TextInput>(null);

  async function buscar(){
    if(cep == ""){
      Alert.alert("Digite um CEP válido");
      return;
    }
    try{
      const response = await api.get(`${cep}/json/`)
      setCepUser(response.data)
      Keyboard.dismiss()
    }
    catch(error){
      Alert.alert("Erro ao buscar CEP");
      setCep("");
      return;
    }
  }

  function limpar(){
    setCep("");
    inputRef.current?.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:"center"}}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput
        style={styles.input}
        placeholder="Ex: 79003241"
        value={cep}
        onChangeText={(text)=>{setCep(text)}}
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, {backgroundColor:"#1D75CD"}]}
        onPress={buscar}
        >
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, {backgroundColor:"#CD3E1D"}]}
        onPress={limpar}
        >
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && 
      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
      </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  input:{
    backgroundColor:"#FFF",
    borderWidth:1,
    borderColor:"#DDD",
    width:"90%",
    borderRadius:5,
    padding:10,
    fontSize:18
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize:25,
    fontWeight:"bold"
  },
  areaBtn:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:15,
    justifyContent:"space-around",
  },
  botao:{
    height:50,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    padding:10
  },
  textBtn:{
    color:"#FFF",
    fontSize:18,
    fontWeight: 500
  },
  resultado:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  itemText:{
    fontSize:22,
    color:"#000"
  }
})