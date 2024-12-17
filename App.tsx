import React, {Component} from "react";
import { View, Text, StyleSheet, Switch} from "react-native";
import Slider from "@react-native-community/slider";

interface IProps{

}

interface IState{
  
}

class App extends Component <IProps, IState>{

  constructor(props: IProps){
    super(props);
    this.state = {
      
    }
  }

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
    marginTop:15,
  },
});

export default App;
