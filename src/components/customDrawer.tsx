import React from "react";
import { View, Text, StyleSheet, Image } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawer(props:any){
  return(
    <DrawerContentScrollView {...props}>
      <View style={{
        width: "100%",
        height: 85,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
      }}>
        <Image
        source={require("../img/perfil.png")}
        style={{
          width: 65,
          height: 65,
        }}
        />
        <Text style={{
            fontSize: 17,
            marginTop: 5,
            color: "#000"
        }}>
            Bem Vindo!
        </Text>
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}