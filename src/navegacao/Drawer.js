import React from "react";
import { AsyncStorage } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import stackNavigator from "./Stack";
import Offline from "../screens/Offline";
import Languages from "../screens/Languages";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ swipeEnabled: false }} drawerContent={props=> {
      return(
        <DrawerContentScrollView {...props} >
        <DrawerItemList {...props}/>
        <DrawerItem label="Idiomas" onPress={() => {  props.navigation.navigate("Languages") }} />
        <DrawerItem label="Sobre" onPress={() => { props.navigation.navigate("About") }} />
        <DrawerItem label="Sair" onPress={() => { AsyncStorage.removeItem('token'); props.navigation.navigate("Login") }} />
      </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={stackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;