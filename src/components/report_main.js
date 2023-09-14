import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HistogramChart from './chart';
import ReportTable from './table';
import {LogBox, ButtonInput, SelectInput} from './inputs';
import { getYearOptions, getMonthOptions } from "./util";

/* global idb */


const yearOptions = getYearOptions();
const monthOptions = getMonthOptions();

function ReportMain() {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const monthNum = Number(month);
    const yearNum = Number(year);

    const [items, setItems] = useState([]);
    const [data_for_chart, setDataForChart] = useState([]);
    const [search, setSearch] = useState('');
    //const [emptyVal, setEmptyVal] = useState('');


    function clearReportItems(){
        setItems([])
        setDataForChart([])
    }

    function shouldReportItem(cursor_val){
        const onlyMonth = cursor_val.month === monthNum && yearNum === 0
        const onlyYear = cursor_val.year === yearNum && monthNum === 0
        const emptyQuery = !monthNum && !yearNum
        const specificQuery = cursor_val.year === yearNum && cursor_val.month === monthNum
        return onlyYear || onlyMonth || emptyQuery || specificQuery
    }

    function getSummaryTitle(){
        if (!monthNum && !yearNum) return `'Cost Summary' for all history:`
        if (yearNum && !monthNum) return `'Cost Summary' for Year: ${yearNum}`
        if (monthNum && !yearNum) return `'Cost Summary' for Month: ${monthNum}`
        if (monthNum && yearNum) return `'Cost Summary' for Month: ${monthNum} and Year: ${yearNum}`
    }

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
        let objectStore = idb.db.getDB().transaction(['costs'], 'readonly').objectStore('costs');
        let cursorObject = objectStore.openCursor();
        clearReportItems()
        cursorObject.onsuccess = (event) => {
            const cursor = event.target.result;
            console.log(typeof monthNum, typeof yearNum)
            if (cursor) {
                const val = cursor.value;
                if (shouldReportItem(val)) {
                    console.log(`Matching : ${val.sum}, key: ${cursor.key}`);
                    for (const chartItem of chartData) {
                        if (chartItem.category === val.category) {
                            chartItem.sum += val.sum;
                        }
                    }
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
                cursor.continue();
            }
            else {
                if (item.length) {
                    setSearch(getSummaryTitle());
                    setItems(item);
                    setDataForChart(chartData);
                }
                else{
                    setSearch(`No Costs yet for the dates you mentioned`);
                }

            }
        };
    }
    return (
        <div className='border p-10 w-100'>
            <h1 className='display-3 m-2'>Get Report</h1>
            <div className='m-2'>
                <SelectInput labelText='Month:' htmlName='month' value={month} setValue={setMonth} options={monthOptions}/>
                <SelectInput labelText='Year:' htmlName='year' value={year} setValue={setYear} options={yearOptions}/>
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