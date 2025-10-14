import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useMemo, useState } from 'react';
import { capsFirst, getDaysArray, getStartandEndDateBasedOnPeriod } from '../../utils/helper';
import { Select } from '../../components/select/Select';
import { INCOME, periodOptions, WEEK } from '../../utils/constant';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getTickValues } from './helper';
import CurrencyViewer from '../../components/CurrencyViewer/CurrencyViewer';
const BalanceTrend = () => {
    const [period, setPeriod] = useState(WEEK);
    const { expenses, initialBalance, darkMode, baseCurrency, viewingCurrency, exchangeRate, currencyLoader = false } = useSelector((state) => state.expenseReducer);
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data, axisBottom, balance, min, max } = useMemo(() => {
        const { periodStartDate, periodEndDate } = getStartandEndDateBasedOnPeriod(period)
        const datesArray = getDaysArray(periodStartDate, periodEndDate);
        const sortedExpenses = expenses.toSorted((a, b) => moment(a.date).diff(moment(b.date)));
        let balanceTrend = [];
        for (const each of datesArray) {
            let balanceTillDate = initialBalance;
            for (const expense of sortedExpenses) {
                const { date: expenseDate, amount, category } = expense;
                if (moment(expenseDate).isAfter(moment(each))) {
                    break;
                }
                if (category === INCOME) {
                    balanceTillDate = balanceTillDate + Number(amount);
                    continue;
                }
                balanceTillDate = balanceTillDate - Number(amount);
            }
            const currencyBalance = CurrencyViewer({ withoutSymbol: true, amount: balanceTillDate, baseCurrency, viewingCurrency, exchangeRate });
            balanceTrend.push({
                x: each,
                y: currencyBalance
            });
        };
        const sortedBalances = balanceTrend.toSorted((a, b) => a.y - b.y);
        const tickValues = getTickValues(period, datesArray.length);
        return {
            data: [{
                data: balanceTrend,
                id: 'positive'
            }],
            axisBottom: {
                format: '%b %d',
                legend: 'Duration',
                legendOffset: 30,
                tickValues
            },
            balance: balanceTrend[balanceTrend.length - 1].y,
            min: sortedBalances[0].y,
            max: sortedBalances[sortedBalances.length - 1].y
        };
    }, [period, expenses, initialBalance, baseCurrency, viewingCurrency, exchangeRate]);

    return (
        <div className='shadow-lg dark:shadow-2xl flex-1 rounded-3xl p-3 flex flex-col gap-1 items-start'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='text-xl'>{capsFirst('Balance Trend')}</h1>
                <Select
                    name={'period'}
                    value={period}
                    placeholder={'Select a period'}
                    options={periodOptions.slice(1)}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>
            <p className='text-lg'><CurrencyViewer loader={currencyLoader} baseCurrency={viewingCurrency} viewingCurrency={viewingCurrency} amount={balance}/></p>
            <div className='w-full h-64'>
                <ResponsiveLine
                    animate
                    areaOpacity={0.2}
                    colors={[
                        'rgb(244, 117, 96)'
                    ]}
                    axisBottom={axisBottom}
                    axisLeft={{
                        legend: 'Amount',
                        legendOffset: 12
                    }}
                    crosshairType="cross"
                    curve="monotoneX"
                    data={data}
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
                    enableTouchCrosshair
                    margin={{
                        bottom: 50,
                        left: 45,
                        right: 20,
                        top: 20
                    }}
                    pointSize={5}
                    useMesh
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                        format: '%Y-%m-%d',
                        precision: 'day',
                        type: 'time',
                        useUTC: false
                    }}
                    yScale={{
                        min: min,
                        max: max,
                        stacked: false,
                        type: 'linear'
                    }}
                />
            </div>
        </div>
    );
};

export default BalanceTrend;