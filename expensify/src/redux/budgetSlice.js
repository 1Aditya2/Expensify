import { createSlice } from "@reduxjs/toolkit";
import { generateId, getStartandEndDateBasedOnPeriod } from "../utils/helper";

const budgetSlice = createSlice({
    name: "budgetSlice",
    initialState: {
      budgets: [],
    },
    reducers: {
      addBudget(state, action) {
        const id = generateId();
        const { period, startDate, endDate } = action.payload;
        const { periodStartDate = startDate, periodEndDate = endDate } = getStartandEndDateBasedOnPeriod(period);
        const data = { ...action.payload, id, startDate: periodStartDate, endDate: periodEndDate }
        state.budgets.unshift(data)
      },
      deleteBudget(state, action) {
        const { id: budgetId } = action.payload;
        const updatedBudgets = state.budgets.filter((budg) => {
          return budgetId !== budg.id;
        })
        state.budgets = updatedBudgets;
      },
      editBudget(state, action) {
        const { name, amount, id: budgetId, category, period, startDate, endDate } = action.payload;
        const { periodStartDate = startDate, periodEndDate = endDate } = getStartandEndDateBasedOnPeriod(period);
        const updatedBudget = state.budgets.map((budg) => {
          return budgetId === budg.id
            ? { name, amount, id: budgetId, category, period, startDate: periodStartDate, endDate: periodEndDate }
            : { ...budg };
        })
        state.budgets = updatedBudget;
      },
      setCurrencyInBudget(state, action) {
        const exchangeRate = action.payload;
        const oldBudget = state.budgets;
        state.budgets = oldBudget.map((each) => {
          return {
            ...each,
            amount: (each.amount * exchangeRate)
          }
        })
      }
    }
  });
  export const { addBudget, deleteBudget, editBudget, setCurrencyInBudget } = budgetSlice.actions
  export default budgetSlice.reducer;