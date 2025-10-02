import React, { useEffect, useMemo, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Select } from '../../components/select/Select'
import { barChartOptions, FOOD, RENT, TRAVEL, UTITLITIES } from '../../utils/constant'
import { useSelector } from 'react-redux'
import moment from 'moment'
import NothingToShow from '../../components/NothingToShowInPeriod/NothingToShow'

const BarChart = () => {
    const { expenses, darkMode } = useSelector(state => state.expenseReducer);
    const [period, setPeriod] = useState('days');
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
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
                axisBottom={{ legend: 'Duration', legendOffset: 42, tickRotation: isMobile ? -45 : 0, tickPadding: isMobile ? 2 : 5 }}
                axisLeft={{ legend: 'Amount', legendOffset: -50 }}
                margin={{ top: 20, right: 10, bottom: isMobile ? 95 : 75, left: 60 }}
                theme={{
                    text: {
                        color: darkMode ? '#e5e7eb' : '#374151'
                    },
                    axis: {
                        ticks: {
                            text: {
                                fill: darkMode ? '#e5e7eb' : '#374151',
                                fontSize: isMobile ? 10 : 12
                            }
                        },
                        legend: {
                            text: {
                                fill: darkMode ? '#e5e7eb' : '#374151',
                                fontSize: isMobile ? 10 : 12
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: darkMode ? '#e5e7eb' : '#374151',
                            fontSize: isMobile ? 10 : 12,
                        }
                    },
                    tooltip: {
                        container: {
                            background: darkMode ? '#111827' : '#ffffff',
                            color: darkMode ? '#e5e7eb' : '#111827',
                            borderRadius: 6,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        }
                    }
                }}
            /> :
            <NothingToShow/>
            }
        </div>
    )
}

export default BarChart;
