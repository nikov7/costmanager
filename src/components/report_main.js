import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import HistogramChart from "./chart";

/* global idb */
// costCategories = ["FOOD", "HEALTH", "EDUCATION", "TRAVEL", "HOUSING", "OTHER"]

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

    function shouldReportItem(cursor_val){
        const onlyMonth = cursor_val.month === monthNum && yearNum === 0
        const onlyYear = cursor_val.year === yearNum && monthNum === 0
        const emptyQuery = !monthNum && !yearNum
        const specificQuery = cursor_val.year === yearNum && cursor_val.month === monthNum
        return onlyYear || onlyMonth || emptyQuery || specificQuery
    }

    function getSummaryTitle(){
        if (!monthNum && !yearNum) return "'Cost Summary' for all history:"
        if (yearNum && !monthNum) return `'Cost Summary' for Year: ${yearNum}`
        if (monthNum && !yearNum) return `'Cost Summary' for Month: ${monthNum}`
        if (monthNum && yearNum) return `'Cost Summary' for Month: ${monthNum} and Year: ${yearNum}`
    }

    function handleClick() {
        console.log(`Month: ${monthNum}, Year: ${yearNum}`);
        let item = [];
        let chartData = [
            { sum: 0, category: 'FOOD' },
            { sum: 0, category: 'HEALTH' },
            { sum: 0, category: 'EDUCATION' },
            { sum: 0, category: 'TRAVEL' },
            { sum: 0, category: 'HOUSING' },
            { sum: 0, category: 'OTHER' },
        ];
        let objectStore = idb.db.getDB().transaction(["costs"], "readonly").objectStore("costs");
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
                            <th scope="row">{cursor.key}</th>
                            <td>{val.sum}</td>
                            <td>{val.category}</td>
                            <td>{val.description}</td>
                        </tr>
                    );
                }
                cursor.continue();
            }
            else {
                if (item.length) {
                    setSearch(getSummaryTitle());
                    setItems(item);
                    console.log(chartData)
                    setDataForChart(chartData);
                }
                else{
                    setSearch(`No Costs yet for Month: ${monthNum} and Year: ${yearNum}, Please add costs!`);
                }

            }
        };
    }
    return (
        <div className="border p-10 w-100">
            <h1 className="display-3 m-2">Get Report</h1>
            <div className="m-2">
                <div className="mb-3 w-50">
                    <label htmlFor="month" className="form-label">Month:</label>
                    <input type="text" className="form-control" name="month" id="month"
                           value={month}
                           onChange={e=> {
                               let val = e.target.value.replace(/\D/g, "");
                               setMonth(val)
                           }}
                    />
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="year" className="form-label">Year:</label>
                    <input type="text" className="form-control" name="year" id="year"
                           value={year}
                           onChange={e=> {
                               let val = e.target.value.replace(/\D/g, "");
                               setYear(val)
                           }}
                    />
                </div>
                <div className="mb-3">
                    {/*<AddButton/>*/}
                    <button className="btn btn-primary" onClick={handleClick}>
                        Search
                    </button>
                </div>
                <div className="mb-3">
                    <div className="mb-1">
                        <p className="font-monospace">{search}</p>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Sum</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </table>
                    <HistogramChart data={data_for_chart}/>
                </div>
            </div>
        </div>

    );
}

export default ReportMain;