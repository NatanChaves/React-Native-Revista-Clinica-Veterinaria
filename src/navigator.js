import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import HomeEsp from './src/screens/HomeEsp'
import AuthOrApp from './screens/AuthOrApp'
import Magazine from './screens/Magazine'
import Offline from './screens/Offline'
import MagazineOffline from './screens/MagazineOffline'
import Logout from './screens/Logout'
import SignIn from './screens/SignIn'
import Search from './screens/Search'
import Languages from './screens/Languages'
import MagazineEsp from './screens/MagazineEsp'
import MagazineOfflineEsp from './screens/MagazineOfflineEsp'
import Forget from './screens/Forget'
import About from './screens/About'

import App from '../App'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'

const mainRoutes = {
    App: {
        name: 'App',
        screen: App
    },
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: Home
    },
    Magazine: {
        name: 'Magazine',
        screen: Magazine
    },
    Offline: {
        name: 'Offline',
        screen: Offline
    },
    MagazineOffline: {
        name: 'MagazineOffline',
        screen: MagazineOffline
    },
    SignIn: {
        name: 'SignIn',
        screen: SignIn
    },
    Search: {
        name: 'Search',
        screen: Search
    },
    Languages: {
        name: 'Languages',
        screen: Languages
    },
    HomeEsp: {
        name: 'HomeEsp',
        screen: HomeEsp
    },
    MagazineEsp: {
        name: 'MagazineEsp',
        screen: MagazineEsp
    },
    MagazineOfflineEsp: {
        name: 'MagazineOfflineEsp',
        screen: MagazineOfflineEsp
    },
    Forget: {
        name: 'Forget',
        screen: Forget
    },
    About: {
        name: 'About',
        screen: About
    }

}

const mainNavigator = createStackNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})


export default createAppContainer(mainNavigator)