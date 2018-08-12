import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from 'react-native'
import styles from './List.Styles'
import images from '../../Themes/Images'
import { sendBird } from '../Root/RootContainer'
import { currentEmail } from '../Main/Main.Screen'
import Toast from 'react-native-simple-toast'

export default class ListScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dialogVisible: false,
      inviteEmail: '',
      groupName: '',
      isLoading: false,
      arrGroup: []
    }
  }

  componentDidMount () {
    this.getListGroup()
  }

  getListGroup = () => {
    this.setState({isLoading: true})
    let channelListQuery = sendBird.GroupChannel.createMyGroupChannelListQuery()
    channelListQuery.includeEmpty = true
    channelListQuery.limit = 20 // pagination limit could be set up to 100

    if (channelListQuery.hasNext) {
      channelListQuery.next((channelList, error) => {
        if (error) {
          console.error(error)
        } else {
          this.setState({arrGroup: channelList})
        }
      })
      this.setState({isLoading: false})
    }
  }

  openModal = () => {
    this.setState({dialogVisible: true})
  }

  closeModal = () => {
    this.setState({dialogVisible: false})
  }

  onDialogCancel = () => {
    this.setState({
      dialogVisible: false,
      inviteEmail: '',
      groupName: ''
    })
  }

  onDialogDone = () => {
    this.setState({
      dialogVisible: false,
      isLoading: true,
    })

    if (currentEmail.trim() && this.state.inviteEmail.trim()) {
      let userIds = [currentEmail, this.state.inviteEmail]
      sendBird.GroupChannel.createChannelWithUserIds(userIds, false, this.state.groupName, null, null,
        (createdChannel, error) => {
          if (error) {
            Toast.show('Invite fail')
          } else {
            Toast.show('Invite successful')
            this.getListGroup()
          }
          this.setState({isLoading: false})
        })
    } else {
      Toast.show('Please input all fields')
      this.setState({isLoading: false})
    }
  }

  renderItem = ({item}) => {
    let peerInfo = {}
    for (let i = 0; i < item.members.length; i++) {
      let info = item.members[i]
      if (info.userId !== currentEmail) {
        peerInfo = info
        break
      }
    }
    return (
      <TouchableOpacity style={styles.viewWrapItem} onPress={() =>
        this.props.navigation.navigate('ChatScreen', {channelUrl: item.url})
      }>
        <View>
          <Image style={styles.viewAvatar} source={{uri: item.coverUrl}}/>
          {peerInfo.connectionStatus === 'online' ?
            <View style={styles.statusIndicator}/> :
            null}
        </View>
        <View>
          <Text style={styles.viewTextNameGroup}>
            Group name: {item.name}
          </Text>
          <Text style={styles.viewTextMail}>
            Email: {peerInfo.userId}
          </Text>
          <Text style={styles.viewTextMail}>
            Nickname: {peerInfo.nickname ? peerInfo.nickname : 'Not available'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.viewContainer}>

        {/* Dialog */}
        <Modal
          transparent={true}
          visible={this.state.dialogVisible}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.backgroundDialog}>
            <View style={styles.viewDialog}>
              <View style={styles.viewTitleDialog}>
                <Text style={styles.textTitleDialog}>INVITE USER</Text>
              </View>
              <TextInput
                placeholder="Email"
                style={styles.textInputDialog}
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={value =>
                  this.setState({inviteEmail: value})
                }
                numberOfLines={1}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.refInputGroupName.focus()
                }}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
              <View style={styles.viewUnderline}/>
              <TextInput
                ref={(ref) => this.refInputGroupName = ref}
                placeholder="Group name"
                style={styles.textInputDialog}
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={value =>
                  this.setState({groupName: value})
                }
                numberOfLines={1}
                returnKeyType="done"
                autoCapitalize={'none'}
              />
              <View style={styles.viewUnderline}/>
              <View
                style={styles.viewWrapBtnDialog}>
                <TouchableOpacity
                  style={styles.btnDismissDialog}
                  onPress={() => this.onDialogCancel()}
                >
                  <Text style={styles.textBtnDialog}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDoneDialog}
                  onPress={() => this.onDialogDone()}
                >
                  <Text style={styles.textBtnDialog}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*List group chat*/}
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={this.getListGroup}
              refreshing={this.state.isLoading}
            />
          }
          style={styles.viewContainer}
          data={this.state.arrGroup}
          renderItem={(value) => this.renderItem(value)}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Floating button */}
        <TouchableOpacity style={styles.viewWrapFloatingBtn} onPress={this.openModal}>
          <Image source={images.ic_add} style={styles.viewImgBtn}/>
        </TouchableOpacity>

        {/* Loading */}
        {this.state.isLoading ?
          <View style={styles.viewLoading}>
            <ActivityIndicator size="large"/>
          </View> :
          null}

      </View>

    )
  }
}
