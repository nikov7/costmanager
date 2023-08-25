import {useState, useContext} from "react";

/* global idb */

import {NumberInput, TextInput, SelectInput, ButtonInput, LogBox } from "./inputs";

import {NotifyContext} from "../App";
import GenericButton from "./button";

const categoryOptions = [
    {value: 'FOOD', text:'FOOD'},
    {value: 'HEALTH', text:'HEALTH'},
    {value: 'EDUCATION', text:'EDUCATION'},
    {value: 'TRAVEL', text:'TRAVEL'},
    {value: 'HOUSING', text:'HOUSING'},
    {value: 'OTHER', text:'OTHER'}
];

let yearOptions = [];

for (let currYear = 2023; currYear >= 1960; currYear--) {
    yearOptions.push({ value: currYear.toString(), text: currYear.toString() });
}

let monthOptions = [];

for (let currMonth = 1; currMonth <= 12; currMonth++) {
    monthOptions.push({ value: currMonth.toString(), text: currMonth.toString() });
}

function AddCost() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [log, setLog] = useState('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2023);

    const [sumClass, setSumClass] = useState('form-control');
    const [descriptionClass, setDescriptionClass] = useState('form-control');


    const createNotification = useContext(NotifyContext);


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
            sum:+sum, category:category, description:description
        }

        // Month and year are optional
        if (month !== '' && year !== '') {
            //console.log("Both month and year are good");
            cost.month = +month;
            cost.year = +year;
            setLog(`Added: sum:${sum}, category: ${category}, description:${description}, month:${month}, year:${year}`);
        }

        if (createNotification != null) {
            createNotification("Added", `Sum: ${sum}, Category: ${category}, Description:${description}`);
        }

        idb.db.addCost(cost);
    }

    return (
        <div>
            <div className="border p-10 w-100 mb-3">

                <h1 className="display-3 m-2">Add Cost</h1>
                <div className="m-2">
                    <NumberInput labelText="Sum:" htmlName="sum" value={sum} setValue={setSum} nameClass={sumClass} setNameClass={setSumClass}/>
                    <SelectInput labelText="Category:" htmlName="category" value={category} setValue={setCategory} options={categoryOptions}/>
                    <TextInput labelText="Description:" htmlName="description" value={description} setValue={setDescription} nameClass={descriptionClass} setNameClass={setDescriptionClass}/>
                    <SelectInput labelText="Month:" htmlName="month" value={month} setValue={setMonth} options={monthOptions}/>
                    <SelectInput labelText="Year:" htmlName="year" value={year} setValue={setYear} options={yearOptions}/>
                    <GenericButton buttonText="Add Cost" onClick={handleClick}/>
                    <LogBox value={log}/>
                </div>
            </div>
        </div>
    );
}

export default AddCost;