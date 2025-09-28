import { CASH_FLOW, CUSTOM, EXPENSES, INCOME, MONTH, QUARTER, WEEK, YEAR } from "../../utils/constant";

export const getTickValues = (period, datesLength) => {
    let tickValues = ''
    if (period === WEEK || period === CUSTOM) {
        tickValues = `every ${Math.round((datesLength) / 5)} days`;
    } else if (period === MONTH) {
        tickValues = `every 1 week`;
    } else if (period === YEAR) {
        tickValues = `every 1 month`;
    } else if (period === QUARTER) {
        tickValues = `every 2 week`;
    } else {
        tickValues = `every 1 days`;
    }
    return tickValues;
};

export const tabsArray = [
    {
        label: 'Expenses',
        value: EXPENSES
    },
    {
        label: 'Cash Flow',
        value: CASH_FLOW
    },
    {
        label: 'Income',
        value: INCOME
    }
];
