import { Button, Overlay, Header } from 'react-native-elements';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, NativeModules, Linking, Platform, TouchableOpacity, Clipboard } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'
import { translate } from '../locales';

export default class About extends Component {

    constructor() {
        super();
        this.state = {
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


    dialCall = () => {

        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${+999999999999}`; }
        else { phoneNumber = `telprompt:${+999999999999}`; }

        Linking.openURL(phoneNumber);
    };

    dialCallTel = () => {

        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${+999999999999}`; }
        else { phoneNumber = `telprompt:${+999999999999}`; }

        Linking.openURL(phoneNumber);
    };

    clicou = () => {

        var tc = null;
        if (Platform.OS === 'ios') {
            const language = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]

            if (language.indexOf('en') > -1) {
                tc = this.state.tcIosIng
            }

            if (language == 'pt_BR') {
                tc = this.state.tcIosPt
            }
            if (language.indexOf('es') > -1) {
                tc = this.state.tcIosEsp
            }
            if(tc === null){
                tc = this.state.tcIosIng
            }
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

    clicoucontato = () => {
        this.setState({ contactvisible: !this.state.contactvisible });
    }

    render() {



        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: '#30B2BA' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'Sobre/Contato', style: { color: '#fff' } }}
                />
                <View style={style.container}>
                    <Button
                        title="Contato"
                        onPress={this.clicoucontato}
                        buttonStyle={{ margin: 20, borderRadius: 20, backgroundColor: '#30B2BA' }}
                        icon={{
                            name: "phone",
                            size: 15,
                            color: "white"
                        }} />

                    <Button
                        title="Termos e condições de uso"
                        onPress={this.clicou}
                        buttonStyle={{ margin: 20, borderRadius: 20, backgroundColor: '#30B2BA'  }}
                        icon={{
                            name: "assignment",
                            size: 15,
                            color: "white"
                        }} />

                    <Overlay isVisible={this.state.visible} onBackdropPress={this.clicou} style={style.container}>

                        <View style={{ width: windowWidth - 50, height: windowHeight - 200, justifyContent: 'center', alignSelf: 'center' }}>
                            <Text>
                                {translate('termsofuse')}
                            </Text>
                            <PDFReader
                                style={{ marginTop: 25 }}
                                withPinchZoom={true}
                                source={{
                                    uri: `URL DO PDF AQUI`,
                                }}
                                onError={() => { Alert.alert("Erro", "Recarregue a página") }}
                            />
                        </View>


                    </Overlay>

                    <Overlay isVisible={this.state.contactvisible} onBackdropPress={this.clicoucontato} style={style.container}>

                        <View style={{ width: windowWidth - 50, height: 200, justifyContent: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => this.dialCall()}>
                                <Text style={{ color: 'red', fontSize: 14,  textAlign: 'center', marginTop: 3, marginLeft: 25, marginBottom: 17 }}>
                                    (11)98250-0016(WhatsApp)
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.dialCallTel()}>
                                <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', marginTop: 3, marginLeft: 25, marginBottom: 17 }}>
                                    (11)3835-4555
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {Clipboard.setString('mkt2edguara@gmail.com'); Alert.alert("Copiado!", "O e-mail foi copiado")}}>
                                <View>
                                    <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', marginTop: 3, marginLeft: 25, marginBottom: 17 }}>
                                    mkt2edguara@gmail.com
    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </Overlay>
                </View>


            </>

        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: 200
    },
    buttons: {
        display: "flex",
        marginBottom: 150,
        padding: 10,
        margin: 20,
    }
})

