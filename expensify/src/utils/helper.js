import moment from "moment";
import { CUSTOM, defaultDateFormat, TODAY } from "./constant";

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
        days.push(current.format("YYYY-MM-DD"));
        current.add(1, "day");
    }

    return days;
}
export const getStartandEndDateBasedOnPeriod = (period) => {
    let periodStartDate;
    let periodEndDate;
    if (period === CUSTOM) {
        return {
            periodStartDate,
            periodEndDate
        };
    }
    if (period !== TODAY) {
        periodStartDate = moment().startOf(period).format(defaultDateFormat);
        periodEndDate = moment().endOf(period).format(defaultDateFormat)
    }
    return {
        periodStartDate,
        periodEndDate
    };
};