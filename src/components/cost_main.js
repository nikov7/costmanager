import { useState, useContext } from "react";

/* global idb */ // Assuming idb is a global variable or module.

import {
    NumberInput,
    TextInput,
    SelectInput,
    LogBox
} from "./inputs";
import { NotifyContext } from "../App";
import GenericButton from "./button";

// Define options for the "Category," "Month," and "Year" select inputs
const categoryOptions = [
    { value: 'FOOD', text: 'FOOD' },
    { value: 'HEALTH', text: 'HEALTH' },
    { value: 'EDUCATION', text: 'EDUCATION' },
    { value: 'TRAVEL', text: 'TRAVEL' },
    { value: 'HOUSING', text: 'HOUSING' },
    { value: 'OTHER', text: 'OTHER' }
];

let yearOptions = [];

// Generate a list of year options from 1960 to the current year (2023)
for (let currYear = 2023; currYear >= 1960; currYear--) {
    yearOptions.push({ value: currYear.toString(), text: currYear.toString() });
}

let monthOptions = [];

// Generate a list of month options from 1 to 12
for (let currMonth = 1; currMonth <= 12; currMonth++) {
    monthOptions.push({ value: currMonth.toString(), text: currMonth.toString() });
}

// AddCost component for adding cost entries
function AddCost() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [log, setLog] = useState('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2023);

    const [sumClass, setSumClass] = useState('form-control');
    const [descriptionClass, setDescriptionClass] = useState('form-control');

    // Access the createNotification function from the context
    const createNotification = useContext(NotifyContext);

    // Function to handle the "Add Cost" button click
    const handleClick = () => {
        // Check for missing inputs (sum & description are required)
        if (sum === '' || description === '') {
            if (sum === '') {
                setSumClass(`form-control is-invalid`);
            }
            if (description === '') {
                setDescriptionClass(`form-control is-invalid`);
            }
            setLog(`Error: Missing required inputs`);
            return;
        }

        setLog(`Added: sum:${sum}, category: ${category}, description:${description}`);
        const cost = {
            sum: +sum, category: category, description: description
        }

        // Month and year are optional
        if (month !== '' && year !== '') {
            cost.month = +month;
            cost.year = +year;
            setLog(`Added: sum:${sum}, category: ${category}, description:${description}, month:${month}, year:${year}`);
        }

        // Call the createNotification function if available
        if (createNotification != null) {
            createNotification("Added", `Sum: ${sum}, Category: ${category}, Description:${description}`);
        }

        // Add the cost entry to the database (assuming idb.db is available)
        idb.db.addCost(cost);
    }

    return (
        <div>
            <div className="border p-10 w-100 mb-3">
                <h1 className="display-3 m-2">Add Cost</h1>
                <div className="m-2">
                    <NumberInput labelText="Sum:" htmlName="sum" value={sum} setValue={setSum} nameClass={sumClass} setNameClass={setSumClass} />
                    <SelectInput labelText="Category:" htmlName="category" value={category} setValue={setCategory} options={categoryOptions} />
                    <TextInput labelText="Description:" htmlName="description" value={description} setValue={setDescription} nameClass={descriptionClass} setNameClass={setDescriptionClass} />
                    <SelectInput labelText="Month:" htmlName="month" value={month} setValue={setMonth} options={monthOptions} />
                    <SelectInput labelText="Year:" htmlName="year" value={year} setValue={setYear} options={yearOptions} />
                    <GenericButton buttonText="Add Cost" onClick={handleClick} />
                    <LogBox value={log} />
                </div>
            </div>
        </div>
    );
}

export default AddCost;
