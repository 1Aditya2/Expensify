import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { getDaysArray, USDFormat } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { getTickValues } from '../analytics/helper';

const LineChart = ({ lineData }) => {
    const { expenses, darkMode, baseCurrency } = useSelector(state => state.expenseReducer);
    const { endDate } = lineData || {};
    const periodEnded = endDate === moment().format('YYYY-MM-DD');
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            const tickValues = getTickValues(period, datesArray.length);
            return {
                axisBottom: {
                    format: '%b %d',
                    legend: 'Duration',
                    legendOffset: 45,
                    tickValues,
                    tickRotation: -45, tickPadding: 2
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
                    colors={[
                        'rgb(97, 205, 187)',
                        'rgb(244, 117, 96)',
                        'rgb(210, 40, 100)',
                        'rgb(10, 100, 260)'
                    ]}
                    curve="linear"
                    data={lineChartData}
                    enableSlices="x"
                    enableTouchCrosshair
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
                                fontSize: isMobile ? 10 : 12
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
                    legends={isMobile ? [] : [
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateX: 0,
                            translateY: 70,
                            itemWidth: 80,
                            itemHeight: 0,
                            symbolShape: 'square'
                        }
                    ]}
                    pointSize={5}
                    margin={{
                        top: 10,
                        left: 36,
                        right: 12,
                        bottom: 55
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
                    <p>{USDFormat(avg, baseCurrency)}</p>
                    <p>Daily average</p>
                </div>
                {!periodEnded && <div className='flex text-base items-end flex-col'>
                    <p>{USDFormat(recommended, baseCurrency)}</p>
                    <p>Daily recommended</p>
                </div>}
            </div>
        </div>
    )
}

export default LineChart