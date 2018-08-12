import React, { Component } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import ReduxNavigation from '../../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../../Redux/StartupRedux'
import ReduxPersist from '../../Config/ReduxPersist'

import styles from './RootContainerStyles'
import SendBird from 'sendbird'

export const sendBird = new SendBird({'appId': '7615E974-CAD6-4AF3-A5FB-1A5041B4F815'})

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        {Platform.OS === 'android' ? <StatusBar barStyle='light-content'/> : <StatusBar barStyle='dark-content'/>}
        <ReduxNavigation/>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
