import React, {useEffect, useState, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { db, auth } from "./.firebaseConnection";
import { doc, getDoc, getDocs, onSnapshot, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import {signOut} from "firebase/auth"
import Users from "../src/user";

export default function FormUsers(){

  const [nome,setNome] = useState('');
  const [idade,setIdade] = useState('');
  const [cargo,setCargo] = useState('');

  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState("");

  const inputNome = useRef<any>();

  useEffect(()=>{
    
    async function getDados(){
      const usersRef = collection(db, "users");

      onSnapshot(usersRef, (snapshot)=>{
        let lista: any[] = [];
        snapshot.forEach((doc)=>{
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo
          })
        })
        setUsers(lista);
      })



      // await getDocs(usersRef).then((snapshot)=>{
      //   let lista: any[] = [];
      //   snapshot.forEach((doc)=>{
      //     lista.push({
      //       id: doc.id,
      //       nome: doc.data().nome,
      //       idade: doc.data().idade,
      //       cargo: doc.data().cargo
      //     })
      //   })
      //   setUsers(lista);
      // }).catch((error)=>{
      //   console.log(error)
      // })
    }

    getDados();

  }, [])

  async function handleRegister(){
    if(nome !== '' && idade !== '' && cargo !== ''){
     if(isEditing !== ""){
      await updateDoc(doc(db, "users", isEditing), {
        nome: nome,
        idade: idade,
        cargo: cargo
      })
      .then(()=>{
        setNome('')
        setIdade('')
        setCargo('')
        setIsEditing('')
      })
      .catch((error)=>{
        console.log(error)
      })
     }else{
      await addDoc(collection(db, "users"), {
        nome: nome,
        idade: idade,
        cargo: cargo
      })
      .then(()=>{
        setNome('')
        setIdade('')
        setCargo('')
      })
      .catch((error)=>{
        console.log(error)
      })
     }
    }
  }

  function handleToggle(){
    setShowForm(!showForm)
  }

  function editUser(data:any){
    inputNome.current?.focus()
    setNome(data.nome)
    setIdade(data.idade)
    setCargo(data.cargo)
    setIsEditing(data.id)
  }

  async function handleLogout(){
    await signOut(auth)
  }

  return (
    <View style={styles.container}>
      {showForm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={(text)=>setNome(text)}
            ref={inputNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={idade}
            onChangeText={(text)=>setIdade(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cargo"
            value={cargo}
            onChangeText={(text)=>setCargo(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.textButton}>{isEditing?"Editar":"Cadastrar"}</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
          <Text style={styles.textButton}>{showForm? "Esconder Formulario" : "Mostrar Formulario"}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Lista de Usuarios</Text>
      <FlatList
      style={styles.flatList}
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item})=> <Users data={item} handleEdit={(item: any) => editUser(item)}/>
      }
      />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    lineHeight: 30,
    textDecorationStyle: 'dotted',
    textDecorationColor: '#000',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    fontStyle: 'italic',
    fontFamily: 'Roboto',
  },
  button:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textButton:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 30,
  },
  input:{
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
  },
  flatList:{
    width: '80%',
    marginTop: 20,
  }
})