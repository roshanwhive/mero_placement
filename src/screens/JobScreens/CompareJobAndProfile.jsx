import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RoundButtonComp from '../../components/RoundBtn';
import {Divider} from 'react-native-paper';
import AppBar from '../../components/custom_toolbar/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {getapplyJobData} from '../../features/applyJob/applyJobSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {customFontSize, customFonts} from '../../constants/theme';
import ResumeModal from '../HomeScreen/ResumeModal';
import AddPref from '../BottomNavigationScreen/matchedJob/AddPref';

const TableHeader = ({navigation}) => {
  return (
    <>
      <View style={cardStyle.card}>
        <View style={cardStyle.textContainer}>
          <Text style={cardStyle.title}>Review Your Profile</Text>
          <Text style={cardStyle.subtitle}>
            See how your skills match the job requirements
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" style={cardStyle.icon} size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const ProfileDetail = ({icon, value}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
      <Icon name={icon} size={13} color={customTextColor.primary} />
      <Text style={[styles.text, {marginLeft: 8}]}>{value}</Text>
    </View>
  );
};
const CompareJobAndProfile = slug => {
  const {isAuthenticated} = useSelector(state => state.login);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const companyLogo = require('../../assets/companyLogo.png');
  slug = route.params?.slug;
  const {jobApplyData, isLoading, lead, vacancy, message} = useSelector(
    state => state.jobApply,
  );
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.navigate('HomeScreen');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getapplyJobData(slug));
    }
  }, [dispatch]);

  return (
    <>
      <AppBar handleBack={handleBack} title={'Profile Review'} />
      {!!!isAuthenticated ? (
        <AddPref
          title="Can't apply to this job"
          subtitle="Login to apply job"
          handleBtn={handleLogin}
        />
      ) : (
        <>
          <View style={styles.container}>
            {/* employee review */}
            {Object.keys(jobApplyData).length === 0 && isLoading === true ? (
              <ActivityIndicator
                animating={true}
                style={{flex: 1}}
                color={customTextColor.lightGreen}
              />
            ) : (
              <>
                <TableHeader navigation={navigation} />
                <SafeAreaView style={styles.card}>
                  <ScrollView>
                    <View>
                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Image
                            source={companyLogo}
                            style={styles.logo}></Image>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: customFonts.fontRobotoBold,
                              marginTop: 8,
                            }}>
                            {lead.lead_name}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: customFonts.fontRobotoBold,
                            }}>
                            {lead.primary_contact}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: customFonts.fontRoboto,
                            }}>
                            {lead.email}
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Image
                            source={companyLogo}
                            style={styles.logo}></Image>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: customFonts.fontRobotoBold,
                              marginTop: 8,
                            }}>
                            {vacancy.position_name}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: customFonts.fontRobotoBold,
                            }}>
                            {vacancy?.get_company?.employer_name}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              marginBottom: 8,
                              fontFamily: 'Roboto-Italic',
                            }}>
                            Apply before: {vacancy?.deadline}
                          </Text>
                        </View>
                      </View>

                      <Divider />

                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Your Category
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {lead?.preference?.job_category?.name}
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Required Category
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {vacancy?.category?.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Divider />
                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>Your Skills</Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {lead?.preference?.get_skill?.skill}
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Required Skills
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {vacancy?.skills}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Divider />

                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Your Education level
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              Redux
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Required Education level
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {vacancy?.education?.deg_type_name}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Divider />

                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Your Experience
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {lead?.level?.name}
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Required Experience
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {vacancy?.vacancy_level?.name}
                            </Text>
                            <Text style={[styles.label, styles.link]}>
                              Not required
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Divider />

                      <View style={styles.row}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Your Expected Salary
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              {lead?.preference?.expected_salary}
                            </Text>
                          </View>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.headingProfile}>
                            Required Expected Salary
                          </Text>
                          <View style={styles.flexCard}>
                            <Text style={[styles.label, styles.link]}>
                              NRs. {vacancy?.salary}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </SafeAreaView>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    justifyContent: 'space-between',
                  }}>
                  <RoundButtonComp
                    label={'Cancel'}
                    border={true}
                    widthBtn={170}
                    // onPressBtn={() => setVisible(false)} />
                    onPressBtn={handleBack}
                  />

                  <RoundButtonComp
                    label="Apply Now"
                    widthBtn={170}
                    onPressBtn={showModal}
                  />
                </View>
              </>
            )}
          </View>
          {visible && <ResumeModal hideModal={hideModal} slug />}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.5)',
  },
  body: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  bodyContent: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: customThemeColor.white,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
  },
  profileColumn: {
    width: 300,
    borderRightWidth: 1,
    borderRightColor: customThemeColor.lighterBg,
  },
  profileHeader: {
    backgroundColor: customThemeColor.lightestGreen,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'start',
    paddingLeft: 30,
  },
  profileBody: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: -5,
    flexWrap: 'wrap',
  },
  column: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginHorizontal: -5,
    flexWrap: 'wrap',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 5,
    marginLeft: 5,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  heading: {
    fontSize: customFontSize.font20,
    color: customTextColor.lightGreen,
    fontFamily: customFonts.fontPoppins,
  },
  text: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontPoppins,
    color: customTextColor.primary,
  },

  jobReqrementColumn: {
    width: 300,
  },
  jobReqrementHeader: {
    backgroundColor: customThemeColor.lightestGreen,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingLeft: 30,
  },
  flexCard: {
    display: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 8,
  },
  label: {
    backgroundColor: customThemeColor.lightestGreen,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  link: {
    color: customTextColor.lightGreen,
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontRoboto,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headingProfile: {
    color: 'black',
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font14,
    marginTop: 8,
  },
});

const cardStyle = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customThemeColor.white,
    padding: 20,
    marginVertical: 15,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  icon: {
    marginRight: 10,
    color: customTextColor.primary,
    minWidth: 40,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: customFontSize.font18,
    fontFamily: customFonts.fontPoppins,
    color: customTextColor.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: customFontSize.font16,
    color: customTextColor.secondary,
  },
  logo: {
    width: 90,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 5,
  },
});
export default CompareJobAndProfile;
