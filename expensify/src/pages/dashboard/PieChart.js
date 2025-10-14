import { ResponsivePie } from '@nivo/pie'
import React, { useEffect, useMemo, useState } from 'react'
import { categoryArray, periodOptions, TODAY } from '../../utils/constant';
import { capsFirst } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { Select } from '../../components/select/Select';
import { chartPeriodCondition } from './helper';
import NothingToShow from '../../components/NothingToShowInPeriod/NothingToShow';
import CurrencyViewer from '../../components/CurrencyViewer/CurrencyViewer';

const PieChart = () => {
    const { expenses, darkMode, baseCurrency = 'INR', viewingCurrency = 'INR', exchangeRate = 1 } = useSelector(state => state.expenseReducer);
    const [period, setPeriod] = useState(TODAY);
    const [isSmallScreen, setIsSmallScreen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

    useEffect(() => {
        const updateScreen = () => setIsSmallScreen(window.innerWidth < 640);
        updateScreen();
        window.addEventListener('resize', updateScreen);
        return () => window.removeEventListener('resize', updateScreen);
    }, []);

    const pieData = useMemo(() => {
        return categoryArray.map(({ each, color }) => {
            const value = expenses.filter(({ category, date }) => category === each
                && chartPeriodCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
            const amtValue = CurrencyViewer({ amount: value, baseCurrency, viewingCurrency, exchangeRate, withoutSymbol: true })
            return {
                id: each,
                label: capsFirst(each),
                value: amtValue,
                color
            }
        })
    }, [period, expenses, baseCurrency, viewingCurrency, exchangeRate]);
    const noData = pieData.every(({ value }) => value === 0);
    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
                <p className='text-lg'>Top Category</p>
                <Select
                    name={'period'}
                    value={period}
                    placeholder={'Select a period'}
                    options={periodOptions}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>
            {!noData ? <>
                <ResponsivePie
                    data={pieData}
                    margin={{
                        ...isSmallScreen ? { top: 20 } : { top: 30 },
                        ...isSmallScreen ? { bottom: 50 } : { bottom: 80 },
                        ...isSmallScreen ? { right: 20 } : { right: 0 },
                        ...isSmallScreen ? { left: 20 } : { left: 0 }
                    }}
                    innerRadius={0}
                    padAngle={0.2}
                    cornerRadius={2}
                    activeOuterRadiusOffset={8}
                    arcLinkLabelsSkipAngle={4}
                    arcLinkLabelsTextColor={!darkMode ? "#333333" : '#ffffff'}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={2}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    theme={{
                        text: {
                            color: darkMode ? '#e5e7eb' : '#374151'
                        },
                        axis: {
                            ticks: {
                                text: {
                                    fill: darkMode ? '#e5e7eb' : '#374151'
                                }
                            },
                            legend: {
                                text: {
                                    fill: darkMode ? '#e5e7eb' : '#374151'
                                }
                            }
                        },
                        legends: {
                            text: {
                                fill: darkMode ? '#e5e7eb' : '#374151'
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
                    legends={isSmallScreen ? [] : [
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateX: 0,
                            translateY: 50,
                            itemWidth: 70,
                            itemHeight: 10,
                            symbolShape: 'square',
                            itemTextColor: !darkMode ? "#333333" : '#ffffff'
                        }
                    ]}
                />
            </> : <NothingToShow />
            }
        </div>
    )
}

export default PieChart