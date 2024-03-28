import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RoundButtonComp from '../../components/RoundBtn';
import {Divider} from 'react-native-paper';

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
const CompareJobAndProfile = ({navigation}) => {
  const companyLogo = require('../../assets/companyLogo.png');

  return (
    <View style={styles.container}>
      <TableHeader navigation={navigation} />
      {/* <ScrollView horizontal={true} style={styles.bodyContent}>
        <View style={styles.profileColumn}>
          <View style={styles.profileHeader}>
            <Icon
              name="user-circle"
              size={20}
              color={customTextColor.primary}
            />
            <Text style={styles.headerText}>Your Profile</Text>
          </View>
          <View style={styles.profileBody}>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Image source={companyLogo} style={styles.logo} />
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.heading}>Roshan Nyaupane</Text>
                <View style={{marginTop: 10, display: 'flex', gap: 5}}>
                  <ProfileDetail icon="map-marker-alt" value="Baneshwor" />
                  <ProfileDetail icon="phone-alt" value="9840953995" />
                  <ProfileDetail
                    icon="mail-bulk"
                    value="roshannyaupane01@gmail.com"
                  />
                </View>
              </View>
            </View>
            <View style={[styles.row]}></View>
            <View style={[styles.row]}></View>
          </View>
        </View>
        <View style={styles.jobReqrementColumn}>
          <View style={styles.jobReqrementHeader}>
            <Icon name="outdent" size={20} color={customTextColor.primary} />
            <Text style={styles.headerText}>Job Requirements</Text>
          </View>
          <View style={styles.profileBody}>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Image source={companyLogo} style={styles.logo} />
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.heading}>Roshan Nyaupane</Text>
                <View style={{marginTop: 10, display: 'flex', gap: 5}}>
                  <ProfileDetail icon="map-marker-alt" value="Baneshwor" />
                  <ProfileDetail icon="phone-alt" value="9840953995" />
                  <ProfileDetail
                    icon="mail-bulk"
                    value="roshannyaupane01@gmail.com"
                  />
                </View>
              </View>
            </View>
            <View style={[styles.row]}></View>
            <View style={[styles.row]}></View>
          </View>
        </View>
      </ScrollView> */}

      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Image source={companyLogo} style={styles.logo}></Image>
            <Text style={{color: 'black'}}>Shruti Rajopadhyaya</Text>
            <Text style={{color: 'black'}}>9843559999</Text>
          </View>
          <View style={{flex: 1}}>
            <Image source={companyLogo} style={styles.logo}></Image>
            <Text style={{color: 'black'}}>Intern</Text>
            <Text style={{color: 'black'}}>Company Name</Text>
            <Text style={{color: 'black', marginBottom: 8}}>
              Apply Before: march 10, 2024
            </Text>
          </View>
        </View>

        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>Your Skills</Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>react native</Text>
              <Text style={[styles.label, styles.link]}>Redux</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>Required Skills</Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>react native</Text>
              <Text style={[styles.label, styles.link]}>Redux</Text>
            </View>
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>
              Your Education level
            </Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>Bachelor</Text>
              <Text style={[styles.label, styles.link]}>Master</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>
              Required Education level
            </Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>Bachelor</Text>
              <Text style={[styles.label, styles.link]}>Master</Text>
            </View>
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>Your Experience</Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>1 years</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>
              Required Experience
            </Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>Not Required</Text>
            </View>
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>
              Your Expected Salary
            </Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>Nrs. 20,000</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={{color: 'black', marginTop: 8}}>
              Required Expected Salary
            </Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>
                Nrs. 5,000 or above
              </Text>
            </View>
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            bottom: 0,
            left: 0,
          }}>
          <RoundButtonComp
            label={'Cancel'}
            border={true}
            widthBtn={150}
            marginleftBtn={10}
          />
          <RoundButtonComp
            label="Apply Now"
            widthBtn={150}
            marginleftBtn={10}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: customThemeColor.lightBG,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
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
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: customThemeColor.lighterBg,
  },
  logo: {
    width: 50,
    height: 50,
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
