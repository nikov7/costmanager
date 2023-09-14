import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';

function HistogramChart({ data }) {
    const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff3864', '#a4de6c'];

    return (
        <div>
            {data.length > 0 ? ( // Check if data is not empty
                <div>
                <h2>Cost Summary Chart:</h2>
                <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='category' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='sum' fill='#8884d8'>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
                    </div>
            ) : (
                <p>No Chart since there is no available data!</p>
            )}
        </div>
    );
}

export default HistogramChart;
