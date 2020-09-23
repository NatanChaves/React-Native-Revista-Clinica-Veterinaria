import { Input, Button, SearchBar, CheckBox } from 'react-native-elements';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, AsyncStorage, TouchableOpacity, ActivityIndicator, Alert, Platform, NativeModules } from 'react-native';
import axios from 'axios'
import { translate } from '../locales';


export default class Search extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            search: '',
            message: '',
            checkedPt: false,
            checkedEsp: false,
            checkedIng: false,
        }
        id = 0;
    }


    

    updateSearch = async (search) => {

        this.setState({ search });
        this.setState({ isLoading: true })

        const token = await AsyncStorage.getItem('token')

        let jwt = token;

        const headers = {
            'Authorization': `Bearer ${jwt}`
        }
        if (this.state.search.length > 3) {
            try {
                if (this.state.search.length > 3) {
                    this.setState({
                        message: '', isLoading: false
                    })
                }
                if (this.state.search === '') {
                    this.setState({
                        message: ''
                    })
                }

                if (this.state.checkedPt === true) {
                    id = 1;
                }
                if (this.state.checkedIng === true) {
                    id = 2;
                }
                if (this.state.checkedEsp === true) {
                    id = 3;
                }
                if (this.state.checkedEsp === false && this.state.checkedIng === false && this.state.checkedPt === false) {
                    if (Platform.OS === 'ios') {
                        const language = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]

                        if (language.indexOf('en') > -1) {
                            id = 2
                        }

                        if (language == 'pt_BR') {
                            id = 1
                        }
                        if (language.indexOf('es') > -1) {
                            id = 3
                        }
                    }
                    if (Platform.OS === 'android') {
                        const language = NativeModules.I18nManager.localeIdentifier

                        if (language.indexOf('en') > -1) {
                            id = 2
                        }

                        if (language == 'pt_BR') {
                            id = 1
                        }
                        if (language.indexOf('es') > -1) {
                            id = 3
                        }
                    }
                }
                console.log('id', id)

                const resp = await axios.get(`SUA API AQUI`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    },
                }).then((response) => {
                    if (id === 3) {
                        this.setState({ ArtigosEsp: response.data, isLoading: false })
                    } if(id === 1 || id === 2) {
                        this.setState({ Artigos: response.data, isLoading: false })
                    }
                     
                }).then((response) => {
                    console.warn(this.state.isLoading)
                }).catch(() => {
                    Alert.alert("Ops...", translate('nofound'))
                });
            }
            catch (error) {
                Alert.alert("Ops...", translate('nofound'))
            }
        } else {
            this.setState({
                message: translate('fill')
            })
        }


    }


    openEdicao = (screen, NREdicao) => {
        this.props.navigation.push(screen, { NREdicao: NREdicao })
    }


    render() {
        var data;
        var baseUri;
        var screen;
        var urlBaseCovers;
        if (id == 3) {
            data = this.state.ArtigosEsp;
            screen = "MagazineEsp"
            urlBaseCovers = 'URL IMAGEM CAPA'
        }
        if (id == 1 || id == 2) {
            data = this.state.Artigos;
            screen = "Magazine"
            urlBaseCovers = 'URL IMAGEM CAPA`'
        }


        return (
            <>
                <View style={{ marginTop: 30 }}>

                    <SearchBar
                        ref={(search) => { this.search = search; }}
                        placeholder={translate('search')}
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        containerStyle={{ backgroundColor: '#30B2BA', borderColor: '#30B2BA', padding: 20, borderColor: '#fff', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                        inputContainerStyle={{ backgroundColor: 'white', borderColor: '#fff' }}
                    />

                    <View style={{ flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap", backgroundColor: '#30B2BA', }}>
                        <View style={{ flex: 1, backgroundColor: '#30B2BA', borderWidth: 0, margin: 0, borderTopColor: '#30B2BA' }}>
                            <CheckBox
                                title={translate('pt')}
                                checkedColor="#fff"
                                onPress={() => {
                                    this.setState({ checkedPt: !this.state.checkedPt, checkedIng: false, checkedEsp: false })
                                }}
                                containerStyle={{ backgroundColor: 'tranparent', borderWidth: 0, margin: 0, }}
                                textStyle={{ color: '#fff', fontSize: 12 }}
                                checked={this.state.checkedPt}
                            />

                        </View>
                        <View style={{ flex: 1, backgroundColor: '#30B2BA', borderWidth: 0, margin: 0, borderTopColor: '#30B2BA' }}>
                            <CheckBox
                                title={translate('esp')}
                                checkedColor="#fff"
                                onPress={() => {
                                    this.setState({ checkedEsp: !this.state.checkedEsp, checkedIng: false, checkedPt: false, })
                                }}
                                textStyle={{ color: '#fff', fontSize: 12 }}
                                containerStyle={{ backgroundColor: 'tranparent', borderWidth: 0, margin: 0 }}
                                checked={this.state.checkedEsp}
                            />

                        </View>
                        <View style={{ flex: 1, backgroundColor: '#30B2BA', borderWidth: 0, margin: 0, borderTopColor: '#30B2BA' }}>
                            <CheckBox
                                title={translate('ing')}
                                checkedColor="#fff"
                                onPress={() => {
                                    this.setState({ checkedIng: !this.state.checkedIng, checkedEsp: false, checkedPt: false })
                                }}
                                textStyle={{ color: '#fff', fontSize: 12 }}
                                containerStyle={{ backgroundColor: 'tranparent', borderWidth: 0, margin: 0 }}
                                style={{ backgroundColor: '#30B2BA' }}
                                titleStyle={{ color: '#fff' }}
                                checked={this.state.checkedIng}
                            />

                        </View>
                    </View>


                    <Text style={{ color: "#fff", backgroundColor: "#30B2BA", textAlign: "center" }}>{this.state.message}</Text>



                </View>
                <View style={style.container}>
                    {this.state.isLoading ? <ActivityIndicator size='large' style={style.load} /> : (
                        <>
                            <FlatList
                                data={data}
                                numColumns={2}
                                columnWrapperStyle={style.row}
                                keyExtractor={(item, index) => {
                                    // console.log("index", index)
                                    return index.toString();
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <>
                                            <View style={style.containerCover} >
                                                <TouchableOpacity onPress={() => this.openEdicao(screen, item.NREdicao)}>
                                                    <Image style={style.cover} source={{ uri: `${urlBaseCovers}clinica-veterinaria-${item.NREdicao}.jpg` }} />
                                                </TouchableOpacity>
                                                <Text style={style.caption}>N. {item.NREdicao}, {item.DSTitulo}</Text>
                                                <Button title={translate('readon')} onPress={() => this.openEdicao(item.NREdicao)} />
                                            </View>
                                        </>
                                    )
                                }}
                            />

                        </>
                    )

                    }


                </View>
                <Button title={translate('back')} onPress={() => { this.props.navigation.goBack() }} buttonStyle={{ backgroundColor: '#30B2BA', borderWidth: 1, borderColor: '#fff', margin: 10 }} titleStyle={{ color: '#fff' }} containerStyle={{ backgroundColor: '#30B2BA' }} />
            </>

        );

    }

}


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
        width: 150,
        height: 200,
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
        width: 200,
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
        alignItems: "baseline",
        flexWrap: "wrap",
    }
})

