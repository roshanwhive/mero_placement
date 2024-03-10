import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import SavedJob from '../matchedJob/SavedJob'
import AppBar from '../../../components/custom_toolbar/AppBar'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MatchedJob from './MatchedJob';



const FirstRoute = () => (
    // <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  <MatchedJob></MatchedJob>
  );
  
  const SecondRoute = () => (
    // <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
   <SavedJob></SavedJob>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


const MatchedJobTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Job Applied' },
    { key: 'second', title: 'Profile Visit' },
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
    <><AppBar title={"Matched Job"} /><TabView
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

export default MatchedJobTab