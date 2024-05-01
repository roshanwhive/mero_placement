import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customTextColor, customThemeColor } from '../../constants/Color';
import { ActivityIndicator, Divider } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import AppBar from '../../components/custom_toolbar/AppBar';
import { customFontSize, customFonts } from '../../constants/theme';
import AvatarByName from '../../components/AvatarbyName';

const Row = ({ label, value }) => {
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
    fontSize: customFontSize.font12,
  },
  li: {
    color: customTextColor.secondary,
    fontSize: customFontSize.font12,
    textAlign: 'justify',
    marginHorizontal: 5,
  },
};

const JobDetail = ({ navigation }) => {
  const { singleJob, isLoading } = useSelector(state => state.job);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = (slug) => {
   slug = singleJob?.slug;
    navigation.navigate('CompareJobAndProfile', { slug });
    console.log("button", slug);
  };

  const handleShare = () => {
    // Handle job sharing
  };

  useEffect(() => {
    console.log("image", singleJob?.slug);
  }, []);

  return (
    <View style={styles.container}>
      <AppBar handleBack={handleBack} title={singleJob.position_name} />

      {/* Job Details */}
      {Object.keys(singleJob).length === 0 || isLoading === true ? (
        <ActivityIndicator
          animating={true}
          style={{ flex: 1 }}
          color={customTextColor.lightGreen}
        />

      ) : (
        <><ScrollView
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
                  <Text style={[styles.label1]}>
                    {singleJob.vacancy_level.name}
                  </Text>
                  <Text style={[styles.label1]}>
                    {singleJob.salary_type.salary_type}
                  </Text>
                </View>
              </View>
              <View style={styles.companyLogoContainer}>
                {singleJob?.get_company?.logo !== null ? (
                  <Image
                    source={{ uri: singleJob?.get_company?.logo }}
                    style={styles.companyLogo} />
                ) : (
                  <AvatarByName name={singleJob?.get_company?.employer_name} />
                )}
              </View>
            </View>
            <Divider />
            {/* <View style={styles.container1}>
              <View style={styles.cardSmall}>
                <Icon
                  name="eye-slash"
                  size={15}
                  color={customTextColor.darkGreen} />
                <Text style={styles.title}>Views</Text>
                <Text style={styles.subtitle}>{singleJob.vacancy_views}</Text>
              </View>
              <View style={styles.cardSmall}>
                <Icon
                  name="users-cog"
                  size={15}
                  color={customTextColor.darkGreen} />
                <Text style={styles.title}>Applicants</Text>
                <Text style={styles.subtitle}>0</Text>
              </View>
              <View style={styles.cardSmall}>
                <Icon
                  name="thumbs-up"
                  size={15}
                  color={customTextColor.darkGreen} />
                <Text style={styles.title}>Likes</Text>
                <Text style={styles.subtitle}>{singleJob.total_likes}</Text>
              </View>
            </View> */}
            <Text style={styles.basicjob}>Basic Job Information</Text>
            <View>
              <Row label="No. of Vacancy" value={singleJob?.no_of_position} />
              <Row label="Category" value={singleJob?.category?.name} />
              {/* <Row label="Location" value={singleJob?.address?.address} /> */}
              <Row label="Working hour" value={singleJob?.work_hour} />
              {/* <Row label="Position" value={singleJob?.vacancy_level?.name} /> */}
              <Row label="Salary" value={singleJob?.salary} />
              <Row label="Gender" value={singleJob?.gender?.name} />
              <Row label="Expiry Date" value={singleJob?.deadline} />
            </View>
          </View>

          <View style={styles.additionalSections}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>About the company:</Text>
              <RenderHtml
                contentWidth={100}
                ignoredDomTags={['quillbot-extension-portal']}
                tagsStyles={tagsStyles}
                source={{
                  html: singleJob.get_company?.description,
                }} />

              <Text style={styles.sectionTitle}>Responsibilities:</Text>
              <View style={{ marginBottom: 4, paddingLeft: 5 }}>
                <RenderHtml
                  contentWidth={100}
                  ignoredDomTags={['quillbot-extension-portal']}
                  tagsStyles={tagsStyles}
                  source={{
                    html: singleJob?.job_description,
                  }} />
              </View>

              <Text style={styles.sectionTitle}>Skills:</Text>
              <View style={{ marginBottom: 4, paddingLeft: 5 }}>
                <RenderHtml
                  contentWidth={100}
                  ignoredDomTags={['quillbot-extension-portal']}
                  tagsStyles={tagsStyles}
                  source={{
                    html: singleJob?.job_specification,
                  }} />
                {/* </Text> */}
              </View>
            </View>
          </View>
        </ScrollView>
          <View style={styles.jobActions}>
            <TouchableOpacity onPress={handleApply} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Apply Job</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="share" size={25} color={customTextColor.primary} />
            </View>
          </View></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  jobDetails: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  cardHeader: {
    backgroundColor: customThemeColor.white,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyName: {
    color: customTextColor.primary,
    fontSize: customFontSize.font18,
    fontFamily: customFonts.fontPrompt,
  },
  jobTitle: {
    fontSize: customFontSize.font20,
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
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
    paddingHorizontal: 10,
    borderRadius: 20,
    fontFamily: customFonts.fontPrompt,
  },
  label1: {
    backgroundColor: customThemeColor.lightBG,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: customTextColor.primary,
    fontFamily: customFonts.fontPrompt,
    fontSize: customFontSize.font12,
  },
  link: {
    color: customTextColor.lightGreen,
    fontSize: customFontSize.font12,
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
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontPoppins,
    marginTop: 5,
    color: customTextColor.primary,
  },
  value: {
    color: customTextColor.primary,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
  },
  listText: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontPoppins,
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
    fontSize: customFontSize.font14,
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    marginBottom: 5,
    marginTop: 10,
  },
  sectionText: {
    fontSize: customFontSize.font14,
    marginBottom: 10,
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
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
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPrompt,
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
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font13,
  },
  container2: {
    marginTop: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontRoboto,
    color: customTextColor.primary,
    paddingVertical: 10,
    marginRight: 6,
  },
  subheading: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontRoboto,
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
  basicjob: {
    fontSize: customFontSize.font16,
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    marginTop: 5,
  },
});

export default JobDetail;
