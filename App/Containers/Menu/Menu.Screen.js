import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import styles from './Menu.Styles'
import SendBird from 'sendbird'

const sb = new SendBird({'appId': '7615E974-CAD6-4AF3-A5FB-1A5041B4F815'})

export default class MenuScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {}
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


      </View>
    )
  }
}
