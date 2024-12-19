import React, {useState, useEffect, useMemo, useRef} from "react";
import {View,Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){

  const [nome, setNome] = useState('');
  const [input, setInput] = useState('');
  const nomeInput = useRef<TextInput>(null);

  useEffect(()=>{
    async function getNome(){
      const value = await AsyncStorage.getItem('nomes');
      if(value !== null){
        setNome(value);
      }
    }
    getNome();

    //return(()=>{})

  },[]);

  useEffect(()=>{
    async function saveNome(){
      await AsyncStorage.setItem('nomes',nome);
    }
    saveNome();
  },[nome])

  function alterarNome(){
    setNome(input);
    setInput('');
  }

  function novoNome(){
    if(nomeInput.current){
      nomeInput.current.focus();
    }
  }

  //Usado para evitar ter que fazer contas de forma continuada
  const letrasNome = useMemo(()=>{
    return nome.length;
  },[nome])

  return(
    <View style={styles.container}>
      <TextInput value={input} style={{borderWidth:1, width:'80%', marginBottom:10}} placeholder="Digite seu nome" onChangeText={(texto)=>setInput(texto)} ref={nomeInput}/>
      <TouchableOpacity style={styles.btn} onPress={alterarNome}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>Olá Mundo</Text>
      <Text style={styles.texto}>Meu nome é {nome}</Text>
      <Text style={styles.texto}>Número de letras: {letrasNome}</Text>
      <TouchableOpacity style={styles.btn} onPress={novoNome}>
        <Text style={styles.btnText}>Novo nome</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:15,
    justifyContent:'center',
    alignItems:'center'
  },
  texto:{
    fontSize:25,
    color:'black'
  },
  btn:{
    backgroundColor:'#FF0000',
    alignItems:'center',
    padding:10,
    borderRadius:10
  },
  btnText:{
    color:'#FFFFFF',
    fontSize:17,
    fontWeight:'bold'
  }
})