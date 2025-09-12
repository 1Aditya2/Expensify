import moment from "moment";
import { defaultDateFormat, MONTH, QUARTER, WEEK, YEAR } from "./constant";

export const capsFirst = (string = '') => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const delay = ms => new Promise(res => setTimeout(res, ms));

export function generateId() {
    return Math.floor(Math.random() * 9000) + 1000; // 1000–9999
}

export const USDFormat = (amount) => {
    const formatUSD = new Intl.NumberFormat('en-US');
    return amount >= 0 ? `$${formatUSD.format(amount)}` : `-$${formatUSD.format(-amount)}`
}
export const formatPercentageChange = (input) => {
    if (input === 'NaN' || input === 'Infinity' || input === '0.0' || input === '-Infinity') {
        return ''
    }
    return input;
}
export const getDaysArray = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = [];

    let current = start.clone();
    while (current.isSameOrBefore(end, "day")) {
        days.push(current.format("YYYY-MM-DD")); // push in your desired format
        current.add(1, "day");
    }

    return days;
}
export const getStartandEndDateBasedOnPeriod = (period) => {
    let periodStartDate;
    let periodEndDate;
    if (period === WEEK) {
        periodStartDate = moment().startOf('week').format(defaultDateFormat);
        periodEndDate = moment().endOf('week').format(defaultDateFormat)
    } else if (period === MONTH) {
        periodStartDate = moment().startOf('month').format(defaultDateFormat);
        periodEndDate = moment().endOf('month').format(defaultDateFormat)
    } else if (period === YEAR) {
        periodStartDate = moment().startOf('year').format(defaultDateFormat);
        periodEndDate = moment().endOf('year').format(defaultDateFormat)
    } else if (period === QUARTER) {
        periodStartDate = moment().startOf('quarter').format(defaultDateFormat);
        periodEndDate = moment().endOf('quarter').format(defaultDateFormat)
    }
    return {
        periodStartDate,
        periodEndDate
    };
};