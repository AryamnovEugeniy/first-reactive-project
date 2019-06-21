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
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import TooltipContent from './help/tooltip-content';


export default class AppoinmentsScheduler extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: this.props.data[0].startDate ? this.props.data[0].startDate : '2018-11-01',
            currentViewName: {WeekView},
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
                    <Appointments />
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



const style = theme => ({
    todayCell: {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
    },
    weekendCell: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
    },
    today: {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
    weekend: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
    },
});

const TimeTableCellBase = ({ classes, ...restProps }) => {
    const { startDate } = restProps;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
        return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6) {
        return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <WeekView.TimeTableCell {...restProps} />;
};

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

const DayScaleCellBase = ({ classes, ...restProps }) => {
    const { startDate, today } = restProps;
    if (today) {
        return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
    } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
    } return <WeekView.DayScaleCell {...restProps} />;
};

const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);