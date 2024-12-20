import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface IDetalhes{
  filme: IFilmes,
  voltar: () => void,
}

export default function Detalhes({filme,voltar}:IDetalhes){
  return(
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
          <Text style={{color:'#FFF', fontSize: 16}}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>
          {filme.nome}
        </Text>
        <Text style={styles.sinopse}>
          Sinopse:
        </Text>
        <Text style={styles.descricao}>
          {filme.sinopse}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modalContainer:{
    height: '80%',
    backgroundColor: '#121212',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  btnVoltar:{
    backgroundColor: '#E52246',
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  titulo:{
    textAlign:'center',
    color: '#FFF',
    padding: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  sinopse:{
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 8,
  },
  descricao:{
    color: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  }
})