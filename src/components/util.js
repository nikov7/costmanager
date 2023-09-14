const START_YEAR = 2023;
const END_YEAR = 1960;

const generateYears = (start, end) => {
    const years = [];
    for (let i = start; i >= end; i--) {
        years.push({ value: i.toString(), text: i.toString() });
    }
    return years;
}

const generateMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({ value: i.toString(), text: i.toString() });
    }
    return months;
}

const yearOptions = generateYears(START_YEAR, END_YEAR);
const monthOptions = generateMonths();

export const getYearOptions = () => yearOptions;
export const getMonthOptions = () => monthOptions;