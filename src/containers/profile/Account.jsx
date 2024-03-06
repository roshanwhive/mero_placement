import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native-paper';

const Account = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <View style={styles.account}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account</Text>
        <TouchableOpacity onPress={showModal}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountDetailContainer}>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>9840956784</Text>
        </View>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>roshan@gmail.com</Text>
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>male</Text>
        </View>
      </View>
      {/* Modal */}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  account: {
    width: '110%',
    borderRadius: 20,
    // backgroundColor: '#f6f7fb',
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
    fontWeight: '600',
    color: '#11401E',
  },
  edit: {
    color: '#2b8256',
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  detailCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  borderBottomGray: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 15,
    color: '#6e6e6e',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});

export default Account;
