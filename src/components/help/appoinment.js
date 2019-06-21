import React from 'react';
import {
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from './colors';

const LOCATION1 = 'Room 1';
const LOCATION3 = 'Room 2';
const LOCATION2 = 'Room 3';

const Appointment = ({
    children, style, ...restProps
}) => {
    switch (restProps.data.location) {
        case
            LOCATION1:
            return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                        ...style,
                        backgroundColor: Colors.COLOR_OF_THE_LOCATION1,
                        borderRadius: '8px',
                    }}
                >
                    {children}
                </Appointments.Appointment>
            );
        case
            LOCATION2:
            return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                        ...style,
                        backgroundColor: Colors.COLOR_OF_THE_LOCATION2,
                        borderRadius: '8px',
                    }}
                >
                    {children}
                </Appointments.Appointment>
            );
        case
            LOCATION3:
            return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                        ...style,
                        backgroundColor: Colors.COLOR_OF_THE_LOCATION3,
                        borderRadius: '8px',
                    }}
                >
                    {children}
                </Appointments.Appointment>
            );
    }
    return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: '#FFC107',
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    )
};

export default Appointment;