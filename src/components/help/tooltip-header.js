import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentTooltip, } from '@devexpress/dx-react-scheduler-material-ui';
import style from './tooltip-style';

const Header = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
}) => (
        <AppointmentTooltip.Header
            {...restProps}
            className={classes.header}
        >
            <span role="img" aria-label="Clock" className={classes.icon}>🕒</span>
            <div className={classes.title}>
                {appointmentData.title}
            </div>
        </AppointmentTooltip.Header>
    ));
export default Header;