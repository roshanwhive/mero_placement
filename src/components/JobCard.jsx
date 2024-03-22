import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {customTextColor} from '../constants/Color';
import {format, formatDistance, differenceInMilliseconds} from 'date-fns';

const JobCard = ({items, navigation}) => {
  const companyLogo = require('../assets/companyLogo.png');
  const jobTitle = 'Frontend Developer';
  const location = 'Raatopul, Kathmandu';
  const date = '2 days ago';

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedDistance, setFormattedDistance] = useState('');
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
      console.log('items:', items);
      console.log('items.get_company.logo:', items.get_company.logo);
    }
  }, [items]);

  const onPressApply = () => {
    navigation.navigate('JobDetail');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CompanyProfile')}>
          {items && items.get_company && items.get_company.logo == null ? (
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.logo}
            />
          ) : (
            <Image source={companyLogo} style={styles.logo} />
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

        <View style={styles.buttonContainer}>
          <View></View>
          <View>
            <TouchableOpacity onPress={onPressApply} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 10,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    height: 100,
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
    top: '-20%',
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
