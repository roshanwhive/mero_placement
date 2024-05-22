import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {customFontSize, customFonts} from '../../../../constants/theme';
import {showMessage} from 'react-native-flash-message';
import {delExperience} from '../../../../features/profile/experienceSlice/deleteExperienceSlice';

const ExperienceCard = ({items, navigation}) => {
  const {message, isSuccess, isLoading, isError, statusCode} = useSelector(
    state => state.deleteExperience,
  );
  const dispatch = useDispatch();

  const handleEdit = id => {
    // id = items?.education_id;
    navigation.navigate('ExperienceAdd', {id});
  };

  const handleDelete = () => {
    dispatch(delExperience(items?.experience_id)).then(() => {
      if (isError && statusCode !== 200 && statusCode !== 0) {
        showMessage({
          message: JSON.stringify(message),
          type: 'danger',
          animationDuration: 1000,
          animated: true,
        });
      } else if (isSuccess && statusCode === 200) {
        showMessage({
          message: JSON.stringify(message),
          type: 'success',
          animationDuration: 1000,
          animated: true,
        });
      }
    });
    console.log('deleteExp', message);
  };
  return (
    <View
      style={{
        backgroundColor: customThemeColor.white,
        borderRadius: 10,
        marginBottom: 18,
        borderLeftWidth: 4,
        borderColor: customThemeColor.darkGreen,
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: '#E6E6E6',
        }}>
        <Text style={styles.subTitle}>
          From :
          <Text style={styles.title}> {items ? items.start_date : ''} </Text>
          To:
          <Text style={styles.title}> {items ? items.end_date : ''}</Text>
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginBottom: 3,
                color: 'black',
                fontSize: customFontSize.font18,
                fontFamily: customFonts.fontRobotoBold,
              }}>
              {' '}
              {items ? items.org_name : ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 4,
                  paddingTop: 1,
                }}>
                <TouchableOpacity
                  onPress={() => handleEdit(items?.experience_id)}>
                  <Icon
                    name="square-edit-outline"
                    size={20}
                    color={customTextColor.primary}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 4,
                  paddingTop: 1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Meroplacement',
                      'Are you sure you want to delete?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            console.log('cancel', items?.experience_id);
                          },
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            handleDelete();
                          },
                        },
                      ],
                    );
                  }}>
                  <Icon
                    name="delete"
                    size={20}
                    color={customTextColor.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginBottom: 3,
                color: 'black',
                fontSize: customFontSize.font14,
                fontFamily: customFonts.fontPoppins,
              }}>
              ( {items ? items.job_category.name : ''} )
            </Text>
            {/* <View
                            style={{
                                backgroundColor: customThemeColor.white,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                paddingBottom: 4,
                                paddingTop: 1,
                                width: "30%",
                                borderWidth: 1,
                                borderColor: customThemeColor.darkRed,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                            <TouchableOpacity onPress={() => {
                                // dispatch(getSingleExperience(items?.experience_id))
                                Alert.alert('Meroplacement',
                                    'Are you sure you want to delete?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => { dispatch(delExperience(items?.experience_id)) },
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]);
                            }}>
                                <Text style={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>Delete</Text>
                            </TouchableOpacity>
                        </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingRight: 10,
                  marginRight: 10,
                  flex: 1,
                }}>
                <Text style={styles.subTitle}>Company Type</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  paddingLeft: 10,
                  marginLeft: 10,
                }}>
                <Text style={styles.subTitle}>Job Level</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 10,
                  marginRight: 10,
                  flex: 1,
                }}>
                <Text style={styles.title}>
                  {items ? items.company_type.name : ''}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 10,
                  marginLeft: 10,
                }}>
                <Text style={styles.title}>
                  {items ? items.job_level.name : ''}
                </Text>
              </View>
            </View>
          </View>
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
  title: {
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font14,
  },
  subTitle: {
    color: customTextColor.secondary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font12,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default ExperienceCard;
