import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerModal = ({ isVisible, onConfirm, onCancel }) => (
  <DateTimePickerModal
    isVisible={isVisible}
    mode="datetime"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default DatePickerModal;

