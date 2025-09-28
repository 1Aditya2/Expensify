import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../utils/helper";

const expenseSlice = createSlice({
    name: "expenseSlice",
    initialState: {
      expenses: [],
      initialBalance: '',
      initBalanceFlag: true
    },
    reducers: {
      addExpense(state, action) {
        const id = generateId();
        const data = { ...action.payload, id }
        state.expenses.unshift(data)
      },
      editExpense(state, action) {
        const { name, amount, id: expenseId, category, date } = action.payload;
        const updatedExpenses = state.expenses.map((exp) => {
          return expenseId === exp.id ? { name, amount, id: expenseId, category, date } : { ...exp };
        })
        state.expenses = updatedExpenses;
      },
      deleteExpense(state, action) {
        const { id: expenseId } = action.payload;
        const updatedExpenses = state.expenses.filter((exp) => {
          return expenseId !== exp.id;
        })
        state.expenses = updatedExpenses;
      },
      bulkDeleteExpenses(state, action) {
        const arr = Object.entries(action.payload)
        .map(([k, v]) => ({ id: Number(k), value: v }))
        .filter(({ value }) => value)
        .map(({ id }) => id);
        const filteredExpenses = state.expenses.filter(({ id }) => !arr.includes(id));
        state.expenses = filteredExpenses;
      },
      addInitialBalance(state, action) {
        state.initialBalance = Number(action.payload.balance);
      },
      setInitBalanceFlag(state, action) {
        state.initBalanceFlag = action.payload;
      }
    }
  });
  export const { addExpense, editExpense, deleteExpense, bulkDeleteExpenses, addInitialBalance, setInitBalanceFlag } = expenseSlice.actions
  export default expenseSlice.reducer;