import React, { Component } from 'react'
import { BackHandler, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './Chat.Styles'
import Toast from 'react-native-simple-toast'
import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'
import { currentEmail } from '../Main/Main.Screen'

const UNIQUE_HANDLER_ID = 123

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
    sendBird.removeChannelHandler(UNIQUE_HANDLER_ID)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
  }

  componentDidMount () {
    this.setupChat()
    this.setupListener()
  }

  setupChat = () => {
    this.setState({isLoading: true})
    sendBird.GroupChannel.getChannel(this.channelUrl, (channel, error) => {
      if (error) {
        console.log(error)
        Toast.show('Can not get channel, try again')
        this.setState({isLoading: false})
      } else {
        this.channel = channel
        this.loadHistory()
      }
    })
  }

  setupListener = () => {
    let channelHandler = new sendBird.ChannelHandler()

    channelHandler.onMessageReceived = (channel, message) => {
      if (channel.url === this.channelUrl) {
        let temp = this.processMessage(message)
        this.setState({
          arrMessage: [temp, ...this.state.arrMessage]
        })
      }
    }
    sendBird.addChannelHandler(UNIQUE_HANDLER_ID, channelHandler)
  }

  loadHistory = () => {
    let messageListQuery = this.channel.createPreviousMessageListQuery()

    messageListQuery.load(30, true, (messageList, error) => {
      if (error) {
        console.error(error)
        Toast.show('Can not get history messages')
      } else {
        this.setState({arrMessage: messageList.map(item => this.processMessage(item))})
        this.setState({isLoading: false})
      }
    })
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  renderItem = ({item, index}) => {
    // Message right (mine)
    if (item.sender === currentEmail) {
      return (
        <View style={styles.viewWrapItemRight}>
          <Text style={styles.textItemRight}>
            {item.content}
          </Text>
        </View>
      )
    } else {
      // Message left
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {
            (this.state.arrMessage[index - 1] && this.state.arrMessage[index - 1].sender === currentEmail ||
              index === 0) ?
              <Image style={styles.avatarItemLeft} source={{uri: item.avatar}}/> :
              <View style={{width: 30, height: 30, marginLeft: 10}}/>
          }
          <View style={styles.viewWrapItemLeft}>
            <Text style={styles.textItemLeft}>
              {item.content}
            </Text>
          </View>
        </View>
      )
    }

  }

  processMessage = (item) => {
    let message = {}

    message.content = item.message
    message.avatar = item._sender.profileUrl
    message.sender = item._sender.userId

    return message
  }

  sendMessage = () => {
    if (this.state.currentMessage.trim()) {
      this.channel.sendUserMessage(this.state.currentMessage, (message, err) => {
        if (err) {
          console.log(err)
          Toast.show('Can not send')
        } else {
          let temp = {
            content: this.state.currentMessage,
            avatar: '',
            sender: currentEmail
          }
          this.refInput.clear()
          this.setState({
            currentMessage: '',
            arrMessage: [temp, ...this.state.arrMessage]
          })

        }
      })
    } else {
      Toast.show('Nothing to send')
    }
  }

  render () {
    return (
      <View style={styles.viewContainer}>

        {/* Header */}
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.handleBackPress()}>
            <Image style={styles.icBack} source={images.ic_back}/>
          </TouchableOpacity>
          <Text style={styles.titleToolbar}>CHAT</Text>
        </View>

        {/*List message*/}
        <FlatList
          inverted={true}
          style={styles.viewContainer}
          data={this.state.arrMessage}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
        />

        {/*Input*/}
        <View style={styles.viewWrapInput}>
          {/* Input field */}
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.viewTextInput}
            ref={(ref) => this.refInput = ref}
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
