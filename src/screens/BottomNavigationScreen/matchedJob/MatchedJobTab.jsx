import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import SavedJob from '../matchedJob/SavedJob';
import AppBar from '../../../components/custom_toolbar/AppBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MatchedJob from './MatchedJob';
import { customFonts } from '../../../constants/theme';

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

const MatchedJobTab = ({ navigation }) => {
  const layout = useWindowDimensions();
  const handleBackClick = () => {
    navigation.goBack();
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Matched Job' },
    { key: 'second', title: 'Saved Job' },
  ]);
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ focused, route }) => {
          return (
            <Text
              style={{
                color: focused ? 'white' : 'gray',
                fontFamily: customFonts.fontPoppins,
              }}>
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
    <>
      <AppBar title={'Matched Job'} handleBack={handleBackClick} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

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

export default MatchedJobTab;
