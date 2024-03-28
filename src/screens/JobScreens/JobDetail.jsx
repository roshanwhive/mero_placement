import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {ActivityIndicator} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import AppBar from '../../components/custom_toolbar/AppBar';

const Row = ({label, value}) => {
  return (
    <View style={styles.divider}>
      <View style={[styles.leftGrid]}>
        <Text style={[styles.heading]}>{label}</Text>
        <Text style={[styles.heading]}>:</Text>
      </View>

      <Text style={[styles.subheading, styles.rightText]}>{value}</Text>
    </View>
  );
};

const tagsStyles = {
  p: {
    color: customTextColor.secondary,
    textAlign: 'justify',
    fontSize: 14,
  },
  li: {
    color: customTextColor.secondary,
    fontSize: 14,
    textAlign: 'justify',
    marginHorizontal: 5,
  },
};

const JobDetail = ({navigation}) => {
  const {singleJob, isLoading} = useSelector(state => state.job);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    navigation.navigate('CompareJobAndProfile');
  };

  const handleShare = () => {
    // Handle job sharing
  };

  return (
    <View style={styles.container}>
      <AppBar handleBack={handleBack} title="Go Back" />

      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View> */}

      {/* Job Details */}
      {Object.keys(singleJob).length === 0 || isLoading === true ? (
        <ActivityIndicator
          animating={true}
          style={{flex: 1}}
          color={customTextColor.lightGreen}
        />
      ) : (
        <ScrollView
          style={styles.jobDetails}
          horizontal={false}
          indicatorStyle="white"
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardHeader}>
            <View style={styles.companyInfo}>
              <View>
                <Text style={styles.companyName}>
                  {singleJob.get_company.employer_name}
                </Text>
                <Text style={styles.jobTitle}>{singleJob.position_name}</Text>
                <View style={styles.flexCard}>
                  <Text style={[styles.label, styles.link]}>
                    {singleJob.employment_type.employment_type}
                  </Text>
                </View>
              </View>
              <View style={styles.companyLogoContainer}>
                <Image
                  source={{uri: singleJob.get_company.logo}}
                  style={styles.companyLogo}
                />
              </View>
            </View>
            <View style={styles.container1}>
              <View style={styles.cardSmall}>
                <Icon
                  name="eye-slash"
                  size={25}
                  color={customTextColor.darkGreen}
                />
                <Text style={styles.title}>Views</Text>
                <Text style={styles.subtitle}>{singleJob.vacancy_views}</Text>
              </View>
              <View style={styles.cardSmall}>
                <Icon
                  name="users-cog"
                  size={25}
                  color={customTextColor.darkGreen}
                />
                <Text style={styles.title}>Applicants</Text>
                <Text style={styles.subtitle}>0</Text>
              </View>
              <View style={styles.cardSmall}>
                <Icon
                  name="thumbs-up"
                  size={25}
                  color={customTextColor.darkGreen}
                />
                <Text style={styles.title}>Likes</Text>
                <Text style={styles.subtitle}>{singleJob.total_likes}</Text>
              </View>
            </View>
            <View style={styles.container2}>
              <Row label="No. of Vacancy" value={singleJob?.no_of_position} />
              <Row label="Category" value={singleJob?.category?.name} />
              <Row label="Location" value={singleJob?.address?.address} />
              <Row label="Working hour" value={singleJob?.work_hour} />
              <Row label="Position" value={singleJob?.vacancy_level?.name} />
              <Row label="Salary" value={singleJob?.salary} />
              <Row label="Gender" value={singleJob?.gender?.name} />
              <Row label="Expiry Date" value={singleJob?.deadline} />
            </View>
          </View>

          <View style={styles.additionalSections}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>About the company:</Text>
              <RenderHtml
                contentWidth={100}
                ignoredDomTags={['quillbot-extension-portal']}
                tagsStyles={tagsStyles}
                source={{
                  html: singleJob.get_company?.description,
                }}
              />

              <Text style={styles.sectionTitle}>Responsibilities:</Text>
              <View style={{marginBottom: 4, paddingLeft: 5}}>
                <RenderHtml
                  contentWidth={100}
                  ignoredDomTags={['quillbot-extension-portal']}
                  tagsStyles={tagsStyles}
                  source={{
                    html: singleJob?.job_description,
                  }}
                />
              </View>

              <Text style={styles.sectionTitle}>Skills:</Text>
              <View style={{marginBottom: 4, paddingLeft: 5}}>
                <RenderHtml
                  contentWidth={100}
                  ignoredDomTags={['quillbot-extension-portal']}
                  tagsStyles={tagsStyles}
                  source={{
                    html: singleJob?.job_specification,
                  }}
                />
                {/* </Text> */}
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Job Actions */}
      <View style={styles.jobActions}>
        {/* <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleApply} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Apply Job</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="share" size={30} color={customTextColor.primary} />
        </View>
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
    marginTop: 5,
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
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
    paddinghorizontal: 10,
  },
  saveButton: {
    backgroundColor: customThemeColor.darkRed,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 'auto',
    borderRadius: 5,
  },
  actionButton: {
    backgroundColor: customThemeColor.darkRed,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 250,
    borderRadius: 5,
  },
  actionButtonText: {
    color: customTextColor.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {},
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
