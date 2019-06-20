import React from 'react';
import AppointmentsGrid from '../components/appointments-grid';
import appointments from '../components/help/data';
import AppoinmentsScheduler from '../components/appointments-scheduler';

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
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    render() {
        return (
            <React.Fragment>
                <AppointmentsGrid 
                    commitChanges={this.commitChanges}
                    rows={this.state.rows}/>
                <AppoinmentsScheduler />
            </React.Fragment>
        );
    }

}