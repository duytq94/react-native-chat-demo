import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    flex: 1
  },

  // Input
  viewWrapInput: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10
  },
  viewTextInput: {
    flex: 1,
  },
  icSend: {
    width: 35,
    height: 35,
    marginLeft: 10
  }
})
