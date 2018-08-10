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
    backgroundColor: '#f5a623',
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
    color: '#203152',
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
