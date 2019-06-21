import React from 'react';
import {
    Table,
} from '@devexpress/dx-react-grid-material-ui';
import * as Colors from './colors';

const styles = {
    'Room 1': {
        backgroundColor: Colors.COLOR_OF_THE_LOCATION1,
    },
    'Room 2': {
        backgroundColor: Colors.COLOR_OF_THE_LOCATION2,
    },
    'Room 3': {
        backgroundColor: Colors.COLOR_OF_THE_LOCATION3,
    },
};

const TableRow = ({ row, ...restProps }) => (
    <Table.Row
        {...restProps}
        style={{
            cursor: 'pointer',
            ...styles[row.location],
        }}
    />
);

export default TableRow;