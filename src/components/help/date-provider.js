import React from 'react';
import DateAndTimePicker from './date-and-time-picker';
import {
    DataTypeProvider,
  } from '@devexpress/dx-react-grid';

const DateProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        editorComponent={DateEditor}
        {...props}
    />
);

const DateFormatter = ({ value }) => <p>{value.toLocaleString()}</p>;

const DateEditor = ({ value, onValueChange }) => (
    <DateAndTimePicker
        value={value} 
        onChange={event => onValueChange(event.target.value)}/>
);

export default DateProvider;