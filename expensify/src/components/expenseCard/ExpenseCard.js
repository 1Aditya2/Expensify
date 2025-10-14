import { MoveDownLeft, MoveUpRight, Pencil, Trash } from 'lucide-react'
import React from 'react'
import { capsFirst } from '../../utils/helper'
import { INCOME } from '../../utils/constant'
import { Checkbox } from '../CheckBox/CheckBox'
import Tooltip from '../Tooltip/Tooltip'
import { useSelector } from 'react-redux'
import CurrencyViewer from '../CurrencyViewer/CurrencyViewer'

const ExpenseCard = ({ name, amount, category, date, index, onEditClick, onDeleteClick, id, checked, onChecked }) => {
    const {
        baseCurrency = 'INR',
        viewingCurrency = 'INR',
        exchangeRate = 1,
        currencyLoader = false
    } = useSelector(state => state.expenseReducer);
    return (
        <div className='p-2 w-full flex justify-between items-center max-sm:flex-col max-sm:items-start rounded-xl shadow-lg dark:shadow-2xl' key={`${index}-${amount}`}>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    {onChecked && <Checkbox
                        name="newsletter"
                        checked={checked}
                        onChange={(e) => onChecked(e.target.checked, id)}
                    />}
                    <p className='text-base flex items-center font-bold'>{
                        <Tooltip position='bottom' text={capsFirst(name)}>
                            <span className='max-md:max-w-[10ch] max-md:overflow-hidden
                        max-md:text-ellipsis max-md:whitespace-nowrap'>
                                {capsFirst(name)}
                            </span></Tooltip>}&nbsp;·&nbsp;{category === INCOME
                                ? <MoveDownLeft size={16} color='green' />
                                : <MoveUpRight size={16} color='red' />}
                        <CurrencyViewer
                            amount={amount}
                            baseCurrency={baseCurrency}
                            viewingCurrency={viewingCurrency}
                            exchangeRate={exchangeRate}
                            loader={currencyLoader}
                        />
                    </p>
                </div>
                <p className='text-sm'>{capsFirst(category)} · {date}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <span className='p-2 hover:bg-slate-300 rounded-[50%] cursor-pointer' onClick={onEditClick}>
                    <Pencil size={16} />
                </span>
                <span onClick={onDeleteClick} className='p-2 hover:bg-slate-300 rounded-[50%] cursor-pointer'>
                    <Trash size={16} className='cursor-pointer' />
                </span>
            </div>
        </div>
    )
}

export default ExpenseCard