import React from 'react';
import {
    Table,
} from '@devexpress/dx-react-grid-material-ui';

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
        onClick={() => alert(row.title)}
        style={{
            cursor: 'pointer',
            ...styles[row.location],
        }}
    />
);

export default TableRow;