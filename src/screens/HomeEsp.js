import { StatusBar } from 'expo-status-bar';
import { Input, Button, SearchBar, Header } from 'react-native-elements';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, AsyncStorage, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

import axios from 'axios'
import { translate } from '../locales';


export default class HomeEsp extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            search: '',
        }
    }

   async componentDidMount() {

        this._isMounted = true;
        
       await this.loadCovers()

    }

 componentWillUnmount() {
        this._isMounted = false;
        this.loadCovers()
        console.log('desmontado')
        
    }


    loadCovers = async () => {
        const token = await AsyncStorage.getItem('token')

        let jwt = token;

        const headers = {
            'Authorization': `Bearer ${jwt}`
        }

        try {
            const resp = await axios.get('SUA API AQUI', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response) => {
                this.setState({ Edicoes: response.data })
            }).then((response) => {
                this.setState({ isLoading: false })
                console.warn(this.state.isLoading)
            }).catch(() => {
                AsyncStorage.removeItem('token');
                this.props.navigation.navigate("Login")

            });
        }
        catch (error) {
            console.warn(error)
            this.props.navigation.navigate("Login")
        }

    }

    OpenDraw = () => {
        console.warn('passou aqui')
        this.props.navigation.toggleDrawer()
    }
    openEdicao = (NREdicao, IDEdicao, UrlAmazon) => {
        this.props.navigation.push("MagazineEsp", { NREdicao: NREdicao, IDEdicao: IDEdicao, UrlAmazon: UrlAmazon })
    }

    updateSearch = () => {
        this.props.navigation.push("Search")
    };



    render() {
        
                

        const isLoading = this.state.isLoading
        if (isLoading == true) {
            return (
                <View style={style.load}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        else {
            return (
                <>
                    <Header
                    containerStyle={{backgroundColor: '#00a5b5'}}
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                        centerComponent={{ text: 'Revista Clínica Veterinária', style: { color: '#fff' } }}
                        rightComponent={{icon: 'file-download', color: '#fff', onPress: () => this.props.navigation.push("Offline")}}
                    />
                    <View style={{ marginTop: 2 }}>
                        <SearchBar
                            placeholder={translate('search')}
                            onChangeText={() => this.props.navigation.navigate("Search")}
                            value={this.state.search}
                            containerStyle={{ backgroundColor: '#30B2BA', borderColor: '#fff', padding: 20, borderColor: '#fff', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                            inputContainerStyle={{ backgroundColor: 'white', borderColor: '#fff' }}
                        />
                        <View style={style.logo}>
                            <Image
                                source={require('../../assets/Rcv-white.png')}
                            />
                        </View>

                    </View>
                    <View style={style.container}>

                        {this.isLoading ? <ActivityIndicator style={style.load} /> :
                            (
                                <FlatList
                                    data={this.state.Edicoes}
                                    numColumns={3}
                                    columnWrapperStyle={style.row}
                                    keyExtractor={(item, index) => {
                                        // console.log("index", index)
                                        return index.toString();
                                    }}
                                    renderItem={({ item }) => {
                                        return (
                                            <>
                                                <View style={style.containerCover} >
                                                    <TouchableOpacity onPress={() => this.openEdicao(item.NREdicao, item.IDEdicao, item.UrlAmazon)}>
                                                        <Image style={style.cover} source={{ uri: `URL DA IMAGEM AQUI` }} />
                                                    </TouchableOpacity>
                                                    <Text style={style.caption}>N. {item.NREdicao}</Text>
                                                    <Button title={translate('readon')} onPress={() => this.openEdicao(item.NREdicao, item.IDEdicao, item.UrlAmazon)}  buttonStyle={{backgroundColor: '#00a5b5', borderRadius: 20}} titleStyle={{color: '#fff'}}   />
                                                </View>
                                            </>
                                        )
                                    }}
                                />
                            )}
                    </View>

                </>

            );
        }

    }

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#30B2BA',
        borderTopColor: '#30B2BA',
        flexDirection: "row",


    },
    containerCover: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#30B2BA',
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    cover: {
        width: 110,
        height: 160,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#fff'

    },
    logo: {
        flexGrow: 1,
        padding: 20,
        alignSelf: "stretch",
        backgroundColor: '#30B2BA',
        alignItems: "center"

    },
    caption: {
        width: 151,
        padding: 30,
    },
    load: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: '#fff',
        backgroundColor: '#30B2BA'
    },
    row: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
    }
})

