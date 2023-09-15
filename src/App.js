/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
 */

import {createContext, useCallback, useEffect, useState} from 'react';
import AddCost from './components/cost_main';
import ReportMain from './components/report_main';
import Notifier from './components/notifier';

/* global idb */


export const NotifyContext = createContext((_, __)=>void 0);

function App() {

    const [notifications, setNotifications] = useState([]);
    const [idVal, setIdVal] = useState(0);

    // run only once
    useEffect(() => {
        const init = async function() {
            idb.db = await idb.openCostsDB('costsdb', 1);
        }
        init();
    }, []);

    const createNotification = (title, text) => {
        setNotifications(prevArr => [...prevArr, {id:idVal, title:title, text:text}]);
        setIdVal(prevId => prevId + 1);
    }

    const notifierCallback = useCallback((id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter((item) => item.id !== id)
        );
    }, []);

    return (
        <div className='container m-2 d-flex'>
            <Notifier notifications={notifications} notifierCallback={notifierCallback}/>
            <NotifyContext.Provider value={createNotification}>
                <div className='container'>
                    <AddCost/>
                </div>
                <div className='container'>
                    <ReportMain/>
                </div>
            </NotifyContext.Provider>
        </div>
    );
}

export default App;
