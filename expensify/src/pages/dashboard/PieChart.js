import { ResponsivePie } from '@nivo/pie'
import React, { useMemo, useState } from 'react'
import { categoryArray, periodOptions, TODAY } from '../../utils/constant';
import { capsFirst } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { Select } from '../../components/select/Select';
import { chartPeriodCondition } from './helper';
import NothingToShow from '../../components/NothingToShowInPeriod/NothingToShow';

const PieChart = () => {
    const expenses = useSelector(state => state.expenseReducer.expenses);
    const [period, setPeriod] = useState(TODAY);

    const pieData = useMemo(() => {
        return categoryArray.map(({ each, color }) => {
            const value = expenses.filter(({ category, date }) => category === each
                && chartPeriodCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
            return {
                id: each,
                label: capsFirst(each),
                value,
                color
            }
        })
    }, [period, expenses]);

    const noData = pieData.every(({ value }) => value === 0);

    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>Top Category</p>
                <Select
                    name={'period'}
                    value={period}
                    placeholder={'Select a period'}
                    options={periodOptions}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>
            {!noData ? <ResponsivePie
                data={pieData}
                margin={{ top: 20, bottom: 60, right: 100 }}
                innerRadius={0}
                padAngle={0.2}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                arcLinkLabelsSkipAngle={4}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={4}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        translateX: 0,
                        translateY: 0,
                        itemWidth: 10,
                        itemHeight: 45,
                        symbolShape: 'square'
                    }
                ]}
            /> : <NothingToShow/>
            }
        </div>
    )
}

export default PieChart