import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import AddCost from './components/cost_main';

/* global idb */

function GetReport() {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const monthNum = Number(month);
    const yearNum = Number(year);

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    function handleClick() {
        console.log(`Month: ${monthNum}, Year: ${yearNum}`);
        let item = [];
        let objectStore = idb.db.getDB().transaction(["costs"], "readonly").objectStore("costs");
        setSearch(`Results for ${monthNum}.${yearNum}:`);

        let cursorObject = objectStore.openCursor();
        cursorObject.onsuccess = (event) => {
            const cursor = event.target.result;

            if (cursor) {
                const val = cursor.value;
                if (val.month === monthNum && val.year === yearNum) {
                    console.log(`Matching : ${val.sum}, key: ${cursor.key}`);
                    //item.push(<li key={cursor.key}>{val.sum}, {val.category}, {val.description}</li>);

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
            } else {
                console.log("End of list");
                setItems(item);
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
                </div>
            </div>
        </div>

    );
}


function App() {

    // run only once
    useEffect(() => {
        const init = async function() {
            idb.db = await idb.openDB("costsdb", 1);
            console.log(`db:${idb.db}`);
        }
        console.log("Init once.");
        init();
    }, []);

    return (
        <div className="container m-2 d-flex">
            <div className="container">
                <AddCost/>
            </div>
            <div className="container">
                <GetReport/>
            </div>
        </div>
    );
}

export default App;
