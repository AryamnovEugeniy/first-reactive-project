import React from 'react';
import {
    Scheduler,
    WeekView,
    MonthView,
    DayView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, } from '@devexpress/dx-react-scheduler';
import { Paper } from '@material-ui/core';
import TooltipContent from './help/tooltip-content';
import * as Colors from './help/colors';

const LOCATION1 = 'Room 1';
const LOCATION3 = 'Room 2';
const LOCATION2 = 'Room 3';

export default class AppoinmentsScheduler extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: this.props.data[0].startDate ? this.props.data[0].startDate : '2018-11-01',
            currentViewName: { WeekView },
        }
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.currentViewNameChange = (currentViewName) => {
            this.setState({ currentViewName });
        };
    }

    render() {
        const data = this.props.data;
        const { currentDate } = this.state;
        return (
            <Paper>
                <Scheduler
                    data={data}
                    height={600}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={this.currentDateChange}
                    />
                    <EditingState
                        onCommitChanges={this.props.commitChanges}


                    />
                    <WeekView
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <WeekView
                        name="Work Week"
                        excludedDays={[0, 6]}
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <MonthView />
                    <DayView />
                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <Appointments
                        appointmentComponent={Appointment} />
                    <AppointmentTooltip
                        contentComponent={TooltipContent}
                        showOpenButton
                        showDeleteButton
                    />

                    <AppointmentForm />
                </Scheduler>
            </Paper>
        );
    }

}

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
