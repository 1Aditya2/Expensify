import React, { useMemo, useState } from 'react'
import ExpenseCard from '../../components/expenseCard/ExpenseCard'
import { Select } from '../../components/select/Select'
import { DateSelector } from '../../components/dateSelector/DateSelector'
import { Input } from '../../components/input/Input'
import DeleteExpense from './Modals/DeleteExpense'
import EditExpenseModal from './Modals/EditExpenseModal'
import { Button } from '../../components/Button/Button'
import { Plus, RotateCcw } from 'lucide-react'
import AddExpenseModal from './Modals/AddExpenseModal'
import { useDispatch, useSelector } from 'react-redux'
import { defaultDateFormat, expenseCategories } from '../../utils/constant'
import { isEmpty } from 'lodash'
import { initExpenseFilters } from './constant'
import { bulkDeleteExpenses } from '../../redux/expenseSlice'
import moment from 'moment'
import NoExpenses from './NoExpenses'

const Expenses = () => {
  const expenses = useSelector(state => state.expenseReducer.expenses);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(initExpenseFilters);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const [checked, setChecked] = useState({});

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
          expenseName.toLowerCase().includes(filters.search.toLowerCase()) || expenseAmount.includes(filters.search))
    }
    return filteredData;
  }, [expenses, filters]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }
  const showBulkDelete = JSON.stringify(checked).indexOf('true') !== -1;

  return (
    <div className='h-[93%] ml-6 mt-4 flex flex-col items-start gap-4'>
      <div className='flex justify-between items-center w-full flex-wrap gap-2'>
        <div className='flex gap-4 items-center flex-wrap'>
          <Select
            name={'category'}
            placeholder="Select category"
            value={filters.category}
            onChange={handleFilters}
            options={expenseCategories}
            className='max-md:w-full'
          />
          <DateSelector
            placeholder="YYYY-MM-DD"
            name='date'
            value={filters.date}
            onChange={handleFilters}
            className='max-md:w-full'
            max={moment().format(defaultDateFormat)}
          />
          <Input
            name="search"
            value={filters.search}
            onChange={handleFilters}
            className='max-md:w-full'
            placeholder="search by amount or name"
          />
          {showBulkDelete && <Button className='max-md:w-full' onClick={() => {
            dispatch(bulkDeleteExpenses(checked));
            setChecked({});
          }}>
            Delete selected
          </Button>}
          <Button className='max-md:w-full max-md:justify-center max-md:flex' onClick={() => setFilters(initExpenseFilters)}>
            <RotateCcw size={16} />
          </Button>
        </div>
        <Button className='max-md:w-full max-md:justify-center max-md:flex' primary onClick={() => setAddOpen(true)}>
          <Plus size={16} />
          <p className='text-base'>Add Expense</p>
        </Button>
      </div>
      <div className='overflow-auto h-full flex flex-col items-start gap-4 w-full'>
        {
          !isEmpty(filteredExpenses)
            ? filteredExpenses?.map(({ name, category, amount, date, id }, index) => {
              return (
                <ExpenseCard
                  key={`${name}-${index}`}
                  name={name}
                  category={category}
                  amount={amount}
                  date={date}
                  id={id}
                  index={index}
                  checked={checked[id]}
                  onChecked={(e, id) => setChecked((prev) => ({ ...prev, [id]: e }))}
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
            })
            : <NoExpenses/>
        }
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