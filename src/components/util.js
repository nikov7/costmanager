/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

// Constants to define the range of years
const START_YEAR = 2023;
const END_YEAR = 1960;

// Generate an array of years from a given start to end
const generateYears = (start, end) => {
    const years = [];
    for (let i = start; i >= end; i--) {
        years.push({ value: i.toString(), text: i.toString() });
    }
    return years;
}

// Generate an array of months from 1 to 12
const generateMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({ value: i.toString(), text: i.toString() });
    }
    return months;
}

const yearOptions = generateYears(START_YEAR, END_YEAR);
const monthOptions = generateMonths();

// Exporting getter functions to retrieve year and month options
export const getYearOptions = () => yearOptions;
export const getMonthOptions = () => monthOptions;