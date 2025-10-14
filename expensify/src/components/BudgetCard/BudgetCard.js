import React from 'react'
import { capsFirst } from '../../utils/helper'
import { Edit, Trash2 } from 'lucide-react'
import { LinearProgress } from '../ProgressBar/ProgressBar'
import moment from 'moment'
import { useSelector } from 'react-redux'
import CurrencyViewer from '../CurrencyViewer/CurrencyViewer'

const BudgetCard = ({ name, amount, period, startDate, endDate, onDeleteBudget, onEditBudget, spent, progress, remains, percent }) => {
    const { baseCurrency, exchangeRate, viewingCurrency, currencyLoader = false } = useSelector(state => state.expenseReducer);
    return (
        <div className='gap-1 justify-start flex flex-col w-full'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-xl'>{capsFirst(name)}</h1>
                <div className='flex gap-2'>
                    {onEditBudget && <Edit className='cursor-pointer' size={18} onClick={onEditBudget} />}
                    {onDeleteBudget && <Trash2 className='cursor-pointer' size={18} onClick={onDeleteBudget} />}
                </div>
            </div>
            <p className='text-slate-600 text-sm dark:text-white'>
                {moment(startDate).format('D MMM YYYY')} - {moment(endDate).format('D MMM YYYY')}
            </p>
            <div className='flex text-base justify-between items-center'>
                <p><CurrencyViewer loader={currencyLoader} amount={amount} exchangeRate={exchangeRate} baseCurrency={baseCurrency} viewingCurrency={viewingCurrency} /></p>
                <p className='bg-slate-300 px-3 rounded-md py-1 dark:text-black'>{percent}%</p>
            </div>
            <LinearProgress
                value={progress}
                className="w-full"
                trackClassName="bg-gray-200"
                barClassName={percent <= 0 ? 'bg-emerald-600' : 'bg-red-600'}
            />
            <div className='flex justify-between text-slate-500 '>
                <div className='flex flex-col justify-start dark:text-white'>
                    <CurrencyViewer loader={currencyLoader} amount={spent} exchangeRate={exchangeRate} baseCurrency={baseCurrency} viewingCurrency={viewingCurrency} />
                    <p>Spent</p>
                </div>
                <div className='flex flex-col items-end dark:text-white'>
                    <p className={remains < 0 ? 'text-red-600' : ''}><CurrencyViewer loader={currencyLoader} amount={remains} exchangeRate={exchangeRate} baseCurrency={baseCurrency} viewingCurrency={viewingCurrency} /></p>
                    {remains >= 0 ? <p>Remains</p> : <p className='text-red-600'>Overspent</p>}
                </div>
            </div>
        </div>
    );
};

export default BudgetCard;
