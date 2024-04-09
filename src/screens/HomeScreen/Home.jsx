import {StatusBar, ScrollView, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Categories from '../../components/Categories';
import Featured from '../../containers/Featured';
import TotalJobs from '../../containers/TotalJobs';
import Training from '../../containers/Training';
import ActivelySeekingForJobCard from '../../containers/ActivelySeekingForJobCard';
import AppBar from '../../components/custom_toolbar/AppBar';
import {customThemeColor} from '../../constants/Color';
import {useSelector} from 'react-redux';
import CompleteProfile from '../../containers/modal/CompleteProfile';
import {getUserProfile} from '../../features/auth/AuthSlice';
import {customFontSize, customFonts} from '../../constants/theme';

const Home = ({navigation}) => {
  const {userProfile} = useSelector(state => state.auth);

  return (
    <>
      <CompleteProfile />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <AppBar isHome={true} />
          <View style={styles.textWrapper}>
            <Text style={styles.greetingText}>
              Hello, {userProfile?.profile?.lead_name}
            </Text>
            <Text style={styles.subHeading}>Get Your Dream Job!</Text>
          </View>
        </View>

        {/* Main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {/* Categories */}
          <Categories />
          <ActivelySeekingForJobCard />
          {/* Featured */}
          <View style={styles.featuredContainer}>
            <Featured navigation={navigation} />
          </View>
          <Training navigation={navigation} />
          <View style={styles.totalJobs}>
            <TotalJobs navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    color: '#fcfcfc',
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
  },
  subHeading: {
    fontSize: customFontSize.font24,
    color: '#ffffff',
    fontFamily: customFonts.fontPoppins,
  },
  header: {
    height: 400,
    backgroundColor: customThemeColor.darkRed,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  scrollViewContent: {
    paddingBottom: 120,
    paddingTop: 10,
    marginTop: 170,
    zIndex: 0,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 25,
    position: 'relative',
    borderTopRightRadius: 25,
  },
  featuredContainer: {
    marginTop: 5,
  },
  totalJobs: {
    marginTop: 5,
  },
});

export default Home;
