import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Keyboard} from "react-native";
import PickerItem from "./src/picker";
import { api } from "./src/services/api";

export default function App(){

  const [moedas,setMoedas] = useState<IMoedas[]>([])
  const [loading,setLoading] = useState(true)
  const [moedaSelecionada,setMoedaSelecionada] = useState<IMoedas>()
  const [moedaBValor,setMoedaBValor] = useState(0)

  const [valorMoeda,setValorMoeda] = useState<Number|null>(null)
  const [valorConvertido,setValorConvertido] = useState<String|Number>(0)

  useEffect(()=>{
    async function loadMoedas() {
      const response = await api.get("all");
      let arrayMoedas = [] as IMoedas[]      
      Object.keys(response.data).map((key)=>{
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })
      setMoedas(arrayMoedas)
      setMoedaSelecionada(arrayMoedas[0])
      setLoading(false)
    }

    loadMoedas();

  },[])

  async function converter(){
    if(moedaBValor === 0 || moedaSelecionada === undefined){
      return
    }

    console.log(moedaSelecionada)
    console.log(moedaBValor)

    const response = await api.get(`all/${moedaSelecionada.key}-BRL`)

    console.log(response)

    let resultado = response.data[moedaSelecionada.key].ask * moedaBValor

    console.log(resultado)

    setValorConvertido(resultado.toLocaleString("pt-BR",{style:"currency", currency: "BRL"}))
    setValorMoeda(moedaBValor)
    Keyboard.dismiss()
  }

  if(loading){
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <ActivityIndicator color={"#FFF"} size={"large"} />
      </View>
    )
  }
  else{
    return(
      <View style={styles.container}>
        <View style={styles.moedaArea}>
          <Text style={styles.text}>Selecione sua moeda</Text>
          <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onChange={(moeda:IMoedas)=>setMoedaSelecionada(moeda)}
          />
        </View>
        <View style={styles.areaValor}>
          <Text style={styles.text}>Digite o valor para converter em (R$)</Text>
          <TextInput 
          style={styles.input} 
          placeholder="EX: 1.50" 
          keyboardType="numeric" 
          value={String(moedaBValor)} 
          onChangeText={(valor) => setMoedaBValor(Number(valor))}/>
        </View>
        <TouchableOpacity style={styles.areaButton} onPress={converter}>
          <Text style={styles.textButton}>Converter</Text>
        </TouchableOpacity>
        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda?.toFixed(2)} {moedaSelecionada?.key}
            </Text>

            <Text style={{fontSize:18, fontWeight: 500, color:"#000", margin:8}}>
              Corresponde a
            </Text>

            <Text style={styles.valorConvertido}>
              {String(valorConvertido)}
            </Text>
          </View>
        )}
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"#101215",
    paddingTop:40
  },
  moedaArea:{
    width:"90%",
    backgroundColor:"#f9f9f9",
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    padding:8,
    marginBottom:1
  },
  text:{
    color:"#000",
    fontSize:16,
    fontWeight:500,
    paddingLeft: 5,
    paddingTop: 5
  },
  areaValor:{
    width:"90%",
    backgroundColor:"#f9f9f9",
    paddingBottom:8,
    paddingTop:8,
  },
  input:{
    backgroundColor:"#f9f9f9",
    fontSize:18,
    padding:8,
    color:"#000"
  },
  areaButton:{
    width:"90%",
    backgroundColor:"#fb4b57",
    height:45,
    alignItems:"center",
    justifyContent:"center",
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8
  },
  textButton:{
    color:"#000",
    fontSize:16,
    fontWeight:"bold",
  },
  areaResultado:{
    width:"90%",
    backgroundColor:"#FFF",
    marginTop:34,
    borderRadius:8,
    alignItems:"center",
    justifyContent:"center",
    padding:24
  },
  valorConvertido:{
    color:"#000",
    fontSize:28,
    fontWeight:"bold",
  }
})