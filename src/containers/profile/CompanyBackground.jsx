import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customTextColor, customThemeColor} from '../../constants/Color';

const Row = ({icon, title, value}) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={icon} size={18} style={styles.rowLeftIcons} />
          <Text style={styles.rowLeftText}>{title} </Text>
        </View>
        <Text style={styles.rowLeftText}>: </Text>
      </View>
      <Text style={styles.rowRightText}>{value}</Text>
    </View>
  );
};

const CompanyBackground = () => {
  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Row icon="house-user" title="Name" value="Whive IT Professional" />
        <Row icon="mail-bulk" title="Email" value="walkershive@gmail.com" />
        <Row
          icon="map-marked-alt"
          title="Location"
          value="Chabhill, Kathmandu"
        />
        <Row icon="th-large" title="Size" value="45 Employee" />
        <Row icon="globe-americas" title="Website" value="walkershive.com.np" />
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
    marginVertical: 25,
  },
  row: {
    padding: 15,
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
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '400',
    color: customTextColor.primary,
  },
  rowRightText: {
    color: customTextColor.secondary,
    fontSize: 16,
    fontWeight: '400',
  },
});
export default CompanyBackground;
