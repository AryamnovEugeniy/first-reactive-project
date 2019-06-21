import React from 'react';
import AppointmentsGrid from '../components/appointments-grid';
import appointments from '../components/help/data';
import AppoinmentsScheduler from '../components/appointments-scheduler';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });



export default class AppoinmentsContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            rows: appointments,
        };
        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        let { rows } = this.state;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            rows = rows.filter(appointment => appointment.id !== deleted);
        }
        this.setState({ rows });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <AppointmentsGrid
                        commitChanges={this.commitChanges}
                        rows={this.state.rows} />
                    <AppoinmentsScheduler
                        commitChanges={this.commitChanges}
                        data={this.state.rows} />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

}