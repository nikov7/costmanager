import Table from 'react-bootstrap/Table';

// ReportTable component displays a table of cost data.
// It receives an array of table items (rows) as a prop.
function ReportTable({ table_items }) {
    return (
        // Create a Bootstrap table with striped, bordered, and hover styles.
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {/* Define table headers */}
                <th>Sum</th>
                <th>Category</th>
                <th>Description</th>
                <th>Month</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>{table_items}</tbody> {/* Populate the table body with the received items */}
        </Table>
    );
}

export default ReportTable;
