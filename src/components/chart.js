/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';

// Component to render the histogram
function HistogramChart({ data }) {

    // Define colors for the histogram bars
    const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff3864', '#a4de6c'];

    // Render the histogram chart or a message if no data is available
    return (
        <div>
            {data.length > 0 ? (
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