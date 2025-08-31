import React, { useMemo, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Select } from '../../components/select/Select'
import { barChartOptions, FOOD, RENT, TRAVEL, UTITLITIES } from '../../utils/constant'
import { useSelector } from 'react-redux'
import moment from 'moment'

const BarChart = () => {
    const expenses = useSelector(state => state.expenseReducer.expenses);
    const [period, setPeriod] = useState('days');

    const barData = useMemo(() => {
        const categories = [FOOD, RENT, UTITLITIES, TRAVEL];
        const formatBasedOnPeriod = period === 'days' ? 'dddd' : period === 'months' ? 'MMMM' : period === 'quarters' ? '[Q]Q YYYY' : 'YYYY';
        const previousDays = Array.from({ length: 5 }, (_, i) =>
            moment().subtract(i, period).format(formatBasedOnPeriod)
        );
        const totals = new Map(previousDays.map(d => [d, 0]));
        for (const exp of expenses) {
            const { category, date: expenseDate, amount } = exp;
            if (categories.includes(category) && totals.has(moment(expenseDate).format(formatBasedOnPeriod))) {
                totals.set(moment(expenseDate).format(formatBasedOnPeriod), totals.get(moment(expenseDate).format(formatBasedOnPeriod)) + Number(amount))
            }
        }
        return previousDays
            .map(d => ({ duration: d, value: totals.get(d) })).reverse();
    }, [period, expenses]);

    const noData = barData.every(({ value }) => value === 0);
    console.log({ barData, noData })

    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>Expenses</p>
                <Select
                    name={'period'}
                    value={period}
                    placeholder={'Select a period'}
                    options={barChartOptions}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>
            {!noData ? <ResponsiveBar
                data={barData}
                key={'amount'}
                colorBy='value'
                indexBy="duration"
                labelSkipWidth={12}
                labelSkipHeight={12}
                axisBottom={{ legend: 'Duration', legendOffset: 42 }}
                axisLeft={{ legend: 'Amount', legendOffset: -50 }}
                margin={{ top: 20, right: 120, bottom: 75, left: 60 }}
            /> :
                <div className='flex items-center justify-center h-full'>
                    <p className='text-center text-slate-500'>Nothing to show in this period</p>
                </div>
            }
        </div>
    )
}

export default BarChart;
