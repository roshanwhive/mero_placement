import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Modal} from 'react-native-paper';

const Datepicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleConfirm = selectedDate => {
    setOpen(false);
    setDate(selectedDate);

    // Format the date as needed
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={date}
          placeholder="Select date"
          onFocus={() => setOpen(true)}
          style={styles.input}
        />

        <Modal
          transparent={true}
          visible={open}
          onRequestClose={() => setOpen(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DatePicker
                date={date}
                mode="date"
                onDateChange={handleConfirm}
              />
              <Button title="Confirm" onPress={() => setOpen(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Datepicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});
