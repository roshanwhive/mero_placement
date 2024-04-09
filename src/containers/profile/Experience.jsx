import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Experience = () => {
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

  const calculateDuration = ({startDate, endDate}) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const durationMs = end - start;

    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  };

  return (
    <View style={styles.education}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Experience</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditProfile', {title: 'Experience'})
          }>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      {userProfile?.experience?.map((items, index) => {
        return (
          <View key={index} style={{padding: 10, marginBottom: 10}}>
            <TouchableOpacity onPress={() => toggleInfo(items.experience_id)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.detailCard1}>
                  <Text style={styles.educationTitle}>{items?.position}</Text>
                  <Text style={styles.badge}>( 2 years )</Text>
                </View>
                <Icon
                  name={`chevron-${showInfo ? 'down' : 'right'}`}
                  size={20}
                  color={customTextColor.primary}
                />
              </View>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 15,
                  color: customTextColor.secondary,
                }}>
                {items?.org_name}
              </Text>
            </TouchableOpacity>
            {showInfo == items.experience_id && (
              <View style={styles.infoCard}>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>Job Category</Text>
                  <Text style={styles.value}>
                    {items?.job_category?.name || '-'}
                  </Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.label}>Level</Text>
                  <Text style={styles.value}>
                    {items?.job_level?.name || '-'}
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
                  <Text style={styles.label}>Company Type</Text>
                  <Text style={styles.value}>
                    {items?.company_type?.name || '-'}
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
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  detailCard1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    marginTop: 10,
    flexWrap: 'wrap',
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
  badge: {
    fontSize: 12,
    color: customTextColor.secondary,
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

export default Experience;
