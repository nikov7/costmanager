import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

// HistogramChart component displays a bar chart to visualize cost summary data.
// It takes a single prop, `data`, which is an array of objects representing cost categories and sums.
function HistogramChart({ data }) {
    // Define an array of colors to use for the bars
    const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff3864', '#a4de6c'];

    return (
        <div>
            {data.length > 0 ? ( // Check if data is not empty
                <div>
                    <h2>Cost Summary Chart:</h2>
                    {/* Create a bar chart using Recharts */}
                    <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sum" fill="#8884d8">
                            {/* Map data entries to bars and assign colors */}
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
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
