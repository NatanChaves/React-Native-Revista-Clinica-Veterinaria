import React, { useState, Component, } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button, Header } from 'react-native-elements'
import PDFReader from 'rn-pdf-reader-js'
import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import { translate } from '../locales';




export default class MagazineOffline extends Component {
    initialState = {
        uri: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            NREdicao: '',
            uriFile: ''

        }

        console.warn('O que tá passando: ', this.props.route.params.item)

    }

    async componentDidMount() {


        this.extrairURL()
    }



    extrairURL = async () => {
        console.warn('Extraindo número da edição')

        var urlEdicao = this.props.route.params.item

        var mid = urlEdicao.item

        var convert = mid.split(",")

        var mid2 = convert[1]

        var extractNum = mid2.split(".")

        await this.setState({ NREdicao: extractNum[0] })

        console.warn('Resultado da extração: ', this.state.NREdicao)

        // this._getPdfEdicao(this.state.NREdicao)

    }



    deletePubOffline = async () => {
        console.warn('Deletei man')

        try {
            await FileSystem.deleteAsync(FileSystem.documentDirectory + 'app_docs/pdfsEsp/' + `revista-clinica-veterinaria-${this.state.NREdicao}.pdf`);
            console.warn('Deletei com certeza')
            this.deleteCover();
        } catch (error) {

        }
    }

    deleteCover = async () => {
        console.warn('Deletei a capa man')

        try {
            await FileSystem.deleteAsync(FileSystem.documentDirectory + 'app_docs/coversEsp/' + `revistaclinicavet,${this.state.NREdicao}.jpg`);
            this.props.navigation.navigate("Offline")
            console.warn('Deletei com certeza a capa')
        } catch (error) {

        }
    }



    render() {



        const token = AsyncStorage.getItem('token')

        let jwt = token;

        const headers = {
            'Authorization': `Bearer ${jwt}`
        }

        if (jwt == null) {
            AsyncStorage.removeItem('token');
            this.props.navigation.navigate("Login")

        }
        const { item } = this.props.route.params;




        console.warn('URIFILE: ', this.state.uriFile)

        var uriFIlePath = this.state.uriFile


        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: '#30B2BA' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: translate('editionoff'), style: { color: '#fff' } }}
                />


                <View style={{ flex: 6 }}>
                    <PDFReader
                        style={{ flex: 1, marginTop: 25, }}
                        withPinchZoom={true}
                        source={{
                            uri: `${FileSystem.documentDirectory + 'app_docs/pdfsEsp/'}revista-clinica-veterinaria-${this.state.NREdicao}.pdf`
                        }}
                    />
                </View>

                <View style={style.container}>

                    <View style={{ flex: 5, alignItems: "flex-start", margin: 20 }}>
                        <Text style={{ fontWeight: "bold", color: '#fff' }}>Revista Clínica Veterinária – {translate('edition')} n. {this.state.NREdicao} </Text>
                    </View>

                    <View style={{ flex: 1, margin: 20 }}>
                        <Button
                            buttonStyle={{ backgroundColor: '#fff' }}
                            icon={{
                                name: "delete",
                                size: 30,
                                color: "#30B2BA"
                            }}
                            onPress={() => this.deletePubOffline()}
                        />

                        {/* <Button title="Limpar diretório" onPress={() => this.myDeleteDirectoryMethod()} />
                        <Button title="Ver edição array" onPress={() => this.loadPDF()} /> */}
                    </View>


                </View>

            </>

        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "nowrap",
        alignItems: "center",
        backgroundColor: '#30B2BA',
        flexDirection: "row"

    },
    cover: {
        width: 110,
        height: 160,
        borderColor: '#fff',
        borderWidth: 1
    },
    row: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
    }
})


