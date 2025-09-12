import { ResponsiveLine } from '@nivo/line'
import React, { useMemo } from 'react'
import moment from 'moment';
import { getDaysArray, USDFormat } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { CUSTOM, MONTH, QUARTER, WEEK, YEAR } from '../../utils/constant';

const LineChart = ({ lineData }) => {
    const expenses = useSelector(state => state.expenseReducer.expenses);

    const { axisBottom, lineChartData, avg, recommended } = useMemo(() => {
        const { amount, startDate, endDate, category, period } = lineData;
            const days = moment().diff(moment(startDate), 'days') + 1;
            const datesArray = getDaysArray(startDate, endDate);
            const recommended = (amount / (datesArray.length)).toFixed(0);
            const spent = expenses.filter(({ date, category: expenseCategory }) => (category.includes(expenseCategory))
                && (moment(date).isSameOrAfter(startDate) && moment(date).isSameOrBefore(endDate)))
                .reduce((acc, row) => acc + Number(row.amount), 0);
            const avg = (spent / days).toFixed(0);
            let spentArray = [];
            let forecastArray = [];
            let overspentArray = [];
            let limitArray = [];
            let count = 0;
            for (const each of datesArray) {
                if (moment(each).isAfter(moment(), 'day')) break;
                if (spent > amount) {
                    overspentArray.push({
                        x: each,
                        y: spent
                    });
                    continue;
                }
                spentArray.push({
                    x: each,
                    y: spent
                })
            }
            for (const each of datesArray) {
                if (moment(each).isBefore(moment(), 'day')) continue;
                forecastArray.push({
                    x: each,
                    y: spent + (count * avg)
                })
                count++;
            }
            for (const each of datesArray) {
                limitArray.push({
                    x: each,
                    y: Number(amount)
                })
            }
            let tickValues = '';
            if (period === CUSTOM || period === WEEK) {
                tickValues = `every ${Math.round((datesArray.length) / 5)} days`;
            } else if (period === MONTH) {
                tickValues = `every 1 week`;
            } else if (period === YEAR) {
                tickValues = `every 1 month`;
            } else if (period === QUARTER) {
                tickValues = `every 2 week`;
            }
            return {
                axisBottom: {
                    format: '%b %d',
                    legend: 'Duration',
                    legendOffset: 30,
                    tickValues
                },
                lineChartData: [
                    {
                        data: spentArray,
                        id: 'spent'
                    },
                    {
                        data: forecastArray,
                        id: 'forecast'
                    },
                    {
                        data: limitArray,
                        id: 'limit'
                    },
                    {
                        data: overspentArray,
                        id: 'overspent'
                    }
                ],
                avg,
                recommended
            };
    }, [lineData, expenses]);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-full'>
                <ResponsiveLine
                    axisBottom={axisBottom}
                    axisLeft={{
                        legend: 'Amount',
                        legendOffset: 12
                    }}
                    curve="linear"
                    data={lineChartData}
                    enableSlices="x"
                    enableTouchCrosshair
                    initialHiddenIds={[
                        'cognac'
                    ]}
                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            translateX: 90,
                            itemWidth: 80,
                            itemHeight: 42,
                            symbolShape: 'square'
                        }
                    ]}
                    pointSize={8}
                    margin={{
                        top: 20,
                        left: 36,
                        right: 88,
                        bottom: 25
                    }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                        format: '%Y-%m-%d',
                        precision: 'day',
                        type: 'time',
                        useUTC: false
                    }}
                    yScale={{
                        type: 'linear'
                    }}
                />
            </div>
            <div className='flex justify-between ml-5'>
                <div className='flex text-base flex-col'>
                    <p>{USDFormat(avg)}</p>
                    <p>Daily average</p>
                </div>
                <div className='flex text-base items-end flex-col'>
                    <p>{USDFormat(recommended)}</p>
                    <p>Daily recommended</p>
                </div>
            </div>
        </div>
    )
}

export default LineChart