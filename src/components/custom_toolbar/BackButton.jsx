import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

 class BackButton extends React.Component {
 
  render() {
      if(Platform.OS === 'ios'){     
        return (
            <TouchableOpacity
            >  
            <View style={{ padding:20, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-back" size={25} color="#000000" />   
             {/* <---- Back icon for iOS */}
            </View>
            </TouchableOpacity>
          );
      }else{
        return (
            <TouchableOpacity
            >
            <View style={{  padding:20,justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="md-arrow-back" size={25} color="#000000" />      
            {/* <---- Back icon for Android */}
            </View>
            </TouchableOpacity>
          );
      }
    
  }
}
