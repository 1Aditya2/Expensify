import React, { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Plus } from 'lucide-react'
import CreateBudgetModal from './Modal/CreateBudgetModal';

const NoBudget = () => {
    const [createBudget, setCreateBudget] = useState(false);
    return (
        <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
            <p className='text-slate-400'>No Budgets created till now!</p>
            <Button primary onClick={() => setCreateBudget(true)}>
                <Plus size={16} />
                <p className='text-base'>Add Budget</p>
            </Button>
            {createBudget && <CreateBudgetModal
                open={createBudget}
                onClose={() => setCreateBudget(false)} />}
        </div>
    )
}

export default NoBudget