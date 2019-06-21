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
        this.commitChangesGrid = this.commitChangesGrid.bind(this);
        this.commitChagesScheduler = this.commitChagesScheduler.bind(this);
    }

    commitChangesGrid({ added, changed, deleted }) {
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
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    commitChagesScheduler({ added, changed, deleted }) {
        alert(added);
        alert(changed);
        alert(deleted);
        this.setState((state) => {
            let { rows } = state;
            if (added !== undefined) {
              const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
              rows = [...rows, { id: startingAddedId, ...added }];
            }
            if (changed !== undefined) {
                rows = rows.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                alert(deleted);
                rows = rows.filter(appointment => appointment.id !== deleted);
            }
            return { rows };
          });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <AppointmentsGrid
                        commitChanges={this.commitChangesGrid}
                        rows={this.state.rows} />
                    <AppoinmentsScheduler
                        commitChanges={this.commitChagesScheduler}
                        data={this.state.rows} />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

}