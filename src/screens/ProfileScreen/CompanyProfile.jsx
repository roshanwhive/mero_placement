import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import companyLogo from '../../assets/companyLogo.png';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CompanyBackground from '../../containers/profile/CompanyBackground';
import CompanyPostedJob from '../../containers/profile/CompanyPostedJob';

const renderTabBar = props => (
  <TabBar
    {...props}
    inactiveColor={customTextColor.primary}
    activeColor={customTextColor.darkRed}
    indicatorStyle={{backgroundColor: customTextColor.darkRed}}
    style={{backgroundColor: customTextColor.white}}
  />
);

const CompanyProfile = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Background'},
    {key: 'second', title: 'Posted Job'},
  ]);
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.body}>
        <Image style={styles.avatar} source={companyLogo} />
        <View style={styles.bodyContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Company Name</Text>
            <Text style={styles.subtitle}>
              Description about the company lorem50{' '}
            </Text>
          </View>
          <View style={styles.status}>
            <View style={styles.cardStatus}>
              <Text style={styles.headingStatus}>Following</Text>
              <Text style={styles.subheadingStatus}>549</Text>
            </View>
            <View style={[styles.cardStatus, styles.borderHorizontal]}>
              <Text style={styles.headingStatus}>Followers</Text>
              <Text style={styles.subheadingStatus}>324k</Text>
            </View>
            <View style={styles.cardStatus}>
              <Text style={styles.headingStatus}>Posted Job</Text>
              <Text style={styles.subheadingStatus}>20</Text>
            </View>
          </View>
          <View style={styles.containerFollow}>
            <TouchableOpacity style={styles.buttonFollow}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Icon
                name="share-square"
                size={20}
                color={customTextColor.darkGreen}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: CompanyBackground,
          second: CompanyPostedJob,
        })}
        onIndexChange={setIndex}
        style={styles.containerTab}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: customThemeColor.darkRed,
    height: 200,
  },
  header: {
    height: 80,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    top: '-20%',
  },
  body: {
    backgroundColor: customThemeColor.white,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  bodyContent: {
    top: '-15%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: customTextColor.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: customTextColor.secondary,
  },
  //   -----------------------------Follow section-----------------------
  containerFollow: {
    top: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonFollow: {
    backgroundColor: customThemeColor.darkRed,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 15,
    width: '80%',
  },
  shareButton: {
    backgroundColor: customThemeColor.lightBG,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    paddingVertical: 13,

    borderRadius: 10,
  },
  followText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  //   -----------------------------------Status Section---------------------------------------
  status: {
    top: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: customThemeColor.lightBG,
    borderRadius: 20,
  },
  cardStatus: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderHorizontal: {
    borderRightColor: customThemeColor.white,
    borderLeftColor: customThemeColor.white,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  headingStatus: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: customTextColor.primary,
  },
  subheadingStatus: {
    fontSize: 15,
    color: customTextColor.primary,
  },
  containerTab: {},
});
export default CompanyProfile;
