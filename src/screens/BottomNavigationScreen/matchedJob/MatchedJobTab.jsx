import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import SavedJob from '../matchedJob/SavedJob';
import AppBar from '../../../components/custom_toolbar/AppBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MatchedJob from './MatchedJob';
import { customFonts } from '../../../constants/theme';
import AddPref from './AddPref';
import { useDispatch, useSelector } from 'react-redux';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { customTextColor } from '../../../constants/Color';



const FirstRoute = () => (
  //<View style={{ flex: 1, backgroundColor: '#ff4081' }} />
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

  const dispatch = useDispatch();
  const { isAuthenticated, token, userProfile, isLoading } = useSelector(state => state.auth);

  const layout = useWindowDimensions();
  const handleBackClick = () => {
    navigation.goBack();
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Matched Job' },
    { key: 'second', title: 'Saved Job' },
  ]);

  const handleLogin = () => {
    navigation.navigate('Login')
  };

  const handleProfile = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log("isloading", isLoading);
  }, [isLoading]);


  const AddProp = () => {
    return (
      <View>
        {
          isAuthenticated && token !== null ? (
            <AddPref title={"No Matched job Found"} subtitle={"Add your preference to view Matched Job"} btnText={"Add preference"} handleBtn={handleProfile} />
          ) : (
            <AddPref title={"Discover your dream jobs"} subtitle={"Login to view Matched Job"} btnText={"Login"} handleBtn={handleLogin} />
          )
        }
      </View>
    )
  }

  const renderTabBar = props => {
    return (
      <>
        {isLoading ? (
          <>
            <ActivityIndicator
              animating={true}
              style={{ flex: 1 }}
              color={customTextColor.lightGreen}
            />
          </>
        ) : (

          <View>
            {!!!userProfile?.preference ? (
              <AddProp />
            ) : (
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
            )}
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <AppBar handleBack={handleBackClick} />
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
