import React, { useState, Component, } from 'react';
import { StyleSheet, Text, View, AsyncStorage, FlatList, TouchableOpacity, Image } from 'react-native';
import { Header, Button } from 'react-native-elements'
import * as FileSystem from 'expo-file-system';
import jwt_decode from 'jwt-decode'
import { translate } from '../locales';



export default class Home extends Component {
    initialState = {
        uri: '',
        docsList: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            downloadProgress: 0,
            docsList: [],
            docsListEsp: [],
            val: ''

        }
    }

    async componentDidMount() {

        const token = await AsyncStorage.getItem('token')

        var decoded = jwt_decode(token);

        console.log(decoded);

        const { exp } = decoded;

        var current_time = new Date().getTime() / 1000;
        if (current_time > exp) {
            console.log('expirou')
            this.props.navigation.navigate("Login")

        } else {
            console.log(current_time)
            console.log(exp)
            console.log('Não expirou ainda')
        }

        this._getAllPdfsPt();

        this._getAllPdfsEsp();
    }


    _getAllPdfsPt = async () => {
        console.log('lendo: ')

        let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'app_docs/covers');

        dir.forEach((val) => {
            this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/covers/' + val);
        });

        await this.setState({ docsList: this.state.docsList, loading: false });
        console.log(this.state.docsList)

    }

    _getAllPdfsEsp = async () => {
        console.log('lendo: ')

        let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'app_docs/coversEsp');

        dir.forEach((val) => {
            this.state.docsListEsp.push(FileSystem.documentDirectory + 'app_docs/coversEsp/' + val);
        });

        await this.setState({ docsListEsp: this.state.docsListEsp, loading: false });
        console.log(this.state.docsListEsp)

    }

    openEdicao = (item) => {
        console.warn('Abrir edição')

        this.props.navigation.navigate("MagazineOffline", { item: item })

    }

    openEdicaoEsp = (item) => {
        console.warn('Abrir edição')

        this.props.navigation.navigate("MagazineOfflineEsp", { item: item })

    }


    render() {

        const token = AsyncStorage.getItem('token')

        let jwt = token;

        if (jwt == null) {
            AsyncStorage.removeItem('token');
            this.props.navigation.navigate("Login")

        }

        return (

            <>
                <Header
                    containerStyle={{ backgroundColor: '#30B2BA' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: translate('downloads'), style: { color: '#fff' } }}
                />

                <View style={{flex: 1, paddingTop: 10,  backgroundColor: '#fff', borderTopColor: '#30B2BA', flexDirection: "row",}}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 55, flexWrap: 'nowrap' }}>
                        <Text style={{fontWeight: 'bold'}}>
                            {translate('pt')}
                    </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 55, flexWrap: 'nowrap' }}>
                        <Text style={{fontWeight: 'bold'}}>
                            {translate('esp')}
                    </Text>
                    </View>

                </View>
                <View style={style.container}>
                    <FlatList
                        data={this.state.docsList}
                        numColumns={2}
                        columnWrapperStyle={style.row}
                        keyExtractor={(item, index) => {
                            // console.log("index", index)
                            return index.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View>
                                        <TouchableOpacity onPress={() => this.openEdicao({ item })}>
                                            <Image style={style.cover} source={{ uri: item }} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                        }}
                    />



                    <FlatList
                        data={this.state.docsListEsp}
                        numColumns={2}
                        columnWrapperStyle={style.row}
                        keyExtractor={(item, index) => {
                            // console.log("index", index)
                            return index.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View>
                                        <TouchableOpacity onPress={() => this.openEdicaoEsp({ item })}>
                                            <Image style={style.cover} source={{ uri: item }} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                        }}
                    />


                </View>


            </>

        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderTopColor: '#30B2BA',
        flexDirection: "row",
    },
    cover: {
        width: 90,
        height: 131,
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


