/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HistogramChart from './chart';
import ReportTable from './table';
import {LogBox, ButtonInput, TextInput} from './inputs';

/* global idb */


function ReportMain() {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const monthNum = Number(month);
    const yearNum = Number(year);

    const [items, setItems] = useState([]);
    const [data_for_chart, setDataForChart] = useState([]);
    const [search, setSearch] = useState('');

    function clearReportItems(){
        setItems([])
        setDataForChart([])
    }

    /*
    Check if the item in database should be reported. this function covers all the following cases (filters):
    Empty query (show all records), By Month, By Year, By Month and year (edited)
     */
    function shouldReportItem(cursor_val){
        const onlyMonth = cursor_val.month === monthNum && yearNum === 0
        const onlyYear = cursor_val.year === yearNum && monthNum === 0
        const emptyQuery = !monthNum && !yearNum
        const specificQuery = cursor_val.year === yearNum && cursor_val.month === monthNum
        return onlyYear || onlyMonth || emptyQuery || specificQuery
    }

    // Show relevant log depending on the search
    function getSummaryTitle(){
        if (!monthNum && !yearNum) return `'Cost Summary' for all history:`
        if (yearNum && !monthNum) return `'Cost Summary' for Year: ${yearNum}`
        if (monthNum && !yearNum) return `'Cost Summary' for Month: ${monthNum}`
        if (monthNum && yearNum) return `'Cost Summary' for Month: ${monthNum} and Year: ${yearNum}`
    }

    // Function is called when 'Get Report' button is pressed
    function handleClick() {
        let item = [];
        let chartData = [
            { sum: 0, category: 'FOOD' },
            { sum: 0, category: 'HEALTH' },
            { sum: 0, category: 'EDUCATION' },
            { sum: 0, category: 'TRAVEL' },
            { sum: 0, category: 'HOUSING' },
            { sum: 0, category: 'OTHER' },
        ];
        // Accessing the idb costs object store
        let objectStore = idb.db.getDB().transaction(['costs'], 'readonly').objectStore('costs');

        // Opening the cursor
        let cursorObject = objectStore.openCursor();

        // Clears the previous query records (table and chart)
        clearReportItems();

        // Iterate through the cursor
        cursorObject.onsuccess = (event) => {

            // Get the current record
            const cursor = event.target.result;

            // If there is still a record left
            if (cursor) {
                const val = cursor.value;

                // Check if the record should be displayed
                if (shouldReportItem(val)) {

                    // Sum all records that belong to the same category
                    for (const chartItem of chartData) {
                        if (chartItem.category === val.category) {
                            chartItem.sum += val.sum;
                        }
                    }
                    // Store the record
                    item.push(
                        <tr key={cursor.key}>
                            <td>{val.sum}</td>
                            <td>{val.category}</td>
                            <td>{val.description}</td>
                            <td>{val.month}</td>
                            <td>{val.year}</td>
                        </tr>
                    );
                }

                // Move to the next record
                cursor.continue();
            } else {

                // If any records were found, display the results
                if (item.length) {
                    setSearch(getSummaryTitle());
                    setItems(item);
                    setDataForChart(chartData);
                } else {
                    setSearch(`No Costs yet for the dates you mentioned`);
                }
            }
        };
    }
    return (
        <div className='border p-10 w-100'>
            <h1 className='display-3 m-2'>Get Report</h1>
            <div className='m-2'>
                <TextInput labelText="Month:" htmlName="month" value={month} setValue={setMonth}/>
                <TextInput labelText="Year:" htmlName="year" value={year} setValue={setYear}/>
                <ButtonInput onClick={handleClick} buttonText={'Get Report'}/>
                <div>
                    <LogBox value={search}/>
                    <ReportTable table_items={items} />
                    <HistogramChart data={data_for_chart}/>
                </div>
            </div>
        </div>

    );
}

export default ReportMain;