import React, { Component } from 'react'
import { Alert, BackHandler, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import styles from './Main.Styles'
import Toast from 'react-native-simple-toast'
import SendBird from 'sendbird'

const sb = new SendBird({'appId': '7615E974-CAD6-4AF3-A5FB-1A5041B4F815'})

export default class MainScreen extends Component {

  constructor (props) {
    super(props)
    BackHandler.addEventListener('hardwareBackPress', function () {
      Alert.alert(
        'Exit app',
        'Are you sure to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      )
      return true
    })
    this.state = {
      email: '',
      username: ''
    }
  }

  componentDidMount () {
    SplashScreen.hide()
  }

  onBtnConnectPress = () => {
    if (this.state.email && this.state.username) {
      sb.connect(this.state.email, (user, error) => {
        if (error) {
          Toast.show(error.message)
        } else {
          Toast.show('Login success')

        }
      })
    } else {
      Toast.show('Please input all fields')
    }
  }

  render () {
    return (
      <View style={styles.viewContainer}>
        {/* Header */}
        <View style={styles.toolbar}>
          <Text style={styles.titleToolbar}>CHAT SENBIRD</Text>
        </View>

        {/* Body */}
        <View style={styles.viewBody}>
          <View style={styles.viewItemInput}>
            <Text style={styles.textTitleInput}>Email</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="123@gmail.com"
              placeholderTextColor="#aeaeae"
              returnKeyType="next"
              onChangeText={(value) => this.setState({email: value})}
              onSubmitEditing={() => {
                this.refs.username.focus()
              }}
            />
            <View style={styles.viewBreakLine}/>
          </View>

          <View style={styles.viewItemInput}>
            <Text style={styles.textTitleInput}>Username</Text>
            <TextInput
              ref="username"
              style={styles.textInput}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Adam"
              placeholderTextColor="#aeaeae"
              returnKeyType="done"
              onChangeText={(value) => this.setState({username: value})}
              onSubmitEditing={this.onBtnConnectPress}
            />
            <View style={styles.viewBreakLine}/>
          </View>

          <View style={{height: 30}}/>

          <TouchableOpacity onPress={this.onBtnConnectPress} style={styles.btnConnect}>
            <Text style={styles.textBtnConnect}>CONNECT</Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}
