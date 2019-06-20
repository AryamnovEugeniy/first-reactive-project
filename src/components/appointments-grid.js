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
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateAndTimePicker from './help/date-and-time-picker';

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
                    getCellValue: row => (row.endDate ? row.startDate.toLocaleString() : undefined)
                },
                { name: 'location', title: 'Location' },
                { name: 'progress', title: 'Progress' },
            ],
            editingColumnExtensions: [

            ],
            sorting: [{ columnName: 'id', direction: 'asc' }],
            expandedRowIds: [],
            grouping: [{ columnName: 'location' }],
        };
        this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
        this.changeSorting = sorting => this.setState({ sorting });
    }

    render() {
        const { columns, sorting,  expandedRowIds, grouping} = this.state;
        const rows = this.props.rows;
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <EditingState
                        onCommitChanges={this.props.commitChanges}
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