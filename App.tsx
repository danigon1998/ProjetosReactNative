import React, {useRef, useEffect} from "react";
import {View, Text, StyleSheet, Animated} from "react-native";

export default function App(){

  const larAnimada = useRef(new Animated.Value(0)).current;
  const altAnimada = useRef(new Animated.Value(50)).current;
  const opAnimada = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    
    Animated.timing(larAnimada,{
      toValue:100,
      duration:1000,
      useNativeDriver:false
    }).start()

  }, []);

  let porcentagemLargura = larAnimada.interpolate({
    inputRange:[0,100],
    outputRange:["0%","100%"]
  })

  return(
    <View style={styles.container}>
      <Animated.View style ={{
        width:porcentagemLargura,
        height:altAnimada,
        justifyContent:"center",
        backgroundColor:"#4169E1",
        opacity:opAnimada
      }}>
        <Text style={{
          textAlign:"center",
          color:"#fff",
          fontSize:22,
          fontWeight:"bold"
        }}>Carregando...</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    color:"#fff",
    fontSize:30,
    fontWeight:"bold"
  }
})