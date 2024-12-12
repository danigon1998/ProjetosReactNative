import React, {Component} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput, Button } from "react-native";

interface IProps{

}

interface IState{
  timer: number;
  ultimo: number | undefined;
}

class App extends Component <IProps, IState>{

  private timerInterval: NodeJS.Timeout | undefined = undefined;

  constructor(props:IProps){
    super(props);
    this.state = {timer: 0.0, ultimo: undefined};
  }

  vai = () =>{
    if(this.timerInterval){
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
    else{
      this.timerInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer + 0.1,
        }));
      }, 100);
    }
  }

  limpar = () =>{
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
    this.setState({ timer: 0.0, ultimo: this.state.timer});
  }

  render(): React.ReactNode {

    return(
      <View style={styles.container}>
        <Image 
          source={require('./src/cronometro.png')}
          style={styles.cronometro}
        />
        <Text style={styles.timer}>{this.state.timer.toFixed(1)}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.vai}>
            <Text style={styles.btnText}>
              {this.timerInterval? 'Parar' : 'Vai'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltima}>
          <Text style = {styles.ultima} >
            Ultimo Tempo: {this.state.ultimo?.toFixed(1)}
          </Text>
        </View>

      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  cronometro: {
    width: 250,
    height: 250
  },
  timer: {
    marginTop: -160,
    fontSize: 65,
    color: '#FFF',
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima: {
    marginTop: 40
  },
  ultima: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
});

export default App;