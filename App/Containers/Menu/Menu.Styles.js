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

  // Bottom
  viewBottom: {
    flexDirection: 'row',
  },
  btnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#203152',
    flexDirection: 'row'
  },
  btnPassive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#aeaeae',
    flexDirection: 'row'
  },
  textActive: {
    color: 'white',
    fontWeight: 'bold'
  },
  textPassive: {
    color: 'white',
    fontWeight: 'bold'
  },
  icBottom: {
    width: 30,
    height: 30,
    marginRight: 10
  }

})
