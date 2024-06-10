import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AppBar from '../../components/custom_toolbar/AppBar';
import {customTextColor, customThemeColor} from '../../constants/Color';
import RoundButtonComp from '../../components/RoundBtn';
import {Divider} from 'react-native-paper';
import {customFontSize, customFonts} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';

const Training = () => {
  const navigation = useNavigation();
  const {singleTraining, isLoading} = useSelector(
    state => state.singleTraining,
  );

  //  console.log('single', singleTraining);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = heading_id => {
    heading_id = singleTraining?.heading_id;
    navigation.navigate('TrainingInquiry', {heading_id});
    console.log('button', heading_id);
  };

  const handleShare = () => {
    // Handle job sharing
  };

  const tagsStyles = {
    p: {
      color: customTextColor.secondary,
      textAlign: 'justify',
      fontSize: customFontSize.font12,
      fontFamily: customFonts.fontPoppins,
    },
    li: {
      color: customTextColor.secondary,
      fontSize: customFontSize.font12,
      textAlign: 'justify',
      marginHorizontal: 5,
      fontFamily: customFonts.fontPoppins,
    },
  };

  return (
    <>
      <AppBar title={'Training'} handleBack={handleBack} />
      <View style={styles.container}>
        {/* Training Details */}
        {Object.keys(singleTraining).length === 0 || isLoading === true ? (
          <ActivityIndicator
            animating={true}
            style={[styles.body, {flex: 1}]}
            color={customTextColor.lightGreen}
          />
        ) : (
          <>
            <ScrollView
              style={styles.jobDetails}
              horizontal={false}
              indicatorStyle="white"
              showsVerticalScrollIndicator={false}>
              <View style={styles.cardHeader}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}>
                  <View style={{marginRight: 15}}>
                    <Image
                      source={{uri: singleTraining.image}}
                      style={{
                        height: 150,
                        width: 100,
                        borderRadius: 8,
                        resizeMode: 'cover',
                      }}
                    />
                    {/* <Image
                      source={require('../../assets/training/react-training.png')}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 8,
                      }}
                    /> */}
                  </View>

                  <View style={{flex: 1}}>
                    <Text numberOfLines={2} style={styles.companyName}>
                      {singleTraining.heading_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Icon
                        name="calendar"
                        size={10}
                        color={customTextColor.secondary}
                        style={styles.icon}
                      />
                      <Text numberOfLines={1} style={styles.jobTitle}>
                        {'  '}
                        {singleTraining.created_date}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text style={styles.title}>Price: </Text>
                      <Text numberOfLines={1} style={styles.jobTitle}>
                        {singleTraining.price}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text style={styles.title}>Credit hours: </Text>
                      <Text numberOfLines={1} style={styles.jobTitle}>
                        {singleTraining.credit_hours}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.additionalSections}>
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <RenderHTML
                    contentWidth={100}
                    ignoredDomTags={['quillbot-extension-portal']}
                    tagsStyles={tagsStyles}
                    source={{
                      html: singleTraining.description,
                    }}
                  />
                </View>
              </View>
              <View style={styles.additionalSections}>
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Features</Text>
                  <RenderHTML
                    contentWidth={100}
                    ignoredDomTags={['quillbot-extension-portal']}
                    tagsStyles={tagsStyles}
                    source={{
                      html: singleTraining.features,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            <Divider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 5,
                paddingBottom: 10,
                bottom: 0,
                left: 0,
              }}>
              <RoundButtonComp label="Send Enquiry" onPressBtn={handleApply} />
            </View>
          </>
        )}
      </View>
    </>
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
    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexWrap: 'wrap',
    borderRadius: 15,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5,
  },
  companyName: {
    color: customTextColor.primary,
    fontSize: customFontSize.font18,
    fontFamily: customFonts.fontBold,
  },
  jobTitle: {
    fontSize: customFontSize.font14,
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
    padding: 5,
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
    color: customTextColor.secondary,
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

    borderRadius: 15,
  },
  card2: {
    backgroundColor: customThemeColor.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,

    borderRadius: 15,
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
  icon: {
    marginTop: 3,
    fontWeight: '300',
  },
});

export default Training;
