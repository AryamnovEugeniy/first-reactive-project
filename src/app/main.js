import React from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import appointments from './data';

const styles = {
    'Room 1': {
        backgroundColor: '#ff4c5b',
    },
    'Room 2': {
        backgroundColor: '#a2e2a4',
    },
    'Room 3': {
        backgroundColor: '#b3e5fc',
    },
};

const TableRow = ({ row, ...restProps }) => (
    <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => alert(JSON.stringify(row))}
        style={{
            cursor: 'pointer',
            ...styles[row.location],
        }}
    />
);

export default class Main extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'id', title: 'ID' },
                { name: 'title', title: 'Title' },
                { name: 'startDate', title: 'Start Date' },
                { name: 'endDate', title: 'end Date' },
                { name: 'location', title: 'Location' },
                { name: 'progress', title: 'Progress'},
            ],
            rows: appointments.map((appointment) => {
                return ({
                    id: appointment.id,
                    title: appointment.title,
                    startDate: appointment.startDate.toLocaleString(),
                    endDate: appointment.endDate.toLocaleString(),
                    location: appointment.location,
                    progress: appointment.progress,
                    description: appointment.description,

                });
            })
        };
    }
    render() {
        const { rows, columns } = this.state;
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <Table
                        rowComponent={TableRow}
                    />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        );
    }
}

/*return (
        <React.Fragment>
            <Grid
                rows={[
                    { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
                    { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
                    { id: 2, product: 'Another product', owner: 'Some owner'}
                ]}
                columns={[
                    { name: 'id', title: 'ID' },
                    { name: 'product', title: 'Product' },
                    { name: 'owner', title: 'Owner' },
                ]}>
                <Table />
                <TableHeaderRow />
            </Grid>
        </React.Fragment>
    );*/