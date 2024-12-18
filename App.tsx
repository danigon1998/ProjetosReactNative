import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, Switch, Button, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

interface IProps{

}

interface ICliente{
  nome: string;
  idade: string;
  sexo: string;
  limite: number;
  estudante: boolean;
}

interface IState{
  cliente: ICliente;
  preenchido: boolean;
}

class App extends Component <IProps, IState>{

  constructor(props: IProps){
    super(props);
    this.state = {
      cliente: {
        nome: "",
        idade: "",
        sexo: "Masculino",
        limite: 0,
        estudante: false
      },
      preenchido: false
    }
  }

  handlePreenchido(): void{
    if(this.state.cliente.nome !== "" && this.state.cliente.idade !== "" && this.state.cliente.sexo !== "" && this.state.cliente.limite !== 0){
      this.setState({
        preenchido: true
      })
    }
    else{
      this.setState({
        preenchido: false
      })
    }
  }

  handleIdadeChange = (text: string) => {
    if (/^[0-9]*$/.test(text)) {
      this.setState({
        cliente: {
          ...this.state.cliente,
          idade: text,
        },
      });
      this.handlePreenchido();
    }
  };

  render(): React.ReactNode {

    return(
      <View style={styles.container}>
        <Text style={styles.titulo}>Abertura de Conta</Text>
        <Text style = {styles.titulo}>Nome</Text>
        <TextInput style = {styles.input} placeholder="Digite seu nome" value={this.state.cliente.nome} onChangeText={
          (text) => {
            this.setState({
              cliente: {
                ...this.state.cliente,
                nome: text
              }
            }, this.handlePreenchido)
            
          }
        }/>
        <Text style = {styles.titulo}>Idade</Text>
        <TextInput style = {styles.input} placeholder="Digite sua idade" value={this.state.cliente.idade} onChangeText={this.handleIdadeChange}/>
        <Text style = {styles.titulo}>Sexo</Text>
        <Picker style={styles.picker} onValueChange={
          (itemValue: string) => {
            this.setState({
              cliente: {
                ...this.state.cliente,
                sexo: itemValue
              }
            }, this.handlePreenchido)
          }
        }>
          <Picker.Item key={1} value={"Masculino"} label="Masculino" />
          <Picker.Item key={2} value={"Feminino"} label="Feminino" />
        </Picker>
        <Text style = {styles.titulo}>Limite</Text>
        <Slider minimumValue={0} maximumValue={1000} value={this.state.cliente.limite}  onValueChange={
          (value: number) => {
            this.setState({
              cliente: {
                ...this.state.cliente,
                limite: Math.round(value)
              }
            }, this.handlePreenchido)
          }
        }/>
         <Text style= {styles.titulo}>Valor Selecionado: {this.state.cliente.limite.toFixed(0)}</Text>
        <Text style = {styles.titulo}>Estudante?</Text>
        <Switch value={this.state.cliente.estudante} onValueChange={
          () => {
            this.setState({
              cliente: {
                ...this.state.cliente,
                estudante: !this.state.cliente.estudante
              }
            })
          }
        }/>
        <View style={styles.botao}>
          <Button color={"#0097a7"}  title="Enviar" disabled={!this.state.preenchido} onPress={() => {
            Alert.alert(
            "Datos del Cliente",
            `Nome: ${this.state.cliente.nome}
Idade: ${this.state.cliente.idade}
Sexo: ${this.state.cliente.sexo}
Limite: ${this.state.cliente.limite}
Estudante: ${this.state.cliente.estudante ? "Sim" : "Não"}`
          );
           }} />
         </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15,
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#222',
    margin: 10,
    fontSize: 20,
    padding: 10,
  },
  picker: {
    margin: 5,
  },
  botao: {
    marginTop: 15,
    fontSize: 20,
  }
});

export default App;
