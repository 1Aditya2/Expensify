import React, { useMemo, useState } from 'react'
import { Select } from '../../components/select/Select'
import { INCOME, periodOptions, TODAY } from '../../utils/constant';
import { capsFirst, formatPercentageChange } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseCard from '../../components/expenseCard/ExpenseCard';
import { isEmpty } from 'lodash';
import { Edit, TrendingDown, TrendingUp } from 'lucide-react';
import PieChart from './PieChart';
import { periodBasedCondition } from './helper';
import BarChart from './BarChart';
import DeleteExpense from '../expenses/Modals/DeleteExpense';
import EditExpenseModal from '../expenses/Modals/EditExpenseModal';
import NoExpenses from '../expenses/NoExpenses';
import InitBalanceModal from './InitBalanceModal';
import { setInitBalanceFlag } from '../../redux/expenseSlice';
import CurrencyViewer from '../../components/CurrencyViewer/CurrencyViewer';
const Dashboard = () => {
  const [period, setPeriod] = useState(TODAY);
  const {
    expenses,
    initialBalance,
    initBalanceFlag = true,
    baseCurrency = 'INR',
    currencyLoader = false,
    viewingCurrency = 'INR',
    exchangeRate = 1
  } = useSelector(state => state.expenseReducer);
  const dispatch = useDispatch();
  const recentExpenses = expenses.slice(0, 4)?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [openInitBalance, setOpenInitBalance] = useState(initBalanceFlag);
  const [currentRowData, setCurrentRowData] = useState({});

  const metrics = useMemo(() => {
    const income = expenses.filter(({ category }) => category === INCOME).reduce((acc, row) => Number(row.amount) + acc, 0);
    const outcome = expenses.filter(({ category }) => category !== INCOME).reduce((acc, row) => Number(row.amount) + acc, 0);
    const currBalance = initialBalance + (income - outcome);
    const currSavings = income - outcome;
    const prevPeriodIncome = expenses.filter(({ category, date }) => category === INCOME
      && periodBasedCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
    const prevPeriodOutcome = expenses.filter(({ category, date }) => category !== INCOME
      && periodBasedCondition(period, date)).reduce((acc, row) => Number(row.amount) + acc, 0);
    const oldBalance = initialBalance + prevPeriodIncome - prevPeriodOutcome;
    const oldSaving = prevPeriodIncome - prevPeriodOutcome;
    let incomePercent = formatPercentageChange((((income - prevPeriodIncome) / Math.abs(prevPeriodIncome)) * 100).toFixed(1));
    let outcomePercent = formatPercentageChange((((outcome - prevPeriodOutcome) / Math.abs(prevPeriodOutcome)) * 100).toFixed(1));
    let balancePercent = formatPercentageChange((((currBalance - oldBalance) / Math.abs(oldBalance)) * 100).toFixed(1));
    let savingsPercent = formatPercentageChange((((currSavings - oldSaving) / Math.abs(oldSaving)) * 100).toFixed(1));
    return [
      {
        label: 'Initial balance',
        value: initialBalance,
        icon: <Edit size={16} className='cursor-pointer' />
      },
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
  }, [expenses, period, initialBalance]);

  return (
    <div className='h-full overflow-auto ml-6 mt-4 flex flex-col items-start gap-4'>
        <Select
          name={'period'}
          value={period}
          placeholder={'Select a period'}
          options={periodOptions}
          onChange={(e) => setPeriod(e.target.value)}
        />
      <div className='flex items-center justify-between w-full flex-wrap gap-3'>
        {metrics?.map(({ label, value, perChange = 0, icon }, index) => {
          return (
            <div key={`${value}-${index}`} className='flex flex-col items-start gap-2 shadow-lg dark:shadow-2xl px-6 py-2 rounded-xl max-md:w-full'>
              <div className='flex items-center gap-2'>
                <p className='text-lg'>{capsFirst(label)}</p>
                {icon && <div onClick={() => setOpenInitBalance(true)}>{icon}</div>}
              </div>
              <div className='flex flex-col gap-1'>
                  <p className='font-bold text-xl'><CurrencyViewer
                    amount={value}
                    loader={currencyLoader}
                    exchangeRate={exchangeRate}
                    viewingCurrency={viewingCurrency}
                    baseCurrency={baseCurrency}/>
                  </p>
                <p className='text-xs flex items-center gap-1 text-slate-500 dark:text-white'>{!isEmpty(perChange)
                  ? perChange > 0
                    ? <><TrendingUp size={16} color='green' />{Math.abs(perChange)}% from previous {period === TODAY ? 'day' : period}</>
                    : <><TrendingDown size={16} color='red' />{Math.abs(perChange)}% from previous {period === TODAY ? 'day' : period}</>
                  : ''}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex items-center justify-between w-full max-lg:flex-col'>
        <div className='w-[49%] h-80 rounded-xl p-3 shadow-lg max-lg:w-full dark:shadow-2xl'>
          <PieChart />
        </div>
        <div className='w-[49%] h-80 rounded-xl p-3 shadow-lg max-lg:w-full dark:shadow-2xl'>
          <BarChart />
        </div>
      </div>
      <div className='flex overflow-hidden flex-col items-start gap-2 w-full'>
        <p className='text-lg'>Recent Transactions</p>
        <div className='overflow-auto h-[20vh] flex flex-col items-start gap-2 w-full'>
          {!isEmpty(recentExpenses) ? recentExpenses?.map(({ name, category, amount, date, id }, index) => {
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
          }) : <NoExpenses />}
        </div>
      </div>
      {deleteOpen &&
        <DeleteExpense open={deleteOpen} onClose={() => setDeleteOpen(false)} data={currentRowData} />
      }
      {
        editOpen && <EditExpenseModal data={currentRowData} open={editOpen} onClose={() => setEditOpen(false)} />
      }
      {
        openInitBalance && <InitBalanceModal open={openInitBalance} onClose={() => {
          setOpenInitBalance(false);
          if (initBalanceFlag) {
            dispatch(setInitBalanceFlag(false));
          }
        }} />
      }
    </div>
  )
}

export default Dashboard