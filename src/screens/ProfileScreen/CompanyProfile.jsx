import React from 'react';
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
const CompanyProfile = ({navigation}) => {
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
            <Text style={styles.subtitle}>Description about the company</Text>
          </View>
          <View style={styles.containerFollow}>
            <TouchableOpacity style={styles.buttonFollow}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.shareButton}>
              <Icon
                name="share-square"
                size={30}
                color={customTextColor.darkGreen}
              />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.shareButton}>
              <Icon
                name="thumbs-up"
                size={30}
                color={customTextColor.darkGreen}
              />
            </TouchableOpacity>
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: customThemeColor.darkRed,
  },
  header: {
    height: 150,
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
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
  },
  bodyContent: {},
  card: {
    top: '-25%',
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
    fontWeight: '500',
    color: customTextColor.primary,
  },
  //   -----------------------------Follow section-----------------------
  containerFollow: {
    top: '-5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonFollow: {
    backgroundColor: customThemeColor.darkRed,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  cardStatus: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  borderHorizontal: {
    borderRightColor: customThemeColor.darkGreen,
    borderLeftColor: customThemeColor.darkGreen,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  headingStatus: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 5,
    color: customTextColor.primary,
  },
  subheadingStatus: {
    fontSize: 18,
    color: customTextColor.secondary,
  },
});
export default CompanyProfile;
