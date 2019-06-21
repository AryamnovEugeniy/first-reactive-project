import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Styles } from '@material-ui/core/styles/withStyles';

const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function DateAndTimePicker(props) {
    //const classes = this.props.classes;
  
    return (
        <form /*className={classes.container}*/ noValidate>
            <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                /*className={classes.textField}*/
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
  }

  export default withStyles(useStyles)(DateAndTimePicker)