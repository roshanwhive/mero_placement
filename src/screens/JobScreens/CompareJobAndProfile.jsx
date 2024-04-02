import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { customTextColor, customThemeColor } from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RoundButtonComp from '../../components/RoundBtn';
import { Divider } from 'react-native-paper';
import AppBar from '../../components/custom_toolbar/AppBar';

const TableHeader = ({ navigation }) => {
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
const ProfileDetail = ({ icon, value }) => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon name={icon} size={13} color={customTextColor.primary} />
      <Text style={[styles.text, { marginLeft: 8 }]}>{value}</Text>
    </View>
  );
};
const CompareJobAndProfile = ({ navigation }) => {
  const companyLogo = require('../../assets/companyLogo.png');

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <><AppBar handleBack={handleBack} title={'Profile Review'} />
      <View style={styles.container}>

        <TableHeader navigation={navigation} />

        <SafeAreaView style={styles.card}>

          <ScrollView>
            <View>
              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Image source={companyLogo} style={styles.logo}></Image>
                  <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>Shruti Rajopadhyaya</Text>
                  <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>9843559999</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Image source={companyLogo} style={styles.logo}></Image>
                  <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>Intern</Text>
                  <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>Company Name</Text>
                  <Text style={{ color: 'black', marginBottom: 8, fontFamily: 'Roboto-Italic' }}>Apply Before: march 10, 2024</Text>
                </View>
              </View>

              <Divider />

              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Skills</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>react native redux networking</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Skills</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>Telecommunication</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
              </View>
              <Divider />
              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>react native redux networking</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>Telecommunication</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
              </View>
              <Divider />

              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>react native redux networking</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>Telecommunication</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
              </View>
              <Divider />

              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Experience</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>1 or 2</Text>
                    <Text style={[styles.label, styles.link]}>1 year</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Experience</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>1 years</Text>
                    <Text style={[styles.label, styles.link]}>Not required</Text>
                  </View>
                </View>
              </View>
              <Divider />

              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Expected Salary</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>NRs. 20,000</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Expected Salary</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>NRs. 5,000 or above</Text>
                  </View>
                </View>
              </View>
              <Divider />

              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>react native redux networking</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>Telecommunication</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
              </View>
              <Divider />
              <View style={styles.row}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Your Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>react native redux networking</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: 'black', marginTop: 8 }}>Required Education level</Text>
                  <View style={styles.flexCard}>
                    <Text style={[styles.label, styles.link]}>Telecommunication</Text>
                    <Text style={[styles.label, styles.link]}>Redux</Text>
                  </View>
                </View>
              </View>
              <Divider />
            </View>
          </ScrollView>

        </SafeAreaView>
        <View style={{
          paddingHorizontal: 15,
          paddingVertical: 0,
          flexDirection: 'row',
          marginBottom: 10,
        }}>

          <View style={styles.row}>
            <RoundButtonComp label={"Cancel"}
              border={true}
              widthBtn={150}
              marginleftBtn={10} />
            <RoundButtonComp label="Apply Now" widthBtn={150} marginleftBtn={10} />

          </View>
        </View>

      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  card: {
    backgroundColor: customThemeColor.white,
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
    shadowOffset: { width: 0, height: 7 },
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
    fontSize: 20,
    fontWeight: '600',
    color: customTextColor.lightGreen,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
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
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
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
    shadowOffset: { width: 0, height: 7 },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: customTextColor.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
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
