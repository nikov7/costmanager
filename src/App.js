import { createContext, useCallback, useEffect, useState } from 'react';
import AddCost from './components/cost_main';
import ReportMain from "./components/report_main";

import Notifier from "./components/notifier";

/* global idb */

// Create a context for notifications
export const NotifyContext = createContext((title, text) => void 0);

function App() {
    // State to manage notifications
    const [notifications, setNotifications] = useState([]);
    const [idVal, setIdVal] = useState(0);

    // Initialize the indexedDB database on the first run
    useEffect(() => {
        const init = async function () {
            idb.db = await idb.openCostsDB("costsdb", 1);
            console.log(`Database: ${idb.db}`);
        }
        console.log("Initialization (runs once).");
        init();
    }, []);

    // Function to create and add a notification
    const createNotification = (title, text) => {
        console.log(`Adding notification ['${title}', '${text}'], NOTIFICATION_ID: ${idVal}`);
        setNotifications(prevArr => [...prevArr, { id: idVal, title: title, text: text }]);
        setIdVal(prevId => prevId + 1);
    }

    // Callback function to remove a notification
    const notifierCallback = useCallback((id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter((item) => item.id !== id)
        );
    }, []);

    return (
        <div className="container m-2 d-flex">
            {/* Display notifications */}
            <Notifier notifications={notifications} notifierCallback={notifierCallback} />
            <NotifyContext.Provider value={createNotification}>
                <div className="container">
                    {/* Render the AddCost component */}
                    <AddCost />
                </div>
                <div className="container">
                    {/* Render the ReportMain component */}
                    <ReportMain />
                </div>
            </NotifyContext.Provider>
        </div>
    );
}

export default App;
