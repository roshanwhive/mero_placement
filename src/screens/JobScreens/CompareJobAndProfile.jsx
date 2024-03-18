import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      <ScrollView horizontal={true} style={styles.bodyContent}>
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
      </ScrollView>
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
    marginRight: 10,
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
});
export default CompareJobAndProfile;
