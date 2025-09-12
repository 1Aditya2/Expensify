import React, { useState } from 'react'
import NoBudget from './NoBudget';
import { useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { Plus } from 'lucide-react';
import CreateBudgetModal from './Modal/CreateBudgetModal';
import { isEmpty } from 'lodash';
import SingleBudget from './SingleBudget';
import LineChart from './LineChart';

const Budget = () => {
  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const expenses = useSelector(state => state.expenseReducer.expenses);
  const [openBudget, setOpenBudget] = useState(false);
  console.log({ budgets, expenses })
  return (
    <div className='h-[93%] overflow-auto ml-6 mt-4 flex flex-col items-start gap-4'>
      {!isEmpty(budgets) ? <div className='flex w-full flex-col items-end gap-4'>
        <Button primary onClick={() => setOpenBudget(true)}>
          <Plus size={16} />
          <p className='text-base'>Add Budget</p>
        </Button>
        <div className='grid grid-cols-2 gap-2 w-full'>
          {budgets?.map(({ name, amount, period, startDate, endDate, id, category }, index) => {
            return (
              <div key={`${name}-${index}`} className={budgets.length === 1 ? "col-span-2 shadow-2xl rounded-lg p-4" : "shadow-2xl rounded-lg p-4"}>
                <SingleBudget
                  name={name}
                  amount={amount}
                  period={period}
                  startDate={startDate}
                  endDate={endDate}
                  id={id}
                  category={category}
                />
                <div className={'h-80'}>
                  <LineChart lineData={{ amount, period, startDate, endDate, category }} />
                </div>
              </div>
            );
          })}
        </div>
      </div> : <NoBudget />}
      {openBudget && <CreateBudgetModal
        open={openBudget}
        onClose={() => setOpenBudget(false)} />}
    </div>
  )
}

export default Budget;
