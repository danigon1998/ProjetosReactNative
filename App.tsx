import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

import api from "./src/services/api";
import Filmes from "./src/Filmes";

export default function App(){

  const [filmes, setFilmes] = useState<IFilmes[]>([])

  useEffect(()=>{
    
    async function loadFilmes(){
      const response = await api.get("r-api/?api=filmes");
      setFilmes(response.data)
    }

    loadFilmes();

  },[])

  return(
    <View style={styles.container}>
      
      <FlatList
        data={filmes}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Filmes data={item} />}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    
  },
  text:{
    color:"#fff",
    fontSize:30,
    fontWeight:"bold"
  }
})