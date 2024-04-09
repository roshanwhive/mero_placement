import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/BottomNavigationScreen/Profile';
import MatchedJob from '../screens/BottomNavigationScreen/matchedJob/MatchedJobTab';
import MyStatus from '../screens/BottomNavigationScreen/myStatus/MyStatus';
import Search from '../screens/BottomNavigationScreen/Search';
import Home from '../screens/HomeScreen/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { customFontSize, customFonts } from '../constants/theme';

const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Matched Job') {
            iconName = 'briefcase-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'My Status') {
            iconName = 'stats-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{marginBottom: 0, paddingBottom: 0, marginTop: 15}}
            />
          );
        },
        tabBarActiveTintColor: '#9D050A',
        tabBarInactiveTintColor: '#919191',
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
          height: 80,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
          fontSize: customFontSize.font13,
          fontFamily: customFonts.fontPoppins,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Matched Job"
        component={MatchedJob}
        navigation={navigation}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="My Status" component={MyStatus} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function BottomTab({navigation}) {
  return <MyTabs navigation={navigation} />;
}

const styles = StyleSheet.create({
  tabIcons: {
    color: '#2b8256',
    marginLeft: 5,
  },
});
