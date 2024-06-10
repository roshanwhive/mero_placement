import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SavedJob from '../matchedJob/SavedJob';
import AppBar from '../../../components/custom_toolbar/AppBar';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MatchedJob from './MatchedJob';
import {customFonts} from '../../../constants/theme';
import AddPref from './AddPref';
import {useDispatch, useSelector} from 'react-redux';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import {customTextColor} from '../../../constants/Color';

const FirstRoute = () => <MatchedJob></MatchedJob>;

const SecondRoute = () => <SavedJob></SavedJob>;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const MatchedJobTab = ({navigation}) => {
  const dispatch = useDispatch();

  const {isAuthenticated, token, isLoading} = useSelector(state => state.login);
  console.log('Is authenticated', isAuthenticated);
  const {userProfile} = useSelector(state => state.userProfile);

  const layout = useWindowDimensions();
  const handleBackClick = () => {
    navigation.goBack();
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Matched Job'},
    {key: 'second', title: 'Saved Job'},
  ]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleProfile = () => {
    navigation.goBack();
  };
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    CloseActivityIndicator();
  }, []);

  const CloseActivityIndicator = () => {
    setTimeout(() => {
      setAnimate(false);
    }, 3000);
  };

  const AddProp = () => {
    return (
      <View>
        <AddPref
          title={'No Matched job Found'}
          subtitle={'Add your preference to view Matched Job'}
          btnText={'Add preference'}
          handleBtn={handleProfile}
        />
      </View>
    );
  };

  const renderTabBar = props => {
    return (
      <>
        <View>
          {/* {isLoading ? (
            <ActivityIndicator
              animating={true}
              style={{flex: 1, height: '100%'}}
              color={customTextColor.lightGreen}
            />
          ) : ( */}
          <View>
            {/* {userProfile?.preference ? (
                <AddProp />
              ) : ( */}
            <TabBar
              {...props}
              renderLabel={({focused, route}) => {
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
          </View>
          {/* )} */}
        </View>
      </>
    );
  };

  return (
    <>
      <AppBar handleBack={handleBackClick} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return isAuthenticated ? (
                <MatchedJob />
              ) : (
                <AddPref
                  title={'Discover your dream jobs'}
                  subtitle={'Login to view Matched Job'}
                  btnText={'Login'}
                  handleBtn={handleLogin}
                />
              );
            case 'second':
              return <SavedJob />;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
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
