import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { db } from "./firebaseConnection";
import { deleteDoc, doc, } from "firebase/firestore";

export default function Users({data, handleEdit}:any){

    async function handleDeleteitem(){
        await deleteDoc(doc(db, "users", data.id))
        .then(()=>{
            Alert.alert("Deletado com sucesso")
        })
        .catch((error)=>{console.log(error)})
    }

    function handleEditUser(){
        handleEdit(data)
    }

  return(
    <View style={styles.container}>
        <Text style={styles.text}>Nome:{data.nome}</Text>
        <Text style={styles.text}>Idade:{data.idade}</Text>
        <Text style={styles.text}>Cargo:{data.cargo}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDeleteitem}>
            <Text style={styles.textButton}>Deletar Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditUser}>
            <Text style={styles.textButton}>Editar Usuario</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f1f1f1',
    margin: 3,
    padding: 10
  },
  text:{
    color: '#000',
    fontSize: 16,
  },
  button:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textButton:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})