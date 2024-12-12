import React, {Component} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput, Button } from "react-native";

interface IProps{

}

interface IState{
  
}

class App extends Component <IProps, IState>{

  render(): React.ReactNode {

    return(
      <View style={styles.container}>

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
  }
});

export default App;