import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../components/custom_toolbar/AppBar';
import {customFontSize, customFonts} from '../../constants/theme';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';

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

const EducationRow = ({items}) => {
  return (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionItemTitle}>
        {items?.university_board_name} ( {items?.passed_status} )
      </Text>
      <Text style={styles.sectionItemHeading}>{items?.institute_name}</Text>
      <Text style={styles.sectionItemDesc}>{items?.deg_type_name}</Text>
    </View>
  );
};

const PreferenceRow = ({items}) => {
  return (
    <View style={styles.sectionItem}>
      <Row label="Skills" value={items?.get_skill?.skill} />
      <Row label="Job Title" value={items?.title_name} />
      <Row label="Preferred Job Category" value={items?.job_category?.name} />
      <Row label="Preferred Job Level" value={items?.level?.name} />
      <Row label="Expected Salary" value={items?.expected_salary} />
      <Row
        label="Availability"
        value={items?.availible_type?.employment_type}
      />
      <Divider />
    </View>
  );
};

const ExperienceRow = ({items}) => {
  return (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionItemTitle}>{items?.org_name}</Text>
      <Text style={styles.sectionItemHeading}>
        {items?.position} ({items?.start_date}-{items?.end_date})
      </Text>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text style={styles.sectionItemTitle}>{items?.job_level?.name}</Text>
        <Badge style={styles.categoryBadge}>{items?.job_category?.name}</Badge>
      </View>
      <Text style={styles.sectionItemDesc}>
        {items?.duties_responsibilities}
      </Text>
    </View>
  );
};

const ProfilePreview = () => {
  const navigation = useNavigation();
  const [defaultPreferences, setDefaultPreference] = useState({});
  const {userProfile} = useSelector(state => state.userProfile);

  useEffect(() => {
    setDefaultPreference(
      userProfile?.preference?.filter(
        preference => preference?.is_default === '1',
      ),
    );
  }, [userProfile]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <AppBar handleBack={handleBack} title="Profile" />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.photo}
            source={{
              uri: userProfile?.profile?.featured_image,
            }}
          />
          <View>
            <Text style={styles.name}>{userProfile?.profile?.lead_name}</Text>
            <Text style={styles.title}>{userProfile?.profile?.email}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.sectionContent}>
              <Row
                label="Contact"
                value={userProfile?.profile?.primary_contact}
              />
              <Row label="Email" value={userProfile?.profile?.email} />
              <Row label="DOB" value={userProfile?.profile?.dob} />
              <Row label="Gender" value={userProfile?.profile?.gender?.name} />
            </View>
          </View>
          <Divider />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Preference</Text>
            <View style={styles.sectionContent}>
              {userProfile?.preference?.map((item, index) => {
                return <PreferenceRow key={index} items={item} />;
              })}
            </View>
          </View>
          <Divider />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.sectionContent}>
              {userProfile?.experience?.map((item, index) => {
                return <ExperienceRow key={index} items={item} />;
              })}
            </View>
          </View>

          <Divider />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionContent}>
              {userProfile?.education?.map((item, index) => {
                return <EducationRow key={index} items={item} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfilePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: customTextColor.white,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    marginBottom: 16,
  },
  photo: {
    width: 90,
    height: 90,
    marginRight: 20,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    color: customTextColor.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    color: customTextColor.primary,
  },
  body: {
    marginBottom: 50,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: customTextColor.primary,
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionItem: {
    marginVertical: 15,
    borderLeftWidth: 1,
    borderLeftColor: customThemeColor.lighterBg,
    marginLeft: 5,
    paddingLeft: 15,
    color: customTextColor.primary,
  },
  sectionItemTitle: {
    fontSize: customFontSize.font13,
    color: customTextColor.primary,
  },
  sectionItemHeading: {
    fontSize: customFontSize.font16,
    fontWeight: '600',
    color: customTextColor.primary,
  },
  sectionItemDesc: {
    marginTop: 3,
    fontSize: 14,
    color: customTextColor.primary,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    backgroundColor: customThemeColor.lighterBg,
    color: customTextColor.primary,
  },

  //   -------Row---------
  divider: {
    borderBottomColor: customThemeColor.lightBG,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  heading: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontBevietnamMedium,
    color: customTextColor.primary,
    paddingVertical: 10,
    marginRight: 6,
  },
  subheading: {
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontPoppins,
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
    marginTop: 7,
  },
});
