import React from "react";
import {createDrawerNavigator }from '@react-navigation/drawer';
import StackRoutes from "./stackRoutes";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomDrawer from "../components/customDrawer";

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
      <Drawer.Navigator
        drawerContent={CustomDrawer}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#00DAE4",
          drawerActiveTintColor: "#FFF",
          drawerInactiveBackgroundColor: "#F1F1F1",
          drawerInactiveTintColor: "#000",
          drawerItemStyle: {
            marginVertical: 8,
          },
          
        }}
      >
        <Drawer.Screen
        name="Home"
        component={StackRoutes}
        options={{
          title: "Home",
          drawerIcon: ({focused, size, color}) => (
            <Icon
              name="home"
              size={size}
              color={color}
            />
          )
        }}
        />
        <Drawer.Screen
        name="Sobre"
        component={Sobre}
        />
        <Drawer.Screen
        name="Contato"
        component={Contato}
        />
      </Drawer.Navigator>
  );
}

