import Table from 'react-bootstrap/Table';

function ReportTable({ table_items }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>Sum</th>
                <th>Category</th>
                <th>Description</th>
                <th>Month</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>{table_items}</tbody>
        </Table>
    );
}

export default ReportTable;

