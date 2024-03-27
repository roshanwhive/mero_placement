import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {customTextColor} from '../constants/Color';
import {format, formatDistance, differenceInMilliseconds} from 'date-fns';
import {useDispatch} from 'react-redux';
import {getSingleJob} from '../features/job/JobSlice';
import {getCompanyProfile} from '../features/company/CompanySlice';
import AvatarByName from './AvatarbyName';

const JobCard = ({items, navigation}) => {
  const companyLogo = require('../assets/companyLogo.png');

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedDistance, setFormattedDistance] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      const date = new Date(items.created_date);
      const formattedDate = format(date, 'd MMMM yyyy');
      const distance = formatDistance(new Date(), date, {addSuffix: true});
      let formattedDistance = distance.replace('about ', '').replace('in ', '');

      if (!formattedDistance.endsWith('ago')) {
        formattedDistance += ' ago';
      }
      setFormattedDate(formattedDate);
      setFormattedDistance(formattedDistance);
    }
  }, [items]);
  const onPressApplyButton = slug => {
    navigation.navigate('JobDetail', {slug: slug});
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(getCompanyProfile(items?.get_company?.slug));
            navigation.navigate('CompanyProfile', {
              slug: items ? items.get_company.slug : '',
            });
          }}>
          {items && items.get_company && items.get_company.logo !== null ? (
            <Image source={{uri: items.get_company.logo}} style={styles.logo} />
          ) : (
            <AvatarByName name={items?.getCompanyProfile?.employer_name} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.jobDetailsContainer}>
        <Text style={styles.jobTitle}>{items ? items.position_name : ''}</Text>
        <View style={styles.contentContainer}>
          <Icon
            name="map-pin"
            size={14}
            color={customTextColor.secondary}
            style={styles.icon}
          />
          <Text style={styles.location}>
            {/* {items ? items.address : 'Kathmandu'} */}
            Chabhil Kathmandu
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Icon
            name="clock"
            size={14}
            color={customTextColor.secondary}
            style={styles.icon}
          />
          <Text style={styles.location}>{formattedDistance}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View></View>
        <View>
          <TouchableOpacity
            onPress={() => {
              dispatch(getSingleJob(items?.slug));
              navigation.navigate('JobDetail', {
                slug: items ? items.slug : '',
              });
            }}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 2,
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    height: 'auto',
  },
  logoContainer: {
    marginRight: 16,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10,
    objectFit: 'cover',
  },
  jobDetailsContainer: {
    flex: 1,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  icon: {
    marginTop: 3,
    fontWeight: '300',
  },
  location: {
    color: '#706f6f',
    fontWeight: '400',
    fontSize: 14,
  },

  buttonContainer: {
    top: '5%',
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  applyButton: {
    backgroundColor: '#9D050A',
    width: 'auto',
    textAlign: 'right',
    alignItems: 'right',
    display: 'flex',
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JobCard;
