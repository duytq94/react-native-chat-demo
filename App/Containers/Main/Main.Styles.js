import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    flex: 1
  },
  viewBody: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },
  textTitleInput: {
    color: '#203152',
    fontWeight: 'bold',
    fontSize: 16
  },
  textInput: {
    marginLeft: 25,
    marginRight: 25
  },
  viewItemInput: {
    marginTop: 10,
    marginBottom: 10
  },
  viewClear: {
    position: 'absolute',
    right: 10,
    top: 35
  },
  icClear: {
    width: 20,
    height: 20,
  },
  viewBreakLine: {
    width: '90%',
    height: 0.5,
    backgroundColor: 'grey',
    marginLeft: 10
  },
  btnConnect: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#203152',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30
  },
  textBtnConnect: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
})
