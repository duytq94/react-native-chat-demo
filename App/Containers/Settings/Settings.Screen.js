import React, { Component } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './Settings.Styles'
import ImagePicker from 'react-native-image-picker'
import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'

export default class SettingsScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      avatarSource: '',
      username: ''
    }
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
        let source = {uri: response.uri}

        this.setState({avatarSource: source})
      }
    })
  }

  onBtnUpdatePress = () => {
    sendBird.updateCurrentUserInfoWithProfileImage(this.state.username, this.state.avatarSource,
      function (response, error) {
        console.log(response, error)
      })
  }

  onBtnLogOutPress = () => {

  }

  render () {
    return (

      <ScrollView>
        <View style={styles.viewBody}>

          {/* Change avatar */}
          <View style={styles.viewWrapAvatar}>
            <Image
              style={styles.imageChangeAvatar}
              source={
                this.state.avatarSource
                  ? this.state.avatarSource
                  : null
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
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Adam"
              placeholderTextColor="#aeaeae"
              returnKeyType="done"
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
      </ScrollView>

    )
  }
}
