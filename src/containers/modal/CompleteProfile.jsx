import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import logoImage from '../../assets/complete-profile.png';
import {useNavigation} from '@react-navigation/native';
import {customThemeColor} from '../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CompleteProfile = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 6000);
  }, [0]);

  const hideModal = () => setVisible(false);

  const handleClick = () => {
    navigation.navigate('Profile');
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}>
        <Animatable.View
          animation="bounceIn"
          duration={1000}
          style={styles.container}>
          <Icon
            name="times"
            size={25}
            style={styles.icon}
            color={customThemeColor.darkRed}
            onPress={hideModal}
          />
          <Image source={logoImage} style={styles.image} />
          <Text style={styles.title}>Complete Profile</Text>
          <Text style={styles.subtitle}>
            Update your profile information to attrack recruiters.
          </Text>
          <Button mode="contained" onPress={handleClick} style={styles.button}>
            Update Profile
          </Button>
        </Animatable.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    backgroundColor: customThemeColor.lightBG,
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 'auto',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    fontWeight: '700',
    backgroundColor: customThemeColor.darkRed,
  },
});

export default CompleteProfile;
