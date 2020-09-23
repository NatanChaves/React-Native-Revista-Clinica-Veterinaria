import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { Button, Header } from 'react-native-elements'
import PDFReader from 'rn-pdf-reader-js'
import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import { translate } from '../locales';




export default class Home extends Component {
    initialState = {
        uri: '',
        downloads: null,
        progress: '',
        isLoading: true
    }

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            remoteUri: 'URL PDF',
            downloadProgress: 0,
            docsList: [],
            remoteImageUri: `URL IMAGEM`,
            base: '',
            loading: false,
            btnDwnld: 'file-download',
            urlDownload: this.props.route.params.UrlAmazon

        }
        this._isMounted = false;
        console.log('O que tá passando: ', this.props.route.params.UrlAmazon)

    }

    componentDidMount() {
        this._isMounted = true;
        

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    

    DownloadPdf = async (NREdicao) => {
        this.setState({ loading: true })


        const token = await AsyncStorage.getItem('token')

        let jwt = token;
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'app_docs/pdfsEsp/', { intermediates: true });

        FileSystem.downloadAsync(
            this.state.urlDownload,
            FileSystem.documentDirectory + 'app_docs/pdfsEsp/' + `revista-clinica-veterinaria-${this.props.route.params.NREdicao}.pdf`
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
            }).then(() => {
                this.DownloadImage()
                console.warn('Pdf e Imagem baixados!')
                this.setState({ loading: false, btnDwnld: 'done' })
            })
            .catch(error => {
                console.error(error);
            });
    }

    DownloadImage = async () => {

        console.warn('BAIXANDO CAPA ESP ')

        console.warn(this.state.remoteUri)
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'app_docs/coversEsp/', { intermediates: true });

        FileSystem.downloadAsync(
            this.state.remoteImageUri,
            FileSystem.documentDirectory + 'app_docs/coversEsp/' + `revistaclinicavet,${this.props.route.params.NREdicao}.jpg`
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
            })
            .catch(error => {
                console.error(error);
            });
    }



    

    openEdicao = async () => {
        console.warn('Abrir edição')

        this.props.navigation.push("Offline")
    }


    render() {


        const token = AsyncStorage.getItem('token')

        let jwt = token;

        if (jwt == null) {
            AsyncStorage.removeItem('token');
            this.props.navigation.navigate("Login")

        }
        const { NREdicao } = this.props.route.params;
        const loading = this.state.loading;


        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: '#30B2BA' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: translate('editionEsp'), style: { color: '#fff' } }}
                />
                <View style={{ flex: 6 }}>
                    {this.state.isLoading ? <ActivityIndicator size='large' style={style.load} /> : (
                        <PDFReader
                            style={{ flex: 1, marginTop: 25, }}
                            withPinchZoom={true}
                            source={{
                                uri: this.props.route.params.UrlAmazon
                            }}
                            onError={() => { Alert.alert('Erro', 'Por favor, tente novamente') }}
                        />
                    )}
                </View>




                <View style={style.container}>

                    <View style={{ flex: 5, alignItems: "flex-start", margin: 20 }}>
                        <Text style={{ fontWeight: "bold", color: '#fff' }}>Revista Clínica Veterinária – {translate('edition')} n. {NREdicao} </Text>
                    </View>

                    <View style={{ flex: 1, marginRight: 20 }}>
                        <Button
                            loading={this.state.loading}
                            buttonStyle={{ backgroundColor: '#f0c022' }}
                            icon={{
                                name: this.state.btnDwnld,
                                size: 30,
                                color: "#fff"
                            }}
                            onPress={() => this.DownloadPdf({ NREdicao })}
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
    },
    load: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: '#fff',
        backgroundColor: '#fff'
    }
})


