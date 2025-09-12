import React, { useMemo, useState } from 'react'
import { Select } from '../../components/select/Select'
import { INCOME, periodOptions, TODAY } from '../../utils/constant';
import { formatPercentageChange, USDFormat } from '../../utils/helper';
import { useSelector } from 'react-redux';
import ExpenseCard from '../../components/expenseCard/ExpenseCard';
import { isEmpty } from 'lodash';
import { TrendingDown, TrendingUp } from 'lucide-react';
import PieChart from './PieChart';
import { periodBasedCondition } from './helper';
import BarChart from './BarChart';
import DeleteExpense from '../expenses/Modals/DeleteExpense';
import EditExpenseModal from '../expenses/Modals/EditExpenseModal';
const Dashboard = () => {
  const [period, setPeriod] = useState(TODAY);
  const expenses = useSelector(state => state.expenseReducer.expenses);
  const recentExpenses = expenses.slice(0,5);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});

  const metrics = useMemo(() => {
    const income = expenses.filter(({ category }) => category === INCOME).reduce((acc, row) => Number(row.amount) + acc, 0);
    const outcome = expenses.filter(({ category }) => category !== INCOME).reduce((acc, row) => Number(row.amount) + acc, 0);
    const currBalance = 100 + (income - outcome);
    const currSavings = income - outcome;
    let balancePercent = '';
    let incomePercent = '';
    let outcomePercent = '';
    let savingsPercent = '';
    const prevPeriodIncome = expenses.filter(({ category, date }) => category === INCOME && periodBasedCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
    const prevPeriodOutcome = expenses.filter(({ category, date }) => category !== INCOME && periodBasedCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
    const oldBalance = 100 + prevPeriodIncome - prevPeriodOutcome;
    const oldSaving = prevPeriodIncome - prevPeriodOutcome;
    incomePercent = formatPercentageChange((((income - prevPeriodIncome) / prevPeriodIncome) * 100).toFixed(1));
    outcomePercent = formatPercentageChange((((outcome - prevPeriodOutcome) / prevPeriodOutcome) * 100).toFixed(1));
    balancePercent = formatPercentageChange((((currBalance - oldBalance) / oldBalance) * 100).toFixed(1));
    savingsPercent = formatPercentageChange((((currSavings - oldSaving) / oldSaving) * 100).toFixed(1));
    return [
      {
        label: 'Net Balance',
        value: currBalance,
        perChange: balancePercent
      },
      {
        label: 'Income',
        value: income,
        perChange: incomePercent
      },
      {
        label: 'Expenses',
        value: outcome,
        perChange: outcomePercent
      },
      {
        label: 'Savings',
        value: currSavings,
        perChange: savingsPercent
      }
    ];
  }, [expenses, period]);

  return (
    <div className='h-[93%] overflow-auto ml-6 mt-4 flex flex-col items-start gap-4'>
      <Select
        name={'period'}
        value={period}
        placeholder={'Select a period'}
        options={periodOptions}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <div className='flex items-center justify-between w-full'>
        {metrics?.map(({ label, value, perChange = 0 }, index) => {
          return (
            <div key={`${value}-${index}`} className='flex flex-col items-start gap-2 shadow-lg px-6 py-2 rounded-xl'>
              <p className='text-lg'>{label}</p>
              <div className='flex flex-col gap-1'>
                <p className='font-bold text-xl'>{USDFormat(value)}</p>
                <p className='text-xs flex items-center gap-1 text-slate-500'>{!isEmpty(perChange)
                  ? perChange > 0
                    ? <><TrendingUp size={16} color='green' />{Math.abs(perChange)}% from previous {period === TODAY ? 'day' : period}</>
                    : <><TrendingDown size={16} color='red' />{Math.abs(perChange)}% from previous {period === TODAY ? 'day' : period}</>
                  : ''}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='w-[49%] h-80 rounded-xl px-6 py-3 shadow-lg'>
           <PieChart/>
        </div>
        <div className='w-[49%] h-80 rounded-xl px-6 py-3 shadow-lg'>
           <BarChart/>
        </div>
      </div>
      <div className='flex overflow-hidden flex-col items-start gap-2 w-full'>
      <p className='text-lg'>Recent Transactions</p>
        <div className='overflow-auto h-full flex flex-col items-start gap-2 w-full'>
        {recentExpenses?.map(({ name, category, amount, date, id }, index) => {
          return (
            <ExpenseCard
              key={`${name}-${index}`}
              name={name}
              category={category}
              amount={amount}
              date={date}
              index={index}
              onEditClick={() => {
              setCurrentRowData({ name, category, amount, date, id });
              setEditOpen(true);
            }}
            onDeleteClick={() => {
              setCurrentRowData({ name, category, amount, date, id });
              setDeleteOpen(true)
            }}
            />
          )
        })}
        </div>
      </div>
      {deleteOpen &&
        <DeleteExpense open={deleteOpen} onClose={() => setDeleteOpen(false)} data={currentRowData} />
      }
      {
        editOpen && <EditExpenseModal data={currentRowData} open={editOpen} onClose={() => setEditOpen(false)} />
      }
    </div>
  )
}

export default Dashboard