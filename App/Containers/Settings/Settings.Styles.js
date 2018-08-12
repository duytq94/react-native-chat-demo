import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    flex: 1
  },
  viewBody: {
    margin: 20,
    flex: 1,
  },

  // Avatar
  viewWrapAvatar: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  imageAvatar: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 20
  },
  imageChangeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  btnChangeAvatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },

  // Input
  textTitleInput: {
    color: '#203152',
    fontWeight: 'bold'
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    color: '#203152'
  },
  viewItemInput: {
    marginTop: 10,
    marginBottom: 10
  },
  viewBreakLine: {
    width: '90%',
    height: 0.3,
    backgroundColor: 'grey',
    marginLeft: 10
  },

  // Btn update
  btnDone: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 120,
    backgroundColor: '#203152',
    borderRadius: 5,
    alignSelf: 'center'
  },
  textBtnDone: {
    color: 'white',
    fontWeight: 'bold'
  },
})
