import React, { useMemo, useState } from 'react';
import { Select } from '../../components/select/Select';
import { capsFirst, getDaysArray, getStartandEndDateBasedOnPeriod, USDFormat } from '../../utils/helper';
import { CASH_FLOW, EXPENSES, INCOME, periodOptions, WEEK } from '../../utils/constant';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Tabs from '../../components/Tabs/Tabs';
import { getTickValues, tabsArray } from './helper';
const PeriodToPeriod = () => {
  const [period, setPeriod] = useState(WEEK);
  const { expenses, initialBalance } = useSelector(state => state.expenseReducer);
  const [tab, setTab] = useState(EXPENSES);

  const { lineChartData, axisBottom } = useMemo(() => {
    const { periodStartDate, periodEndDate } = getStartandEndDateBasedOnPeriod(period)
    const datesArray = getDaysArray(periodStartDate, periodEndDate);
    const sortedExpenses = expenses.toSorted((a, b) => moment(a.date).diff(moment(b.date)));
    let cashFlow = [];
    let income = [];
    let expense = [];
    for (const each of datesArray) {
      let cashflowTillDate = initialBalance;
      let incomeTillDate = initialBalance;
      let expenseTillDate = 0;
      for (const expense of sortedExpenses) {
        const { date: expenseDate, amount, category } = expense;
        if (moment(expenseDate).isAfter(moment(each))) {
          break;
        }
        if (category === INCOME) {
          cashflowTillDate = cashflowTillDate + Number(amount);
          incomeTillDate = incomeTillDate + Number(amount);
          continue;
        }
        cashflowTillDate = cashflowTillDate - Number(amount);
        expenseTillDate = expenseTillDate - Number(amount);
      }
      cashFlow.push({
        x: each,
        y: cashflowTillDate
      });
      income.push({
        x: each,
        y: incomeTillDate
      });
      expense.push({
        x: each,
        y: expenseTillDate
      })
    };
    const sortedCashFlow = cashFlow.toSorted((a, b) => a.y - b.y);
    const tickValues = getTickValues(period, datesArray.length);
    return {
      lineChartData: {
        [CASH_FLOW]: {
          data: [{
            data: cashFlow,
            id: 'Cash Flow'
          }],
          min: sortedCashFlow[0].y,
          max: sortedCashFlow[sortedCashFlow.length - 1].y,
          summary: cashFlow[cashFlow.length - 1].y
        },
        [INCOME]: {
          data: [
            {
              data: income,
              id: 'Income'
            }
          ],
          min: income[0].y,
          max: income[income.length - 1].y,
          summary: income[income.length - 1].y
        },
        [EXPENSES]: {
          data: [
            {
              data: expense,
              id: 'Expenses'
            }
          ],
          min: expense[expense.length - 1].y,
          max: expense[0].y,
          summary: expense[expense.length - 1].y
        }
      },
      axisBottom: {
        format: '%b %d',
        legend: 'Duration',
        legendOffset: 30,
        tickValues
      }
    }
  }, [expenses, period, initialBalance]);

  return (
    <div className='shadow-xl max-w-[50%] flex-1 rounded-3xl p-4 flex flex-col gap-1 items-start'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-xl'>{capsFirst('Period to Period Comparison')}</h1>
        <Select
          name={'period'}
          value={period}
          placeholder={'Select a period'}
          options={periodOptions.slice(1)}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </div>
      <p className='text-lg'>{USDFormat(lineChartData[tab].summary)}</p>
      <Tabs
        tabsArray={tabsArray}
        currentTab={tab}
        changeTab={(each) => setTab(each)}
      />
      <div className='w-full h-72'>
        <ResponsiveLine
          axisBottom={axisBottom}
          axisLeft={{
            legend: 'Amount',
            legendOffset: 12
          }}
          colors={[
            'rgb(97, 205, 187)',
            'rgb(210, 40, 100)'
          ]}
          curve="linear"
          data={lineChartData[tab].data}
          enableSlices="x"
          enableTouchCrosshair
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateX: 0,
              itemWidth: 40,
              itemHeight: -100,
              symbolShape: 'square'
            }
          ]}
          pointSize={5}
          margin={{
            top: 10,
            left: 40,
            right: 10,
            bottom: 60
          }}
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false
          }}
          yScale={{
            type: 'linear',
            min: lineChartData[tab].min,
            max: lineChartData[tab].max
          }}
        />
      </div>
    </div>
  );
};

export default PeriodToPeriod;