import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import React, { useEffect, Component } from 'react';



export default class Logout extends Component {

    componentDidMount() {
        const token = AsyncStorage.getItem('token')

        setTimeout(() => {
            if (token === null) {
                this.props.navigation.navigate("Login")

            } else {
                AsyncStorage.removeItem('token');
                this.props.navigation.navigate("Login")
            }
        }, 3000)
    }

    
    render() {
        return (
            <View style={style.container}>
                <Text style={style.texto}>Saindo...! 💔 </Text>
                <Text style={style.texto}>Espero que volte em breve  🥰</Text>
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#30B2BA'
    },
    texto: {
        color: '#fff'
    }
})