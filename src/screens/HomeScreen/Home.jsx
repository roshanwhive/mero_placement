import { StatusBar, ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '../../components/Categories';
import Featured from '../../containers/Featured';
import TotalJobs from '../../containers/TotalJobs';
import Training from '../../containers/Training';
import ActivelySeekingForJobCard from '../../containers/ActivelySeekingForJobCard';
import AppBar from '../../components/custom_toolbar/AppBar';
import { customThemeColor } from '../../constants/Color';
import { useSelector } from 'react-redux';
import CompleteProfile from '../../containers/modal/CompleteProfile';
import { getUserProfile } from '../../features/auth/AuthSlice';
import { customFontSize, customFonts } from '../../constants/theme';
import { useEffect } from 'react';
import Carousel from '../../components/Carousel';

const Home = ({ navigation }) => {
  const { userProfile } = useSelector(state => state.auth);

  return (
    <>
      <CompleteProfile />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <AppBar isHome={true}  />
       

        {/* Main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          <Carousel />
          {/* Categories */}
          <Categories />
          <ActivelySeekingForJobCard />
          {/* Featured */}
          <View style={styles.featuredContainer}>
            <Featured navigation={navigation} />
          </View>
          <Training navigation={navigation} />

          <TotalJobs navigation={navigation} />

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
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontPoppins,
  },
  subHeading: {
    fontSize: customFontSize.font18,
    color: '#ffffff',
    fontFamily: customFonts.fontPoppins,
  },
  header: {
    height: 130,
    backgroundColor: customThemeColor.darkRed,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  scrollViewContent: {
    paddingBottom: 0,
    zIndex: 0,
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  featuredContainer: {
    marginTop: 0,
  },
  totalJobs: {
    marginTop: 0,
  },
});

export default Home;
