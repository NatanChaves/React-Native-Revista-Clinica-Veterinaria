import { Input, Divider, Button, Header, Overlay } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, Alert, StyleSheet, View, ScrollView, Linking, NativeModules, TouchableOpacity, Dimensions } from 'react-native';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import { translate } from '../locales'
import PDFReader from 'rn-pdf-reader-js'


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            IDPessoa: 0,
            DSEmail: '',
            NMPessoa: '',
            IDPerfil: 4,
            NMSobrenome: '',
            NRCpf: '',
            CDChave: '',
            DSLogradouro: '',
            NRNumero: '',
            NRCep: '',
            NMBairro: '',
            DSComplemento: '',
            NMCidade: '',
            NMEstado: '',
            NMPais: '',
            NRTelefone: '',
            NMFaculdade: '',
            DSCrmv: '',
            DSComplementoTels: '',
            IDPlanoAssinatura: 1,
            STPessoaPerfilAtivo: true,
            checkedMV: false,
            checkedStd: false,
            checked: true,
            IDCategoria: 0,
            isDisabledMV: true,
            isDisabledStd: true,
            url: '',
            visible: false,
            contactvisible: false,
            tcAndroidPt: 'T_C_Android_Pt',
            tcAndroidIng: 'T_C_Android_Ing',
            tcAndroidEsp: 'T_C_Android_Esp',
            tcIosPt: 'T_C_IOS_Pt',
            tcIosIng: 'T_C_IOS_Ing',
            tcIosEsp: 'T_C_IOS_Esp',
            tcChoose: ''

        }
    }



    onMv() {
        if (this.state.checkedMV == false) {
            this.setState({
                checkedMV: true,
                checkedStd: false,
                IDCategoria: 1,
                isDisabledMV: false,
                isDisabledStd: true
            })
        } else {
            this.setState({
                checkedMV: false,
                isDisabledMV: true,
                isDisabledStd: true
            })
        }
    }

    onStd() {
        if (this.state.checkedStd == false) {
            this.setState({
                checkedStd: true,
                checkedMV: false,
                IDCategoria: 2,
                isDisabledStd: false,
                isDisabledMV: true

            })
        } else {
            this.setState({
                checkedStd: false,
                isDisabledStd: true,
                isDisabledMV: true
            })
        }
    }

    SignIn = () => {

        let details = {
            'IDPessoa': this.state.IDPessoa,
            'DSEmail': this.state.DSEmail,
            'NMPessoa': this.state.NMPessoa,
            'IDPerfil': 4,
            'NMSobreNome': this.state.NMSobrenome,
            'NRCpf': this.state.NRCpf,
            'Endereco.DSComplemento': this.state.DSComplemento,
            'Endereco.DSLogradouro': this.state.DSLogradouro,
            'Endereco.NRNumero': this.state.NRNumero,
            'Endereco.NRCep': this.state.NRCep,
            'Endereco.NMBairro': this.state.NMBairro,
            'Endereco.NMCidade': this.state.NMCidade,
            'Endereco.NMEstado': this.state.NMEstado,
            'Endereco.NMPais': this.state.NMPais,
            'Telefone.NRTelefone': this.state.NRTelefone,
            'Telefone.DSComplementoTels': this.state.DSComplementoTels,
            'Assinante.IDPlanoAssinatura': 1,
            'Assinante.STPessoaPerfilAtivo': true,
            'Categoria.IDCategoria': 1,
            'CDChave': this.state.CDChave,
            'NMFaculdade': this.state.NMFaculdade,
            'DSCrmv': this.state.DSCrmv


        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('SUA API AQUI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);

                Alert.alert(
                    "Feito!",
                    "Response Body " + JSON.stringify(responseData)
                );
            })
            .done();
    };

    openRegister = () => {
        var id;
        if (Platform.OS === 'ios') {
            const language = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]

            if (language == 'pt_BR') {
                id = 1
            }
            if (language.indexOf('en') > -1) {
                id = 2
            }
            if (language.indexOf('es') > -1) {
                id = 3
            }
        }
        if (Platform.OS === 'android') {
            const language = NativeModules.I18nManager.localeIdentifier

            if (language == 'pt_BR') {
                id = 1
            }
            if (language.indexOf('en') > -1) {
                id = 2
            }
            if (language.indexOf('es') > -1) {
                id = 3
            }
        }

        fetch(`SUA API`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                var url = responseData
                this.setState({ url: url })

                this.openSite();
            })
            .done();




    }

    openSite = () => {
        Linking.openURL(this.state.url)
    }

    clicou = () => {
        var tc = null;
        if (Platform.OS === 'ios') {
            const language = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]

            if (language.indexOf('en') > -1) {
                tc = this.state.tcIosIng
            }

            if (language.indexOf('pt') > -1) {
                tc = this.state.tcIosPt
            }
            if (language.indexOf('es') > -1) {
                tc = this.state.tcIosEsp
            }
            if(tc === null){
                tc = this.state.tcIosIng
            }
            
            console.log(language)
        }
        if (Platform.OS === 'android') {
            const language = NativeModules.I18nManager.localeIdentifier

            if (language.indexOf('en') > -1) {
                tc = this.state.tcAndroidIng
            }

            if (language == 'pt_BR') {
                tc = this.state.tcAndroidPt
            }
            if (language.indexOf('es') > -1) {
                tc = this.state.tcAndroidEsp
            }
            if(tc === null){
                tc = this.state.tcAndroidIng
            }
        }
        


        this.setState({ tcChoose: tc })
        this.setState({ visible: !this.state.visible });
    }
    render() {

        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const { checkedStd } = this.state.checkedStd;
        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: '#30B2BA' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                />

                <ScrollView style={style.container}>

                    <Button title="Não é brasileiro? Clique aqui!"
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: '#30B2BA',
                            borderRadius: 10,
                            marginRight: 40,
                            marginLeft: 40,
                            borderWidth: 2,
                            marginBottom: 20

                        }}
                        titleStyle={{ color: '#30B2BA', fontWeight: 'bold' }}

                        onPress={() => this.openRegister()} />

                    <View style={style.input}>

                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#30B2BA' }}>{translate('signUp')}</Text>
                        <Text>{translate('dbsaccess')}</Text>

                        <Input
                            placeholder={translate('email')}
                            value={this.state.DSEmail}
                            onChangeText={DSEmail => this.setState({ DSEmail })}
                            leftIcon={{ type: 'font-awesome', name: 'at', color: '#30B2BA' }}
                        />
                        <Input
                            placeholder={translate('password')}
                            value={this.state.CDChave}
                            onChangeText={CDChave => this.setState({ CDChave })}
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: '#30B2BA' }}
                        />

                    </View>

                    <Text style={style.titleA}>{translate('fields')}</Text>


                    <View style={style.check}>
                        <View style={style.mv}>
                            <CircleCheckBox
                                checked={this.state.checkedMV}
                                onToggle={(checkedMV) => this.onMv()}
                                labelPosition={LABEL_POSITION.RIGHT}
                                label={translate('mv')}
                            />
                        </View>

                        <View style={style.std}>
                            <CircleCheckBox
                                checked={this.state.checkedStd}
                                onToggle={(checkedStd) => this.onStd()}
                                labelPosition={LABEL_POSITION.RIGHT}
                                label={translate('studant')}
                            />
                        </View>


                    </View>
                    <View style={style.personal}>

                        <Input
                            placeholder={translate('name')}
                            value={this.state.NMPessoa}
                            onChangeText={NMPessoa => this.setState({ NMPessoa })}
                        />
                        <Input
                            placeholder={translate('surname')}
                            value={this.state.NMSobrenome}
                            onChangeText={NMSobrenome => this.setState({ NMSobrenome })}
                        />

                        <Input
                            placeholder={translate('doc')}
                            value={this.state.NRCpf}
                            onChangeText={NRCpf => this.setState({ NRCpf })}
                        />

                        <Input
                            placeholder={translate('tellphone')}
                            value={this.state.NRTelefone}
                            onChangeText={NRTelefone => this.setState({ NRTelefone })}
                        />

                        <Divider style={{ backgroundColor: '#e6d4d3', height: 1 }} />

                    </View>

                    <View style={style.endereco} >
                        <Input
                            placeholder={translate('place')}
                            value={this.state.DSLogradouro}
                            onChangeText={DSLogradouro => this.setState({ DSLogradouro })}
                        />
                        <Input
                            placeholder={translate('number')}
                            value={this.state.NRNumero}
                            onChangeText={NRNumero => this.setState({ NRNumero })}
                        />

                        <Input
                            placeholder={translate('nbhd')}
                            value={this.state.NMBairro}
                            onChangeText={NMBairro => this.setState({ NMBairro })}
                        />

                        <Input
                            placeholder={translate('complement')}
                            value={this.state.DSComplemento}
                            onChangeText={DSComplemento => this.setState({ DSComplemento })}
                        />

                        <Input
                            placeholder={translate('zipcode')}
                            value={this.state.NRCep}
                            onChangeText={NRCep => this.setState({ NRCep })}
                        />

                        <Input
                            placeholder={translate('city')}
                            value={this.state.NMCidade}
                            onChangeText={NMCidade => this.setState({ NMCidade })}
                        />

                        <Input
                            placeholder={translate('state')}
                            value={this.state.NMEstado}
                            onChangeText={NMEstado => this.setState({ NMEstado })}
                        />

                        <Input
                            placeholder={translate('country')}
                            value={this.state.NMPais}
                            onChangeText={NMPais => this.setState({ NMPais })}
                        />

                        <Input
                            placeholder={translate('crmv')}
                            value={this.state.DSCrmv}
                            onChangeText={DSCrmv => this.setState({ DSCrmv })}
                            disabled={this.state.isDisabledMV}
                        />
                        <Input
                            placeholder={translate('college')}
                            value={this.state.NMFaculdade}
                            onChangeText={NMFaculdade => this.setState({ NMFaculdade })}
                            disabled={this.state.isDisabledStd}
                        />


                    </View>



                    {!!this.state.nameError && (
                        <Text>{this.state.nameError}</Text>
                    )}

                    <Button
                        title={translate('entersigin')}
                        buttonStyle={{
                            backgroundColor: '#1E0B95',
                            borderRadius: 10,
                            marginRight: 40,
                            marginLeft: 40
                        }}
                        onPress={() => {
                            if (this.state.NMPessoa.trim() === ""
                                || this.state.DSEmail.trim() === ""
                                || this.state.NMSobrenome.trim() === ""
                                || this.state.NRCpf.trim() === ""
                                || this.state.CDChave.trim() === ""
                                || this.state.DSLogradouro.trim() === ""
                                || this.state.NRNumero.trim() === ""
                                || this.state.NRCep.trim() === ""
                                || this.state.NMBairro.trim() === ""
                                || this.state.NMCidade.trim() === ""
                                || this.state.NMEstado.trim() === ""
                                || this.state.NRTelefone.trim() === "") {
                                this.setState(() => ({ nameError: translate('entersigin') }))
                            } else {
                                this.setState(() => ({ nameError: null }))
                                this.SignIn();
                            }
                        }}
                    />
                    
                   
                    <Text style={{ flex: 1, marginRight: 40, marginLeft: 40, textAlign: "center", marginBottom: 20 }}> {translate('agree')} <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}} onPress={() => this.clicou()}> {translate('termsofuse')}  </Text> </Text>

                    <Overlay isVisible={this.state.visible} onBackdropPress={this.clicou} style={style.container}>

                        <View style={{ width: windowWidth - 50, height: windowHeight - 200, justifyContent: 'center', alignSelf: 'center' }}>
                            <Text>
                            {translate('termsofuse')}
                                </Text>
                            <PDFReader
                                style={{ marginTop: 25 }}
                                withPinchZoom={true}
                                source={{
                                    uri: `URL PDF`,
                                }}
                                onError={() => { Alert.alert("Erro", "Recarregue a página") }}
                            />
                        </View>


                    </Overlay>


                </ScrollView>

            </>

        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
    },
    input: {
        flexWrap: "wrap",
        display: "flex",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 20,
        marginLeft: 20,
        justifyContent: "center"

    },
    personal: {
        flexWrap: "wrap",
        display: "flex",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 20,
        marginLeft: 20,
        justifyContent: "center"

    },
    endereco: {
        flexWrap: "nowrap",
        display: "flex",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 20,
        marginLeft: 20,
        justifyContent: "center"

    },
    divider: {
        fontSize: 1
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#30B2BA"
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40
    },
    titleA: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 40
    },
    check: {
        flex: 1,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "row",

    },
    mv: {
        flexWrap: "wrap",
    },
    std: {
        flexWrap: "wrap",
    },
    button: {
        display: "flex",
        marginBottom: 150,
        padding: 10,
        margin: 20,
        backgroundColor: '#fff'
    }
})