import React, { useEffect, useMemo, useState } from 'react'
import ExpenseCard from '../../components/expenseCard/ExpenseCard'
import { Select } from '../../components/select/Select'
import { DateSelector } from '../../components/dateSelector/DateSelector'
import { Input } from '../../components/input/Input'
import DeleteExpense from './Modals/DeleteExpense'
import EditExpenseModal from './Modals/EditExpenseModal'
import { Button } from '../../components/Button/Button'
import { Plus, RotateCcw } from 'lucide-react'
import AddExpenseModal from './Modals/AddExpenseModal'
import { useSelector } from 'react-redux'
import { expenseCategories, todayDate } from '../../utils/constant'
import { isEmpty } from 'lodash'
import { initExpenseFilters } from './constant'

const Expenses = () => {
  const expenses = useSelector(state => state.expenseReducer.expenses);

  const [filters, setFilters] = useState(initExpenseFilters);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const max = todayDate();

  const filteredExpenses = useMemo(() => {
    let filteredData = expenses || [];
    if (!isEmpty(filters.category)) {
      filteredData = filteredData.filter(({ category: expenseCategory }) => expenseCategory === filters.category);
    }
    if (!isEmpty(filters.date)) {
      filteredData = filteredData.filter(({ date: expenseDate = '' }) => expenseDate === filters.date);
    }
    if (!isEmpty(filters.search)) {
      filteredData = filteredData.filter(
        ({
        name: expenseName = '',
        amount: expenseAmount = '' }) =>
          expenseName.toLowerCase().includes(filters.search.toLowerCase()) || expenseAmount === filters.search);
    }
    return filteredData
  }, [expenses, filters]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className='h-[93%] ml-6 mt-4 flex flex-col items-start gap-4'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-4 items-center'>
          <Select
            name={'category'}
            placeholder="Select category"
            value={filters.category}
            onChange={handleFilters}
            options={expenseCategories}
          />
          <DateSelector
            placeholder="YYYY-MM-DD"
            name='date'
            value={filters.date}
            onChange={handleFilters}
            max={max}
          />
          <Input
            name="search"
            value={filters.search}
            onChange={handleFilters}
            placeholder="search by amount or name"
          />
          <Button className='ml-6' onClick={() => setFilters(initExpenseFilters)}>
            <RotateCcw size={16} />
          </Button>
        </div>
        <Button primary onClick={() => setAddOpen(true)}>
          <Plus size={16} />
          <p className='text-base'>Add Expense</p>
        </Button>
      </div>
      <div className='overflow-auto h-full flex flex-col items-start gap-4 w-full'>
        {filteredExpenses?.map(({ name, category, amount, date, id }, index) => {
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
      {deleteOpen &&
        <DeleteExpense open={deleteOpen} onClose={() => setDeleteOpen(false)} data={currentRowData} />
      }
      {
        editOpen && <EditExpenseModal data={currentRowData} open={editOpen} onClose={() => setEditOpen(false)} />
      }
      {
        addOpen && <AddExpenseModal open={addOpen} onClose={() => setAddOpen(false)} />
      }
    </div>
  )
}

export default Expenses