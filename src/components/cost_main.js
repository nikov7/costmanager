/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

import {useState, useContext} from 'react';
import {NumberInput, TextInput, SelectInput, ButtonInput, LogBox } from './inputs';
import { getYearOptions, getMonthOptions } from "./util";
import {NotifyContext} from '../App';

/* global idb */


// Define options for the category dropdown
const categoryOptions = [
    {value: 'FOOD', text:'FOOD'},
    {value: 'HEALTH', text:'HEALTH'},
    {value: 'EDUCATION', text:'EDUCATION'},
    {value: 'TRAVEL', text:'TRAVEL'},
    {value: 'HOUSING', text:'HOUSING'},
    {value: 'OTHER', text:'OTHER'}
];

// define year and month options
const yearOptions = getYearOptions();
const monthOptions = getMonthOptions();

// AddCost component for adding a new cost entry
function AddCost() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');
    const [log, setLog] = useState('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2023);

    const [sumClass, setSumClass] = useState('form-control');
    const [descriptionClass, setDescriptionClass] = useState('form-control');

    // retrieve notification function from context
    const createNotification = useContext(NotifyContext);

    const handleClick = () => {
        // Check for missing inputs (sum & description are required)
        if (sum === '' || description === '') {
            if (sum === '') {
                setSumClass('form-control is-invalid');
            }
            if (description === '') {
                setDescriptionClass('form-control is-invalid');
            }
            setLog('Error: Missing required inputs');
            return;
        }

        // Create a cost object that will be sent to the database
        const cost = {
            sum:+sum, category:category, description:description, month: +month, year: +year
        }

        setLog(`Added: sum:${sum}, category: ${category}, description:${description}, month:${month}, year:${year}`);

        // create a notification on the top right corner
        if (createNotification != null) {
            createNotification('Added', `Sum: ${sum}, Category: ${category}, Description:${description}`);
        }

        // Add the cost object to the database
        idb.db.addCost(cost);
    }

    return (
        <div>
            <div className='border p-10 w-100 mb-3'>
                <h1 className='display-3 m-2'>Add Cost</h1>
                <div className='m-2'>
                    <NumberInput labelText='Sum:' htmlName='sum' value={sum} setValue={setSum} nameClass={sumClass} setNameClass={setSumClass}/>
                    <SelectInput labelText='Category:' htmlName='category' value={category} setValue={setCategory} options={categoryOptions}/>
                    <TextInput labelText='Description:' htmlName='description' value={description} setValue={setDescription} nameClass={descriptionClass} setNameClass={setDescriptionClass}/>
                    <SelectInput labelText='Month:' htmlName='month' value={month} setValue={setMonth} options={monthOptions}/>
                    <SelectInput labelText='Year:' htmlName='year' value={year} setValue={setYear} options={yearOptions}/>
                    <ButtonInput buttonText='Add Cost' onClick={handleClick}/>
                    <LogBox value={log}/>
                </div>
            </div>
        </div>
    );
}

export default AddCost;
