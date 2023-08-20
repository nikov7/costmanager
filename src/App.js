import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import AddCost from './components/cost_main';
import ReportMain from "./components/report_main";

/* global idb */

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
                <ReportMain/>
            </div>
        </div>
    );
}

export default App;
