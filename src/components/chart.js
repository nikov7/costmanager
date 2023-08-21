import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function HistogramChart({data}) {

    return (
        <div>
            <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sum" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default HistogramChart;
