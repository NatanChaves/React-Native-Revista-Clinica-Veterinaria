import { StatusBar } from 'expo-status-bar';
import { Input, Button, CheckBox } from 'react-native-elements';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, AsyncStorage, TouchableOpacity, BackHandler } from 'react-native';

import { translate } from '../locales'
import axios from 'axios'

initialState = {
    username: '',
    password: '',
    isLoading: false,
    
}
export default class Login extends Component {
   
    backAction = () => {
        Alert.alert("Já vai?", "Tem certeza que quer sair?", [
            {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
}

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            expiration: 60,
            isLoading: false,
            checked: true
        }
    }

    componentDidMount() {
        if(this.props.route.name === "Login") {
            BackHandler.addEventListener("hardwareBackPress", this.backAction);
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    


    clicou = async () => {

        if(this.state.checked){
          await this.setState({expiration: 2880})
        }

        console.log(this.state.expiration)

        try {

            this.setState({ isLoading: true })
            const res = await axios.get(`SUA API AQUI`)
            AsyncStorage.setItem('token', res.data);
            this.props.navigation.push("Languages")
            this.setState({ isLoading: false })

        } catch (error) {
            this.setState({
                isLoading: false
            })
            Alert.alert('Dados incorretos')

        }
    }

    render() {
        return (
            <>
                <View style={style.container}>

                    <View style={style.logocontainer}>
                    <Image
                        style={style.logo}
                        source={require('../../assets/logoLogin.png')}
                    />
                    
                    </View>
                    <Text style={style.acessoExclusivo}>{translate('accessperm')}</Text>

                    

                    <Text style={style.texto}> {translate('hello')} </Text>
                    <Text style={style.subtitulo}> {translate('login')}  </Text>

                    <View style={style.input}>
                        <Input
                            placeholder={translate('email')}
                            value={this.state.username}
                            onChangeText={username => this.setState({ username })}
                            leftIcon={{ type: 'font-awesome', name: 'at', color: '#30B2BA' }}
                        />
                        <Input
                            placeholder={translate('password')}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: '#30B2BA' }}
                        />

                        <CheckBox
                            title={translate('conected')}
                            onPress={() => {
                                this.setState({ checked: !this.state.checked })
                            }}
                            containerStyle={{backgroundColor: 'transparent', borderWidth: 0, margin: 0}}
                            checked={this.state.checked}
                        />
                    </View>

                    <View style={style.buttons}>
                        <Button
                            title="Login"
                            loading={this.state.isLoading}
                            onPress={() => { this.clicou() }}
                            buttonStyle={{
                                backgroundColor: '#30B2BA', borderRadius: 10
                            }}
                        />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forget')}>
                        <Text style={style.esqueciSenha}> {translate('forgot')}   </Text>
                        </TouchableOpacity>

                        <Text></Text>

                        <Button
                            title={translate('signUp')}
                            onPress={() => { this.props.navigation.push("SignIn") }}
                            buttonStyle={{
                                backgroundColor: '#1E0B95', borderRadius: 10
                            }}
                        />

                    </View>
                </View>

            </>

        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    logo: {
        flexDirection: "row",
        marginTop: 70,
        alignItems: "stretch",
        resizeMode: "cover",
        alignSelf: "center"
    },
    logocontainer: {
        flexDirection: "row",
        marginTop: 70,
        alignItems: "stretch",
        resizeMode: "cover",
        alignSelf: "center"
    },
    texto: {
        flexWrap: "wrap",
        marginLeft: 30,
        marginTop: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: '#30B2BA'
    },
    subtitulo: {
        marginLeft: 35,
        color: '#000',
    },
    acessoExclusivo: {
        flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
        color: '#000',
        textAlign: "center"
    },
    esqueciSenha: {
        color: '#000',
        fontSize: 12,
        textDecorationLine: 'underline'
    },
    input: {
        flexWrap: "wrap",
        display: "flex",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 20,
        marginLeft: 20,
    },
    buttons: {
        display: "flex",
        marginBottom: 150,
        padding: 10,
        margin: 20,
    }
})

