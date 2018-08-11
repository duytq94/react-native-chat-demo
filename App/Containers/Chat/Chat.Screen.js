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
  View,
  FlatList
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import styles from './Chat.Styles'
import Toast from 'react-native-simple-toast'
import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'

export default class ChatScreen extends Component {

  constructor (props) {
    super(props)
    this.backPress = this.handleBackPress.bind(this)
    if (!this.props.navigation.state.params.channelUrl) {
      Toast.show('Can not get channel url')
      this.handleBackPress()

    } else {
      this.channelUrl = this.props.navigation.state.params.channelUrl
      this.channel = undefined
      this.state = {
        isLoading: false,
        arrMessage: [],
        currentMessage: ''
      }
    }
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.backPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
  }

  componentDidMount () {
    this.setupChat()
  }

  setupChat = () => {
    this.setState({isLoading: true})
    sendBird.GroupChannel.getChannel(this.channelUrl, (channel, error) => {
      if (error) {
        console.log(error)
        Toast.show('Can not get channel, try again')
      } else {
        this.setState({
          isLoading: false
        })
        this.channel = channel
        this.loadHistory()
      }
    })
  }

  loadHistory = () => {
    let messageListQuery = this.channel.createPreviousMessageListQuery()

    messageListQuery.load(30, true, (messageList, error) => {
      if (error) {
        console.error(error)
        Toast.show('Can not get history messages')
      } else {
        this.setState({arrMessage: messageList})
        console.log('bbbbbbbbbbb', messageList)
      }
    })
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  renderItem = ({item}) => {
    console.log('aaaaaaaaaa', item)
    return (
      <View>

      </View>
    )
  }

  sendMessage = () => {
    if (this.state.currentMessage.trim()) {
      this.channel.sendUserMessage(this.state.currentMessage, (message, err) => {
        if (err) {
          console.log(err)
          Toast.show('Can not send')
        } else {
          // this.onMessage(message)
        }
      })
      this.setState({currentMessage: ''})
    } else {
      Toast.show('Nothing to send')
    }
  }

  render () {
    return (
      <View style={styles.viewContainer}>

        {/* Header */}
        <View style={styles.toolbar}>
          <Text style={styles.titleToolbar}>CHAT</Text>
        </View>

        {/*List message*/}
        <FlatList
          style={styles.viewContainer}
          data={this.state.arrMessage}
          renderItem={(value) => this.renderItem(value)}
          keyExtractor={(item, index) => index.toString()}
        />

        {/*Input*/}
        <View style={styles.viewWrapInput}>
          {/* Input field */}
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.viewTextInput}
            ref="reply"
            placeholder="Type your message..."
            onChangeText={value => {
              this.setState({currentMessage: value})
            }}
          />

          {/* Button send message */}
          <TouchableOpacity
            onPress={this.sendMessage}>
            <Image
              source={images.ic_send}
              style={styles.icSend}
            />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
