import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
   
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButton';
 
 class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);     
    }
    
  render() {
    return (
        <View style={styles.navBar}>
        <View style={styles.leftContainer}>
         <BackButton/>    
          {/* //<---- Use of BackButton.js */}
        </View>
        <Text style={styles.middleContainer}>
         {this.props.title}
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon}>
          <Icon name="ios-search" size={25} color="#000000" />
              </View>
              <View style={styles.rightIcon}>
          <Icon name="md-cart" size={25} color="#000000" />
              </View>
        </View>
      </View>
      );
    
    
  }
}
// export default withNavigation();
const styles = StyleSheet.create({
    navBar: {
      height: 54,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
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
        fontSize:18,
        marginLeft: 10,
        marginRight:10
      },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rightIcon: {
    paddingHorizontal:20,
      resizeMode: 'contain',
      backgroundColor: 'white',
    }
  });