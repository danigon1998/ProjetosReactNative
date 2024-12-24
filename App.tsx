import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import FormUsers from "./src/formUsers";
import { auth } from "./src/.firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function App(){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [authUser, setAuthUser] = useState<any>(null);

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
      if(user){
        setAuthUser({
          email: user.email,
          uid: user.uid
        })
        setLoading(false)
      }else{
        setAuthUser(null)
        setLoading(false)
      }
    })
  }, [])

  async function handleCreateUser(){
    await createUserWithEmailAndPassword(auth, email, password)
    .then((user)=>{
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  async function handlelogin(){
    await signInWithEmailAndPassword(auth, email, password)
    .then((user)=>{
      console.log(user)
      Alert.alert("Logado com sucesso")
      setAuthUser({
        email: user.user.email,
        uid: user.user.uid
      })
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential'){
        Alert.alert("Senha ou Email invalido")
      }
      console.log(error.code)
    })

  }

  async function handleLogout() {
        await signOut(auth)
        .then(()=>{
          setAuthUser(null)
          Alert.alert("Deslogado com sucesso")
        })
        .catch((error)=>{
          console.log(error)
        })
  }
  
  if(authUser){
    return <FormUsers/>
  }

  return(
    <View style={styles.container}>
      
      {loading && <Text style={{fontSize:20, marginLeft:8, color:"#000"}}>Carregando Infromações...</Text>}

      <Text style={{marginLeft:8, fontSize:18, color:"#000"}}>Email:</Text>
      <TextInput
        value={email} 
        style={styles.input}
        placeholder="Digite seu email"
        onChangeText={(text)=>setEmail(text)}
      />
      <Text style={{marginLeft:8, fontSize:18, color:"#000"}}>Senha:</Text>
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handlelogin}>
        <Text style={{marginLeft:8, fontSize:18, color:"#fff"}}>Fazer login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={{marginLeft:8, fontSize:18, color:"#fff"}}>Criar Conta</Text>
      </TouchableOpacity>
      {authUser && 
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={{marginLeft:8, fontSize:18, color:"#fff"}}>Sair</Text>
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  input:{
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  button:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems:"center",
    justifyContent:"center",
    width: '80%',
    height: 50,
    marginLeft: 35,
  }
})