import React from 'react';
import { Paper } from '@material-ui/core';
import {
    Chart,
    PieSeries,
    Legend,
    Title,
  } from '@devexpress/dx-react-chart-material-ui';

const RowDetail = ({ row }) => {
    const data = [
        { progress: row.progress, status: "done" },
        { progress: 1 - row.progress, status: "not done" },
    ];
    return (
        <div>
            {row.description}
            <Paper>
                <Chart
                    data={data}
                >
                    <PieSeries
                        valueField="progress"
                        argumentField="status"
                    />
                    <Legend />
                    <Title text="Progress chart" />
                </Chart>
            </Paper>
        </div>

    );
}

export default RowDetail;