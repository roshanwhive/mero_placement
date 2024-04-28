import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../components/custom_toolbar/AppBar';
import {customTextColor, customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HorizontalCard = ({icon1Name, title, icon2Name}) => {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {backgroundColor: customThemeColor.lightBG},
        ]}>
        <Icon name={icon1Name} size={40} color="white" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Icon name={icon2Name} size={40} color="black" />
    </View>
  );
};

const UpdateProfile = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <AppBar handleBack={handleBack} title="Update Profile" />
      <View style={styles.bodyContent}>
        <View style={styles.header}>
          <Text style={styles.heading}>Complete Profile</Text>
          <Text style={styles.subtitle}>
            Make sure your profile is up-to-date to help more people see it and
            improve your chances of getting your dream job
          </Text>
        </View>
        <View style={styles.container}>
          <HorizontalCard
            title="Basic Information"
            icon1Name="user-alt"
            icon2Name="check-circle"
            icon2Color={customTextColor.lightGreen}
          />
          <HorizontalCard
            title="Job Preference"
            icon1Name="suitcase"
            icon2Name="check-circle"
            icon2Color={customTextColor.lightGreen}
          />
          <HorizontalCard
            title="Education"
            icon1Name="book"
            icon2Name="check-circle"
            icon2Color={customTextColor.lightGreen}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  bodyContent: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: customThemeColor.lightBG,
    height: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: customTextColor.primary,
  },
  subtitle: {
    fontSize: 15,
    color: customTextColor.secondary,
  },

  // -----------Card----------------------
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: 'lightblue', // Background color for the first icon
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
