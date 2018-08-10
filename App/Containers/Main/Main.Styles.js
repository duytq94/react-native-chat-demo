import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    flex: 1
  },
  viewBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  textTitleInput: {
    color: '#203152',
    fontWeight: 'bold',
    fontSize: 16
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10
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
  btnConnect: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#203152',
    borderRadius: 10,
    margin: 10
  },
  textBtnConnect: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  viewLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)'
  }
})
