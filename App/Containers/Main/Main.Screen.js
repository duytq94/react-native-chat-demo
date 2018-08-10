import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  BackHandler,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import styles from './Main.Styles'
import Toast from 'react-native-simple-toast'
import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'

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
      username: '',
      isLoading: false,
    }
  }

  componentDidMount () {
    SplashScreen.hide()
    this.readDataLocal()
  }

  onBtnConnectPress = () => {
    Keyboard.dismiss()
    this.setState({isLoading: true})
    if (this.state.email && this.state.username) {
      sendBird.connect(this.state.email, (user, error) => {
        this.setState({isLoading: false})
        if (error) {
          Toast.show(error.message)
        } else {
          this.writeDataLocal()
        }
      })
    } else {
      this.setState({isLoading: false})
      Toast.show('Please input all fields')
    }
  }

  readDataLocal = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if (value) {
        this.setState({isLoading: true})
        sendBird.connect(value, (user, error) => {
          this.setState({isLoading: false})
          if (error) {
            Toast.show(error.message)
          } else {
            Toast.show('Login success')
            this.props.navigation.navigate('MenuScreen')
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  writeDataLocal = () => {
    try {
      AsyncStorage.setItem('email', this.state.email, this.onWriteLocalSuccess)
    } catch (error) {
      Toast.show(error.message)
    }
  }

  onWriteLocalSuccess = () => {
    Toast.show('Login success')
    this.props.navigation.navigate('MenuScreen')
  }

  onClearEmailPress = () => {
    this.refInputEmail.clear()
    this.setState({email: ''})
  }

  onClearUsernamePress = () => {
    this.refInputUsername.clear()
    this.setState({username: ''})
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
              ref={(ref) => this.refInputEmail = ref}
              style={styles.textInput}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="123@gmail.com"
              placeholderTextColor="#aeaeae"
              returnKeyType="next"
              onChangeText={(value) => this.setState({email: value})}
              onSubmitEditing={() => {
                this.refInputUsername.focus()
              }}
            />
            <TouchableOpacity style={styles.viewClear} onPress={this.onClearEmailPress}>
              <Image source={images.ic_clear} style={styles.icClear}/>
            </TouchableOpacity>
            <View style={styles.viewBreakLine}/>
          </View>

          <View style={styles.viewItemInput}>
            <Text style={styles.textTitleInput}>Username</Text>
            <TextInput
              ref={(ref) => this.refInputUsername = ref}
              style={styles.textInput}
              autoCapitalize={'none'}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Adam"
              placeholderTextColor="#aeaeae"
              returnKeyType="done"
              onChangeText={(value) => this.setState({username: value})}
              onSubmitEditing={this.onBtnConnectPress}
            />
            <TouchableOpacity style={styles.viewClear} onPress={this.onClearUsernamePress}>
              <Image source={images.ic_clear} style={styles.icClear}/>
            </TouchableOpacity>
            <View style={styles.viewBreakLine}/>
          </View>

          <View style={{height: 30}}/>

          <TouchableOpacity onPress={this.onBtnConnectPress} style={styles.btnConnect}>
            <Text style={styles.textBtnConnect}>CONNECT</Text>
          </TouchableOpacity>

        </View>

        {/* Loading */}
        {
          this.state.isLoading ?
            <View style={styles.viewLoading}>
              <ActivityIndicator size="large"/>
            </View> :
            null
        }


      </View>
    )
  }
}
