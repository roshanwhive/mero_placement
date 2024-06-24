import React, {useEffect, useState} from 'react';
import {Divider, Modal, Portal} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import logoImage from '../../assets/complete-profile.png';
import {customFontSize, customFonts} from '../../constants/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getapplyJobConfirm,
  resetapplyJobState,
} from '../../features/applyJob/applyJobSlice';
import RoundButtonComp from '../../components/RoundBtn';
import {showMessage} from 'react-native-flash-message';

const ResumeModal = ({hideModal, slug}) => {
  const {
    resume,
    messageConfirm,
    isErrorConfirm,
    isSuccessConfirm,
    statusCodeConfirm,
  } = useSelector(state => state.jobApply);
  const [resumeData, setResumeData] = useState([]);
  const [resumeID, setResumeID] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  slug = route.params?.slug;

  const dispatch = useDispatch();

  useEffect(() => {
    if (resume && Array.isArray(resume)) {
      const mappedResumeList = resume.map(item => ({
        label: item.file,
        value: item.resume_id,
      }));
      setResumeData(mappedResumeList);
    }
  }, [resume]);

  const handleSubmit = () => {
    data = {slug: slug, resume: resumeID};
    dispatch(getapplyJobConfirm(data));
  };

  useEffect(() => {
    if (
      isErrorConfirm &&
      statusCodeConfirm !== 200 &&
      statusCodeConfirm !== 0
    ) {
      showMessage({
        message: JSON.stringify(messageConfirm),
        type: 'danger',
        animationDuration: 1000,
        animated: true,
      });
    } else if (isSuccessConfirm && statusCodeConfirm === 200) {
      navigation.navigate('HomeScreen');
      showMessage({
        message: JSON.stringify(messageConfirm),
        type: 'success',
        animationDuration: 1000,
        animated: true,
      });
      setTimeout(() => {
        dispatch(resetapplyJobState());
      });
    }
  }, [isErrorConfirm, isSuccessConfirm, statusCodeConfirm, messageConfirm]);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Portal>
      <Modal visible={true} onDismiss={hideModal}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <View style={styles.body}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Image source={logoImage} style={styles.image} />
                <Text style={styles.title}>Resume</Text>
                <Icon
                  name="times"
                  size={25}
                  style={styles.icon}
                  color={customThemeColor.darkRed}
                  onPress={hideModal}
                />
              </View>
              <Text style={styles.subtitle}>
                Select the most suitable CV for this job!
              </Text>
              <View
                style={{
                  padding: 4,
                  width: '100%',
                  marginBottom: 8,
                }}>
                <Dropdown
                  data={resumeData}
                  placeholder="Select Resume"
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={resumeID}
                  placeholderStyle={{color: customTextColor.secondary}}
                  selectedTextStyle={{color: customTextColor.secondary}}
                  itemTextStyle={{color: customTextColor.secondary}}
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: customTextColor.darkGreen,
                      borderRadius: 5,
                      paddingHorizontal: 16,
                      paddingVertical: 5,
                    },
                    styles.input,
                  ]}
                  onChange={item => {
                    setResumeID(item.value);
                    //handleSubmit(item.value)
                  }}
                  // onChange={(item) => handleSubmit(item.value)}
                />
                <View style={styles.row}>
                  <RoundButtonComp
                    label={'cancel'}
                    border={true}></RoundButtonComp>
                  <RoundButtonComp
                    label={'Submit'}
                    onPressBtn={handleSubmit}></RoundButtonComp>
                </View>
                {/* <TouchableOpacity onPress={handleSubmit} style={styles.buttonFollow}>
                                    <Text style={styles.followText} >Submit</Text>
                                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.5)',
  },
  body: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customThemeColor.lightBG,
    padding: 30,
    borderRadius: 20,
  },
  icon: {
    marginLeft: 10,
    margin: 20,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginBottom: 20,
    margin: 20,
  },

  title: {
    color: customTextColor.darkRed,
    fontSize: customFontSize.font24,
    fontFamily: customFonts.fontBold,
    margin: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
    color: customTextColor.darkRed,
  },
  button: {
    marginTop: 10,
    fontWeight: '700',
    backgroundColor: customThemeColor.darkRed,
  },
  input: {
    backgroundColor: 'transparent',
    color: customTextColor.darkGreen,
  },
  followText: {
    color: 'white',
    textAlign: 'center',
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPrompt,
  },
  buttonFollow: {
    backgroundColor: customThemeColor.darkRed,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 15,
    width: '85%',
    marginTop: 10,
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: 'space-between',
  },
});

export default ResumeModal;
