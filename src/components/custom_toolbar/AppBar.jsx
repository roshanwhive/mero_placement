import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MenuIcon from '../custom_toolbar/MenuIcon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customThemeColor} from '../../constants/Color';
import {createDrawerNavigator} from '@react-navigation/drawer';

//const Drawer = createDrawerNavigator();

export default function AppBar({title, handleBack, isHome}) {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        {!title ? (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/mero-placement-logo1.png')}
              style={styles.logoImage}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.middleContainer}>{title}</Text>

      <View style={styles.rightContainer}>
        <MenuIcon onPressBtn={bottom} />
      </View>
    </View>
  );
}

const bottom = () => {};

const styles = StyleSheet.create({
  navBar: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    backgroundColor: customThemeColor.white,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  leftContainer: {
    justifyContent: 'flex-start',
    marginLeft: 15,
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 2,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '500',
    color: 'black',
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
  },
  imageContainer: {
    alignItems: 'left',
    marginVertical: 10,
    width: 120,
    height: 40,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});
