import React from 'react';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import AppBar from '../../../components/custom_toolbar/AppBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import JobApplied from './JobApplied';
import ProfileVisits from './ProfileVisits';



const FirstRoute = () => (
  // <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  <JobApplied></JobApplied>
);

const SecondRoute = () => (
  // <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  <ProfileVisits></ProfileVisits>
);
const ThirdRoute = () => (
  // <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  <ProfileVisits></ProfileVisits>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const MyStatus = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Job Applied' },
    { key: 'second', title: 'Profile Visit' },
    { key: 'third', title: 'CV Download' },
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ focused, route }) => {
          return (
            <Text style={{ 
            color: focused ? 'white': 'gray'}}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
      />
    );
  };

  return (
    <><AppBar title={"My Status"} /><TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar} /></>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
  tabBar: {
    backgroundColor: '#9D050A',
    borderBottomWidth: 1,
    borderColor: '#9D050A',
  },
  indicatorStyle: {
    backgroundColor: '#2b8256',
    padding: 1.5,
    marginBottom: -2,
  },
  
});

export default MyStatus;