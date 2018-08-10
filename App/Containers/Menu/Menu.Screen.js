import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import styles from './Menu.Styles'
import SettingsScreen from '../Settings/Settings.Screen'
import images from '../../Themes/Images'

export default class MenuScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      // true = List, false = Settings,
      isTabOneActive: true,

    }
  }

  componentDidMount () {
    SplashScreen.hide()
  }

  render () {
    return (
      <View style={styles.viewContainer}>
        {/* Header */}
        <View style={styles.toolbar}>
          <Text style={styles.titleToolbar}>MENU</Text>
        </View>

        {/* Body */}
        <View style={styles.viewContainer}>
          {
            this.state.isTabOneActive ?
              <SettingsScreen/> :
              null
          }
        </View>

        {/* Bottom */}
        <View style={styles.viewBottom}>
          <TouchableOpacity
            style={this.state.isTabOneActive ? styles.btnActive : styles.btnPassive}
            onPress={() => {
              this.setState({
                isTabOneActive: true
              })
            }}>
            <Image style={styles.icBottom}
                   source={this.state.isTabOneActive ? images.ic_list_active : images.ic_list_passive}/>
            <Text
              style={this.state.isTabOneActive ? styles.textActive : styles.textPassive}>
              LIST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.state.isTabOneActive ? styles.btnPassive : styles.btnActive}
            onPress={() => {
              this.setState({
                isTabOneActive: false
              })
            }}>
            <Image style={styles.icBottom}
                   source={!this.state.isTabOneActive ? images.ic_setting_active : images.ic_setting_passive}/>
            <Text
              style={this.state.isTabOneActive ? styles.textPassive : styles.textActive}>
              SETTINGS
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
