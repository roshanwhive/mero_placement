import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthHeader from '../AuthHeader';
import MenuIcon from '../custom_toolbar/MenuIcon'

export default function AppBar({ title }) {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <AuthHeader />
      </View>
      <Text style={styles.middleContainer}>
        {title}
      </Text>
      <View style={styles.rightContainer}><MenuIcon/></View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  leftContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  middleContainer: {
    flex: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 10,
    color: 'black',
    textAlign: 'center'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rightIcon: {
    paddingHorizontal: 20,
    resizeMode: 'contain',
    backgroundColor: 'white',
  }
})