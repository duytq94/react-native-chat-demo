import { StackNavigator } from 'react-navigation'
import MainScreen from '../Containers/Main/Main.Screen'
import MenuScreen from '../Containers/Menu/Menu.Screen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainScreen: {screen: MainScreen},
  MenuScreen: {screen: MenuScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header,
    gesturesEnabled: false,
  }
})

export default PrimaryNav
