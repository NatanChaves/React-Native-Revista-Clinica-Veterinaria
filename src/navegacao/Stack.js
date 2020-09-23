import React from  'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'


import Home from '../screens/Home'
import HomeEsp from '../screens/HomeEsp'
import Login from '../screens/Login'
import AuthOrApp from '../screens/AuthOrApp'
import Magazine from '../screens/Magazine'
import Offline from '../screens/Offline'
import MagazineOffline from '../screens/MagazineOffline'
import MagazineOfflineEsp from '../screens/MagazineOfflineEsp'
import SignIn from '../screens/SignIn'
import Search from '../screens/Search'
import Languages from '../screens/Languages'
import MagazineEsp from '../screens/MagazineEsp'
import Forget from '../screens/Forget'
import About from '../screens/About'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default props => (
    <Stack.Navigator screenOptions={{headerShown:false}}  >
        <Stack.Screen name="AuthOrApp" component={AuthOrApp}/>
        <Stack.Screen name="Languages" component={Languages}  />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="HomeEsp" component={HomeEsp}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Magazine" component={Magazine}/>
        <Stack.Screen name="MagazineEsp" component={MagazineEsp}/>
        <Stack.Screen name="Offline" component={Offline}/>
        <Stack.Screen name="MagazineOffline" component={MagazineOffline}/>
        <Stack.Screen name="MagazineOfflineEsp" component={MagazineOfflineEsp}/>
        <Stack.Screen name="SignIn" component={SignIn}  />
        <Stack.Screen name="Search" component={Search}  />
        <Stack.Screen name="Forget" component={Forget}  />
        <Stack.Screen name="About" component={About}  />
    </Stack.Navigator>
)