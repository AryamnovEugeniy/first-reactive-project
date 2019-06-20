import React from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import appointments from './data';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    EditingState,
    RowDetailState,
} from '@devexpress/dx-react-grid';
import RowDetail from './row-details';



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

const getRowId = row => row.id;

const TableRow = ({ row, ...restProps }) => (
    <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => alert(row.title)}
        style={{
            cursor: 'pointer',
            ...styles[row.location],
        }}
    />
);

export default class AppointmentsGrid extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'id', title: 'ID' },
                { name: 'title', title: 'Title' },
                {
                    name: 'startDate',
                    title: 'Start Date',
                    getCellValue: row => (row.startDate ? row.startDate.toLocaleString() : undefined)
                },
                {
                    name: 'endDate',
                    title: 'end Date',
                    getCellValue: row => (row.endDate ? row.endDate.toLocaleString() : undefined)
                },
                { name: 'location', title: 'Location' },
                { name: 'progress', title: 'Progress' },
            ],
            editingColumnExtensions: [

            ],
            rows: appointments.map((appointment) => {
                return ({
                    id: appointment.id,
                    title: appointment.title,
                    startDate: appointment.startDate,
                    endDate: appointment.endDate.toLocaleString(),
                    location: appointment.location,
                    progress: appointment.progress,
                    description: appointment.description,

                });
            }),
            sorting: [{ columnName: 'id', direction: 'asc' }],
            expandedRowIds: [],
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
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
        const { rows, columns, sorting,  expandedRowIds} = this.state;
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                    />
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={6}
                    />
                    <IntegratedPaging />
                    <RowDetailState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={this.changeExpandedDetails}
                    />
                    <Table
                        rowComponent={TableRow}
                    />
                    <TableHeaderRow />
                    <TableEditRow />
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                    />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                    <PagingPanel />
                </Grid>
            </Paper>
        );
    }
}