import React, { useMemo, useState } from 'react';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import { useSelector } from 'react-redux';
import { chartPeriodCondition } from '../dashboard/helper';
import { CUSTOM } from '../../utils/constant';
import moment from 'moment';
import DeleteBudget from './Modal/DeleteBudgetModal';
import EditBudgetModal from './Modal/EditBudgetModal';

const SingleBudget = ({ name, amount, period, startDate, endDate, id, category = [] }) => {
    const [deleteBudget, setDeleteBudget] = useState(false);
    const [editBudget, setEditBudget] = useState(false);
    const expenses = useSelector(state => state.expenseReducer.expenses);

    const { spent, remains, progress, percent } = useMemo(() => {
        const filteredExpenses = expenses.filter(({ date: expenseDate, category: expenseCategory = '' }) => {
            return category.includes(expenseCategory) && (period !== CUSTOM
                ? chartPeriodCondition(period, expenseDate)
                : (moment(expenseDate).isSameOrAfter(startDate) && moment(expenseDate).isSameOrBefore(endDate)));
        }).reduce((acc, row) => acc + Number(row.amount), 0);
        const progress = (filteredExpenses / amount) * 100;
        return {
            spent: filteredExpenses,
            remains: amount - filteredExpenses,
            progress: progress.toFixed(0),
            percent: -(100 - progress).toFixed(0)
        }
    }, [expenses, amount, period, startDate, endDate, category]);

    return (
        <div>
            <BudgetCard
                name={name}
                amount={amount}
                period={period}
                startDate={startDate}
                endDate={endDate}
                spent={spent}
                remains={remains}
                progress={progress}
                percent={percent}
                onDeleteBudget={() => setDeleteBudget(true)}
                onEditBudget={() => setEditBudget(true)}
            />
            
            {deleteBudget && <DeleteBudget open={deleteBudget} onClose={() => setDeleteBudget(false)} data={{ id }} />}
            {editBudget && <EditBudgetModal
                open={editBudget}
                onClose={() => setEditBudget(false)}
                data={{ name, amount, period, startDate, endDate, category, id }}
            />}
        </div>
    );
};

export default SingleBudget;
