import React from 'react';
import { Scheduler, DayView, Appointments, WeekView, MonthView } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

const currentDate = '2018-11-01';

export default class AppoinmentsScheduler extends React.PureComponent {

    render() {
        return (
            <Scheduler
                data={[
                    { startDate: '2018-10-31 10:00', endDate: '2018-10-31 11:00', title: 'Meeting' },
                    { startDate: '2018-11-01 18:00', endDate: '2018-11-01 19:30', title: 'Go to a gym' },
                    { startDate: '2018-11-20 18:00', endDate: '2018-11-01 19:30', title: 'Go to a gym' },
                ]}
            >
                <ViewState
                    currentDate={currentDate}
                />
                <MonthView />
                <Appointments />
            </Scheduler>
        );
    }

}