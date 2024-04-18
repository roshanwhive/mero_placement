import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../constants/Color';
import { customFontSize, customFonts } from '../constants/theme';

const ActivelySeekingForJobCard = ({title, subtitle}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Receive Job Notifications??</Text>
        <Text style={styles.subtitle}>
          Enable this switch to receive job notifications and increase your
          chances.
        </Text>
      </View>
      <Switch
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
        color={customThemeColor.darkRed}
        style={styles.swicthButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: customThemeColor.white,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: customFontSize.font16,
    marginBottom: 4,
    color: customTextColor.primary,
    fontFamily: customFonts.fontBold
  },
  subtitle: {
    fontSize: customFontSize.font12,
    color: customTextColor.secondary,
    fontFamily: customFonts.font,
  },
  swicthButton: {
    fontSize: 20,
  },
});

export default ActivelySeekingForJobCard;
