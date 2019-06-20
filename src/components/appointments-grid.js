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
import DateProvider from './help/date-provider';
import LocationProvider from './help/location-provider';

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
            grouping: [{ columnName: 'progress' }],
            dateColumns: ['startDate', 'endDate'],
        };
        this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
        this.changeSorting = sorting => this.setState({ sorting });
    }

    render() {
        const { columns, sorting, expandedRowIds, grouping, dateColumns } = this.state;
        const rows = this.props.rows;
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <DateProvider
                        for={dateColumns} />
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
                        cellComponent={Cell}
                    />
                    <TableGroupRow />
                    <TableHeaderRow
                        showSortingControls />
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

const LocationCell = ({ value, style, ...restProps }) => {
    let location = undefined;
    let alt = undefined;
    if (value === 'Room 1') {
        location = "https://upload.wikimedia.org/wikipedia/commons/1/15/Grand_Kremlin_Palace_Georgievsky_hall.jpg";
        alt="Room 1";
    }
    else if (value === 'Room 2') {
        location = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/St._George_hall2.jpg/800px-St._George_hall2.jpg";
        alt="Room 1";
    }
    else if (value === 'Room 3') {
        location = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/St._George_hall4.jpg/800px-St._George_hall4.jpg";
        alt="Room 1";
    }
    return (
    <Table.Cell
        {...restProps}
    >
        <img src={location} alt={alt} height="125px"/>
    </Table.Cell>
    );
}

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'location') {
        return <LocationCell {...props}/>;
    }
    return <Table.Cell {...props} />;
};