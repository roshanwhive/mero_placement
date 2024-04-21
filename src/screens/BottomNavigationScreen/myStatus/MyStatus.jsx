import React from 'react';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import AppBar from '../../../components/custom_toolbar/AppBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import JobApplied from './JobApplied';
import FollowedJob from './FollowedJob';
import { customFonts } from '../../../constants/theme';
import FollowedCompany from './FollowedCompany';
import AddPref from '../matchedJob/AddPref';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native-animatable';

const FirstRoute = () => (
  <JobApplied></JobApplied>
);

const SecondRoute = () => (
  <FollowedJob></FollowedJob>
);
const ThirdRoute = () => (
  <FollowedCompany></FollowedCompany>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const MyStatus = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, userProfile } = useSelector(state => state.auth);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Job Applied' },
    { key: 'second', title: 'Followed Job' },
    { key: 'third', title: 'Followed Company' },
  ]);

  const handleLogin = () => {
    navigation.navigate('Login')
  };


  const renderTabBar = props => {
    return (
      <><View>
        {isAuthenticated && token !== null ? (
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
            style={styles.tabBar} />
        ) : (
          <AddPref title={"Discover your dream jobs"} subtitle={"Login to Browse Job"} btnText={"Login"} handleBtn={handleLogin} />
        )}
      </View></>
    );
  };

  return (
    <>
      <AppBar />
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

export default MyStatus;
