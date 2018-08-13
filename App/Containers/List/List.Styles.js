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

  // Floating button
  viewWrapFloatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#f5a623',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewImgBtn: {
    width: 30,
    height: 30,
  },

  // Dialog
  backgroundDialog: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center'
  },
  viewDialog: {
    borderRadius: 8,
    borderColor: '#8e8e93',
    borderWidth: 0.8,
    width: '80%',
    backgroundColor: 'white',
    marginTop: 100
  },
  btnDoneDialog: {
    margin: 10,
    flex: 1,
    height: 40,
    backgroundColor: '#203152',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnDismissDialog: {
    margin: 10,
    flex: 1,
    width: '40%',
    height: 40,
    backgroundColor: '#aeaeae',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtnDialog: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  viewTitleDialog: {
    height: 50,
    backgroundColor: '#f5a623',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textTitleDialog: {
    color: '#203152',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textInputDialog: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
    color: '#203152',
  },
  viewUnderline: {
    width: '85%',
    height: 0.5,
    backgroundColor: '#aeaeae',
    alignSelf: 'center',
    marginBottom: 10,
  },
  viewWrapBtnDialog: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  // Item
  viewWrapItem: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10
  },
  viewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10
  },
  viewTextNameGroup: {
    marginLeft: 20,
    color: '#203152',
  },
  viewTextMail: {
    marginTop: 5,
    marginLeft: 20,
    color: '#203152',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#70cc2f',
    position: 'absolute',
    right: 5,
    bottom: 0
  }
})
