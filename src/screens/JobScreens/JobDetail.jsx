import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {Card} from 'react-native-paper';

const JobDetail = ({navigation}) => {
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Job Details */}
      <ScrollView
        style={styles.jobDetails}
        horizontal={false}
        indicatorStyle="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardHeader}>
          <View style={styles.companyInfo}>
            <View>
              <Text style={styles.companyName}>Walkers Hive</Text>
              <Text style={styles.jobTitle}>Laravel Developer</Text>
              <View style={styles.flexCard}>
                <Text style={[styles.label, styles.link]}>Fulltime</Text>
                <Text style={[styles.label, styles.link]}>Remote</Text>
              </View>
            </View>
            <View style={styles.companyLogoContainer}>
              <Image
                source={require('../../assets/companyLogo.png')}
                style={styles.companyLogo}
              />
            </View>
          </View>
          <View style={styles.container1}>
            <View style={styles.cardSmall}>
              <Icon
                name="dollar-sign"
                size={25}
                color={customTextColor.darkGreen}
              />
              <Text style={styles.title}>Salary</Text>
              <Text style={styles.subtitle}>130k</Text>
            </View>
            <View style={styles.cardSmall}>
              <Icon
                name="map-marker-alt"
                size={25}
                color={customTextColor.darkGreen}
              />
              <Text style={styles.title}>Location</Text>
              <Text style={styles.subtitle}>Chabhil</Text>
            </View>
            <View style={styles.cardSmall}>
              <Icon name="users" size={25} color={customTextColor.darkGreen} />
              <Text style={styles.title}>Applicants</Text>
              <Text style={styles.subtitle}> 12</Text>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.divider}>
              <View style={[styles.leftGrid]}>
                <Text style={[styles.heading]}>No. of Vacancy</Text>
                <Text style={[styles.heading]}>:</Text>
              </View>

              <Text style={[styles.subheading, styles.rightText]}>
                Subheading
              </Text>
            </View>
            <View style={styles.divider}>
              <View style={[styles.leftGrid]}>
                <Text style={[styles.heading]}>Category</Text>
                <Text style={[styles.heading]}>:</Text>
              </View>

              <Text style={[styles.subheading, styles.rightText]}>
                Education
              </Text>
            </View>
            <View style={styles.divider}>
              <View style={[styles.leftGrid]}>
                <Text style={[styles.heading]}>Expiry Date</Text>
                <Text style={[styles.heading]}>:</Text>
              </View>

              <Text style={[styles.subheading, styles.rightText]}>
                3 march, 2024
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Sections */}
        <View style={styles.additionalSections}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About the company:</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod mattis velit, ac fringilla nunc tincidunt in. Mauris in
              augue vel sapien hendrerit tincidunt.
            </Text>

            <Text style={styles.sectionTitle}>Responsibilities:</Text>
            <View style={{marginBottom: 4, paddingLeft: 5}}>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
              <Text style={styles.listText}>
                {`\u25CF`} Hello Lorem ipsum dolor sit amet.{' '}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Skills:</Text>
            <View style={{marginBottom: 4, paddingLeft: 5}}>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
              <Text style={styles.listText}>{`\u25CF`} Hello</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Job Actions */}
      <View style={styles.jobActions}>
        <TouchableOpacity onPress={handleApply} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Apply Job</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  header: {
    padding: 10,
  },
  jobDetails: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  cardHeader: {
    backgroundColor: customThemeColor.white,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyName: {
    color: customTextColor.secondary,
    fontSize: 14,
  },
  jobTitle: {
    fontSize: 25,
    color: customTextColor.primary,
    fontWeight: '600',
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
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'contain',
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
    marginBottom: 20,
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
    marginTop: 10,
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

export default JobDetail;
