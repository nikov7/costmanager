/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

import Table from 'react-bootstrap/Table';

// Component to display data in a tabular format
function ReportTable({ tableItems }) {
    return (
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Sum</th>
                <th>Category</th>
                <th>Description</th>
                <th>Month</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>{tableItems}</tbody>
        </Table>
    );
}

export default ReportTable;

