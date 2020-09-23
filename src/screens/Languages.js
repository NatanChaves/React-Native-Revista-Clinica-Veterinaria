import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Image, BackHandler, Alert } from 'react-native'
import React, { Component } from 'react';
import { Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { translate } from '../locales'



export default class Languages extends Component {



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

    componentDidMount() {
        if(this.props.route.name === "Languages") {
            BackHandler.addEventListener("hardwareBackPress", this.backAction);
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }


    render() {
        console.log(typeof this.props.route.name )
        return (
            <>

                <StatusBar style="auto" />
                <View style={style.containerTitle}>
                    <Text style={{ justifyContent: "center", alignItems: "flex-start", fontWeight: "bold", fontSize: 25, color: '#30B2BA' }}> {translate('welcome')} </Text>
                </View>

                <View style={style.containerLanguage}>

                    <Text style={{ justifyContent: "center", alignItems: "flex-end", fontSize: 18 }}> {translate('readon')} </Text>
                </View>

                <View style={style.containerImage}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }}>
                        <Image
                            source={require('../../assets/pt.png')}
                            style={style.imagePt}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("HomeEsp") }}>
                        <Image
                            source={require('../../assets/esp.png')}
                            style={{ resizeMode: "stretch", width: 120, height: 146, flexWrap: "nowrap", margin: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            
                <View style={style.containerButtom}>
                    <Button
                        buttonStyle={style.buttonOffline}
                        iconRight
                        title={translate('continueoff')}
                        icon={{
                            name: "arrow-forward",
                            size: 15,
                            color: "#30B2BA",
                        }}
                        titleStyle={{ color: '#30B2BA' }}
                        onPress={() => { this.props.navigation.navigate("Offline") }}
                    />
                </View>



            </>
        )
    }
}

const style = StyleSheet.create({
    containerImage: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    imagePt: {
        resizeMode: "stretch",
        width: 120,
        height: 146,
        flexWrap: "nowrap",
        margin: 20,

    },
    containerTitle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",

    },
    containerLanguage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    containerButtom: {
        justifyContent: "center",
        alignContent: "flex-end",
        flexDirection: "row",
        margin: 20
    },
    buttonOffline: {
        backgroundColor: 'transparent',
        justifyContent: "flex-start",
        padding: 10,
        color: '#000',
        borderWidth: 1,
        borderColor: '#30B2BA',
        borderRadius: 10
    }
})