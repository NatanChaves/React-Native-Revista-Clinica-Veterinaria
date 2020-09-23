import { Input, Button, Header } from 'react-native-elements';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';

import { translate } from '../locales'
import axios from 'axios'
import { black } from 'color-name';

initialState = {
    username: '',
    password: '',
    isLoading: true,

}
export default class Forget extends Component {



    constructor() {
        super();
        this.state = {
            email: '',
            isLoading: false,
            disabled: false,
            titleBtn: 'Enviar'
        }
    }




    clicou = async () => {
        this.setState({isLoading: true, disabled: true, titleBtn:'Enviando'})
        try {
            const resp = await axios.post(`SUA API AQUI`)
                .then((response) => {
                Alert.alert('', response.data)
                this.setState({isLoading: false, disabled: false, titleBtn:'Enviado'})
            }).then((response) => {
                this.setState({ isLoading: false })
            }).catch(() => {
                Alert.alert('Ops!', response.data)
                this.setState({isLoading: false, disabled: false})
            });
        }catch (error) {
            this.setState({
                isLoading: false, disabled: false
            })
            Alert.alert('Ops!', response.data)

        }
    }

    render() {
        return (
            <>
                <View style={style.container}>
                <Header
                    containerStyle={{ backgroundColor: '#fff' }}
                    centerComponent={{ text: 'Recuperação de senha', style: { color: '#30B2BA' } }}
                    leftComponent={{ icon: 'arrow-back', color: '#30B2BA', onPress: () => this.props.navigation.goBack() }}
                />

                    <View style={style.logocontainer}>

                        <Image
                            style={style.logo}
                            source={require('../../assets/locks.png')}
                        />



                    </View>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>
                            Esqueceu sua senha?
                        </Text>

                    </View>

                    <View style={style.titleContainer}>
                        <Text style={style.subtitle}>
                            Coloque seu e-mail para receber as instruções para resetar sua senha
                        </Text>
                    </View>

                    <View style={style.inputContainer} >
                        <Input
                            placeholder='Coloque seu e-mail'
                            leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#30B2BA' }}
                            onChangeText={value => {this.setState({email: value})}}
                        />
                    </View>
                    <View style={style.button}>
                        <Button title={this.state.titleBtn}
                            buttonStyle={{
                                backgroundColor: '#fff',
                                borderColor: '#fff',
                                borderRadius: 10,
                                marginRight: 20,
                                marginLeft: 20,
                                marginBottom: 20,
                                borderWidth: 1

                            }}

                            icon={{
                                name: "arrow-forward",
                                size: 20,
                                color: "#30B2BA"
                              }}
                            titleStyle={{ color: '#30B2BA' }}
                            onPress={() => this.clicou()}
                            loading={this.state.isLoading}
                            disabled={this.state.disabled}
                            loadingProps={{color: '#000'}}
                        />
                    </View>

                </View>

            </>

        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "flex-start",
        backgroundColor: '#30B2BA'
    },
    logo: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: 50,
        resizeMode: "cover",
        alignSelf: "flex-start"
    },
    logocontainer: {
        flexDirection: "row",
        alignItems: "stretch",
        resizeMode: "cover",
        alignSelf: "center",
    },
    inputContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 15,
        marginRight: 20,
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    titleContainer: {
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'center'
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        marginLeft: 30,
        fontSize: 15,
        color: '#fff'
    },
    button: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})

