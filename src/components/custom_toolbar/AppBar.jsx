import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MenuIcon from '../custom_toolbar/MenuIcon'
import BackButton from './BackButton'




export default function AppBar({ title }) {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <BackButton/>
      </View>
      <Text style={styles.middleContainer}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        <MenuIcon onPressBtn={bottom}/></View>

    </View>
  )
}

//const Drawer = createDrawerNavigator();

const bottom = () => {
  // <Drawer.Navigator>
  //   <Drawer.Screen name='Training' component={Training}></Drawer.Screen>
  // </Drawer.Navigator>
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
    textAlign: 'center',
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
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems:'center',
    justifyContent:'center',
  }
})