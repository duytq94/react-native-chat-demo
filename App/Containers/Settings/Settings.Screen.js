import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './Settings.Styles'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-simple-toast'

import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'

export default class SettingsScreen extends Component {
  constructor (props) {
    super(props)
    this.file = null
    this.state = {
      avatarSource: '',
      profileUrl: '',
      username: '',
      isLoading: false
    }
  }

  componentDidMount () {
    this.readDataLocal()
  }

  pickPhoto = () => {
    let options = {
      title: 'Choose ',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = {uri: response.uri}
        this.setState({
          avatarSource: source
        })

        this.file = {uri: response.uri, name: response.fileName, type: response.type}

      }
    })
  }

  onBtnUpdatePress = () => {
    if (this.state.username.trim()) {
      this.setState({isLoading: true})
      sendBird.updateCurrentUserInfoWithProfileImage(this.state.username, this.file,
        (response, error) => {
          if (!error) {
            this.writeDataLocal()
          } else {
            this.setState({isLoading: false})
            Toast.show(error.message)
          }
        })
    }
  }

  writeDataLocal = async () => {
    try {
      await AsyncStorage.setItem('username', this.state.username)
      Toast.show('Update info success')
    } catch (error) {
      Toast.show(error.message)
    }
    this.setState({isLoading: false})
  }

  readDataLocal = async () => {
    try {
      const value = await AsyncStorage.getItem('username')
      const value2 = await AsyncStorage.getItem('profileUrl')
      if (value) {
        this.setState({
          username: value,
          profileUrl: value2
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onBtnLogOutPress = () => {
    this.props.onLogOut()
  }

  render () {
    return (

      <View style={styles.viewContainer}>
        <View style={styles.viewBody}>

          {/* Change avatar */}
          <View style={styles.viewWrapAvatar}>
            <Image
              style={styles.imageChangeAvatar}
              source={
                this.state.avatarSource
                  ? this.state.avatarSource
                  : {uri: this.state.profileUrl}
              }
            />
            <TouchableOpacity
              onPress={() => this.pickPhoto()}
              style={styles.btnChangeAvatar}
            >
              <Image
                style={{width: 40, height: 40}}
                source={images.ic_camera}
              />
            </TouchableOpacity>
          </View>

          {/* Input field */}
          <View style={styles.viewItemInput}>
            <Text style={styles.textTitleInput}>Username</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='Have not setup yet'
              placeholderTextColor='#aeaeae'
              returnKeyType='done'
              onChangeText={(value) => this.setState({username: value})}
              value={this.state.username}
              autoCapitalize={'none'}
            />
            <View style={styles.viewBreakLine}/>
          </View>

          <View style={{height: 30}}/>

          {/* Btn update */}
          <TouchableOpacity style={styles.btnDone} onPress={this.onBtnUpdatePress}>
            <Text style={styles.textBtnDone}>UPDATE</Text>
          </TouchableOpacity>

          <View style={{height: 40}}/>

          {/* Btn log out */}
          <TouchableOpacity style={styles.btnDone} onPress={this.onBtnLogOutPress}>
            <Text style={styles.textBtnDone}>LOG OUT</Text>
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
