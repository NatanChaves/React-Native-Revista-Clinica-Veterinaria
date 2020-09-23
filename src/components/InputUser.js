import { Input } from 'react-native-elements';
import React, { setState, Component, Text, View } from 'react';



export default class InputUser extends Component {

    state = {
        email: '',
        password: ''
    }
    render(){
        return (
            <>
                <Input
                    placeholder={this.state.email}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    leftIcon={{ type: 'font-awesome', name: 'at', color: '#30B2BA' }}
                />
                <Input
                    placeholder='Senha'
                    value={this.state.password}
                    onChangeText={email => this.setState({ password })}
                    secureTextEntry={true}
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#30B2BA' }}
                />

            </>
        );
    }
}