import React from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    TableRowDetail,
    TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import appointments from './help/data';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    EditingState,
    RowDetailState,
    GroupingState,
    CustomGrouping,
    IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import RowDetail from './help/row-details';
import TableRow from './help/table-row';

const getChildGroups = groups => groups
  .map(group => ({ key: group.key, childRows: group.items }));

const getRowId = row => row.id;

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
                    endDate: appointment.endDate,
                    location: appointment.location,
                    progress: appointment.progress,
                    description: appointment.description,

                });
            }),
            sorting: [{ columnName: 'id', direction: 'asc' }],
            expandedRowIds: [],
            grouping: [{ columnName: 'location' }],
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
        this.changeSorting = sorting => this.setState({ sorting });
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
        const { rows, columns, sorting,  expandedRowIds, grouping} = this.state;
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
                    <GroupingState
                        grouping={grouping}
                    />
                    <IntegratedGrouping
                        getChildGroups={getChildGroups}
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
                    <TableGroupRow />
                    <TableHeaderRow 
                        showSortingControls/>
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