import {useState} from "react";

/* global idb */

import {NumberInput, TextInput, SelectInput, ButtonInput, LogBox } from "./inputs";

const options = [
    {value: 'FOOD', text:'FOOD'},
    {value: 'HEALTH', text:'HEALTH'},
    {value: 'EDUCATION', text:'EDUCATION'},
    {value: 'TRAVEL', text:'TRAVEL'},
    {value: 'HOUSING', text:'HOUSING'},
    {value: 'OTHER', text:'OTHER'}
];

function AddCost() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [log, setLog] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [sumClass, setSumClass] = useState('form-control');
    const [descriptionClass, setDescriptionClass] = useState('form-control');

    function handleClick() {
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
        idb.db.addCost(cost);
    }

    return (
        <div className="border p-10 w-100 mb-3">
            <h1 className="display-3 m-2">Add Cost</h1>
            <div className="m-2">
                <NumberInput labelText="Sum:" htmlName="sum" value={sum} setValue={setSum} nameClass={sumClass} setNameClass={setSumClass}/>
                <SelectInput labelText="Category:" htmlName="category" value={category} setValue={setCategory} options={options}/>
                <TextInput labelText="Description:" htmlName="description" value={description} setValue={setDescription} nameClass={descriptionClass} setNameClass={setDescriptionClass}/>
                <NumberInput labelText="Month:" htmlName="month" value={month} setValue={setMonth}/>
                <NumberInput labelText="Year:" htmlName="year" value={year} setValue={setYear}/>
                <ButtonInput buttonText="Add" onClick={handleClick}/>
                <LogBox value={log}/>
            </div>
        </div>
    );
}

export default AddCost;