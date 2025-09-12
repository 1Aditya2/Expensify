import { MoveDownLeft, MoveUpRight, Pencil, Trash } from 'lucide-react'
import React from 'react'
import { capsFirst, USDFormat } from '../../utils/helper'
import { INCOME } from '../../utils/constant'
import { Checkbox } from '../CheckBox/CheckBox'

const ExpenseCard = ({ name, amount, category, date, index, onEditClick, onDeleteClick, id, checked, onChecked }) => {
    return (
        <div className='p-2 w-full flex justify-between items-center rounded-xl shadow-lg' key={`${index}-${amount}`}>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    {onChecked && <Checkbox
                        name="newsletter"
                        checked={checked}
                        onChange={(e) => onChecked(e.target.checked, id)}
                    />}
                    <p className='text-base flex items-center font-bold'>{capsFirst(name)} · {category === INCOME
                        ? <MoveDownLeft size={16} color='green' />
                        : <MoveUpRight size={16} color='red' />}
                        {USDFormat(amount)}
                    </p>
                </div>
                <p className='text-sm'>{capsFirst(category)} · {date}</p>
            </div>
            <div className='flex gap-3 items-center'>
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