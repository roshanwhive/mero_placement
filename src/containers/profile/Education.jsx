import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Education = () => {
  const [showInfo, setShowInfo] = useState(null);

  const {userProfile} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const toggleInfo = id => {
    if (showInfo === id) {
      setShowInfo(null);
    } else {
      setShowInfo(id);
    }
  };

  return (
    <View style={styles.education}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Education</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditProfile', {title: 'Education'})
          }>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      {userProfile?.education?.map((items, index) => {
        return (
          <View key={index} style={{padding: 10, marginBottom: 10}}>
            <TouchableOpacity onPress={() => toggleInfo(items.education_id)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.detailCard1}>
                  <Text style={styles.educationTitle}>
                    {items.deg_type_name}
                  </Text>
                  <Text style={styles.status}>{items?.passed_status}</Text>
                </View>
                <Icon
                  name={`chevron-${showInfo ? 'down' : 'right'}`}
                  size={20}
                  color={customTextColor.primary}
                />
              </View>
            </TouchableOpacity>
            {showInfo == items.education_id && (
              <View style={styles.infoCard}>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>Institute</Text>
                  <Text style={styles.value}>
                    {items?.institute_name || '-'}
                  </Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>University</Text>
                  <Text style={styles.value}>
                    {items?.university_board_name || '-'}
                  </Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>Start Date</Text>
                  <Text style={styles.value}>{items?.start_date || '-'}</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>End Date</Text>
                  <Text style={styles.value}>{items?.end_date || '-'}</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>GPA/Percentage</Text>
                  <Text style={styles.value}>
                    {items?.passed_percentage != null
                      ? items.passed_percentage + '%'
                      : '-'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  education: {
    width: '110%',
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: customTextColor.primary,
  },
  edit: {
    color: '#2b8256',
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  educationCard: {
    marginTop: 10,
    backgroundColor: customThemeColor.lightBG,
  },
  detailCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  detailCard1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: customThemeColor.white,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  borderBottomGray: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  educationTitle: {
    fontSize: 16,
    color: customTextColor.primary,
    fontWeight: '500',
  },
  status: {
    backgroundColor: customThemeColor.darkGreen,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 15,
    borderRadius: 20,
    fontSize: 11,
    color: customTextColor.white,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    color: customTextColor.secondary,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});

export default Education;
