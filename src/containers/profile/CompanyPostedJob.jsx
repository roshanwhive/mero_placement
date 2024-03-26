import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customTextColor, customThemeColor} from '../../constants/Color';
import JobCard from '../../components/JobCard';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const Row = ({icon, title, value}) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={icon} size={22} style={styles.rowLeftIcons} />
          <Text style={styles.rowLeftText}>{title} </Text>
        </View>
        <Text style={styles.rowLeftText}>: </Text>
      </View>
      <Text style={styles.rowRightText}>{value}</Text>
    </View>
  );
};

const CompanyPostedJob = ({postedJob}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.background}
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {postedJob.jobs ? (
          postedJob.jobs.map((jobs, index) => {
            return <JobCard key={index} items={jobs} navigation={navigation} />;
          })
        ) : (
          <ActivityIndicator
            animating={true}
            style={{marginVertical: 20}}
            color={customTextColor.lightGreen}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: customThemeColor.lightBG,
    flex: 1,
  },
  container: {
    marginHorizontal: 15,
    marginTop: 25,
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: customThemeColor.lighterBg,
    alignItems: 'baseline',
  },
  rowLeft: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
  },
  rowLeftIcons: {
    color: customTextColor.darkRed,
  },
  rowLeftText: {
    marginLeft: 7,
    fontSize: 20,
    fontWeight: '600',
    color: customTextColor.primary,
  },
  rowRightText: {
    color: customTextColor.primary,
    fontSize: 16,
    fontWeight: '400',
  },
});
export default CompanyPostedJob;
