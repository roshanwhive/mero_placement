import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import AppBar from '../../components/custom_toolbar/AppBar';
import { customTextColor, customThemeColor } from '../../constants/Color';
import RoundButtonComp from '../../components/RoundBtn';
import { Divider } from 'react-native-paper';
import { customFonts } from '../../constants/theme';


const Training = () => {

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    // Handle job application
  };

  const handleShare = () => {
    // Handle job sharing
  };

  return (
    <>
      <AppBar title={"Training"} />
      <View style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </View> */}

        {/* Job Details */}
        <ScrollView
          style={styles.jobDetails}
          horizontal={false}
          indicatorStyle="white"
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardHeader}>
            <View style={styles.companyInfo}>
              <View>
                <Text style={styles.companyName}>Course</Text>
                <Divider />

                <Text style={styles.jobTitle}>React Native</Text>
                <Text style={styles.jobTitle}>Redux Training</Text>
                <View style={styles.flexCard}>
                  <Text style={[styles.label, styles.link]}>React native</Text>
                  <Text style={[styles.label, styles.link]}>Redux</Text>
                </View>
              </View>
              <View style={styles.companyLogoContainer}>
                <Image
                  source={require('../../assets/training/react-training.png')}
                  style={styles.companyLogo} />
              </View>
            </View>
          </View>

          {/* Additional Sections */}
          <View style={styles.additionalSections}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Course Overview</Text>
              <Text style={styles.sectionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod mattis velit, ac fringilla nunc tincidunt in. Mauris in
                augue vel sapien hendrerit tincidunt.
              </Text>
            </View>

            <View style={styles.card2}>
              <Text style={styles.sectionTitle}>Course Syllabus</Text>
              <View style={{ marginBottom: 4, paddingLeft: 5 }}>
                <Text style={styles.listText}>
                  {`\u25CF`} Introduction{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Environment Setup{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Overview of react native{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} React components{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} State Management{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Async Programming{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Networking{' '}
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Course Benifit</Text>
              <Text style={styles.sectionText}>This course offers a multitude of benefits to anyone aspiring to excel in apps development career. </Text>
              <View style={{ paddingLeft: 5 }}>
                <Text style={styles.listText}>
                  {`\u25CF`} Introduction{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Environment Setup{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Overview of react native{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} React components{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} State Management{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Async Programming{' '}
                </Text>
                <Text style={styles.listText}>
                  {`\u25CF`} Networking{' '}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Divider />

        {/* Job Actions */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 5,
          bottom: 0,
          left: 0
        }}>
          <RoundButtonComp label="Send Enquiry" widthBtn={150} />
          <RoundButtonComp label={"Get Admission"}
            border={true}
            widthBtn={150}
          />
        </View>
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  header: {
    padding: 5,
  },
  jobDetails: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardHeader: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
    borderColor: '#4B0082',
    borderRadius: 15
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5,
  },
  companyName: {
    color: customTextColor.secondary,
    fontSize: 50,
    fontFamily: customFonts.fontPoppins
  },
  jobTitle: {
    fontSize: 18,
    color: customTextColor.primary,
    fontFamily: 'Roboto-Italic',
  },
  flexCard: {
    display: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    backgroundColor: customThemeColor.lightestGreen,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  link: {
    color: customTextColor.lightGreen,
    fontSize: 16,
  },
  companyLogoContainer: {
    alignItems: 'flex-end',
  },
  companyLogo: {
    width: 400,
    height: 40,
    borderRadius: 400 / 2,
    resizeMode: 'contain',
    padding: 5
  },
  basicInfo: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: customTextColor.primary,
  },
  value: {
    color: customTextColor.primary,
    fontSize: 18,
    fontWeight: '500',
  },
  listText: {
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 4,
    color: customTextColor.primary,
  },
  card: {
    backgroundColor: customThemeColor.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderColor: '#FF4500',
    borderRadius: 15
  },
  card2: {
    backgroundColor: customThemeColor.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderColor: '#4B0082',
    borderRadius: 15
  },
  additionalSections: {},
  sectionTitle: {
    fontSize: 18,
    color: customTextColor.primary,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 10,
    color: customTextColor.primary,
    fontWeight: '400',
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
  },
  actionButton: {
    backgroundColor: customThemeColor.darkRed,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 300,
    borderRadius: 5,
  },
  actionButtonText: {
    color: customTextColor.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardSmall: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: customThemeColor.lightBG,
    paddingVertical: 10,
  },
  cardContainer1: {
    width: '30%',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    color: customTextColor.primary,
    textAlign: 'center',
  },
  container2: {
    marginTop: 5,
  },
  divider: {
    borderBottomColor: customThemeColor.lightBG,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: customTextColor.primary,
    paddingVertical: 10,
    marginRight: 6,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'normal',
    color: customTextColor.secondary,
  },
  leftGrid: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightText: {
    width: '55%',
  },
});

export default Training;
