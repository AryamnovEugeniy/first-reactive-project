import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { AppointmentTooltip, } from '@devexpress/dx-react-scheduler-material-ui';
import style from './tooltip-style';

const TooltipContent = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
    <AppointmentTooltip.Content {...restProps}>
      <div className={classes.text}>
        {moment(appointmentData.startDate).format('h:mm A')}
        {' - '}
        {moment(appointmentData.endDate).format('h:mm A')}
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => console.log(appointmentData.description)}
      >
        Details
      </Button>
    </AppointmentTooltip.Content>
  ));

export default TooltipContent;