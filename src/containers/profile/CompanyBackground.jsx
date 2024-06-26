import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {ActivityIndicator} from 'react-native-paper';
import { customFontSize, customFonts } from '../../constants/theme';

const Row = ({icon, title, value}) => {
  return (
    <ScrollView>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={icon} size={15} style={styles.rowLeftIcons} />
            <Text style={styles.rowLeftText}>{title} </Text>
          </View>
          <Text style={styles.rowLeftText}>: </Text>
        </View>
        {title === 'Website' ? (
          <Text style={styles.rowRightTextWebsite}>{value}</Text>
        ) : (
          <Text style={styles.rowRightText}>{value}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const CompanyBackground = ({backgroundInfo}) => {
  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
      {!!backgroundInfo ? (
        <View style={styles.container}>
          <Row
            icon="house-user"
            title="Name"
            value={backgroundInfo.employer_name}
          />
          <Row icon="mail-bulk" title="Email" value={backgroundInfo?.email} />
          {backgroundInfo?.address && backgroundInfo?.address?.length > 0 ? (
            backgroundInfo?.address?.map((address, index) => (
              <Row
                key={index}
                icon="map-marked-alt"
                title={`Location ${address?.address_id}`}
                value={address?.address}
              />
            ))
          ) : (
            <Row
              key="no-address"
              icon="map-marked-alt"
              title="Address:"
              value="-"
            />
          )}
          <Row
            icon="th-large"
            title="Type"
            value={backgroundInfo ? backgroundInfo?.company_type?.name : ''}
          />
          <Row
            icon="globe-americas"
            title="Website"
            value={backgroundInfo ? backgroundInfo?.website : ''}
          />
        </View>
      ) : (
        <ActivityIndicator
          animating={true}
          style={{marginVertical: 20}}
          color={customTextColor?.lightGreen}
        />
      )}
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
    marginVertical: 15,
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
    marginLeft: 10,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontRoboto,
    color: customTextColor.primary,
  },
  rowRightText: {
    color: customTextColor.secondary,
    fontSize: customFontSize.font14,
    
  },
  rowRightTextWebsite: {
    color: customTextColor.darkGreen,
    fontSize: customFontSize.font14,
    textDecorationLine: 'underline',
  },
});
export default CompanyBackground;
