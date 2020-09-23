import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { AsyncStorage } from 'react-native'
const axios = require('axios');


export default class AuthOrApp extends Component {


  async componentDidMount() {

    const JWT = await AsyncStorage.getItem('token')
    
    if (JWT != null) {
      this.props.navigation.push("Languages")

    } else {
      this.props.navigation.push("Login")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000'
  }
})