import React from 'react';
import DateAndTimePicker from './date-and-time-picker';
import {
    DataTypeProvider,
  } from '@devexpress/dx-react-grid';

const LocationProvider = props => (
    <DataTypeProvider
        formatterComponent={LocationFormatter}
        editorComponent={LocationEditor}
        {...props}
    />
);

const LocationFormatter = ({ value }) => {
    let location = undefined;
    let alt = undefined;
    if (value === 'Room 1') {
        location = "https://upload.wikimedia.org/wikipedia/commons/1/15/Grand_Kremlin_Palace_Georgievsky_hall.jpg";
        alt="Room 1";
    }
    else if (value === 'Room 2') {
        location = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/St._George_hall2.jpg/800px-St._George_hall2.jpg";
        alt="Room 1";
    }
    else if (value === 'Room 3') {
        location = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/St._George_hall4.jpg/800px-St._George_hall4.jpg";
        alt="Room 1";
    }
    return <img src={location} alt={alt} height="125px"/>
};

const LocationEditor = ({ value, onValueChange }) => (
    <input
        type="text"
        onChange={onValueChange}
        placeholder="Put down Room 1, Room 2 or Room 3"
    />
);

export default LocationProvider;