import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../utils/helper";

const expenseSlice = createSlice({
    name: "expenseSlice",
    initialState: {
      expenses: [],
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
      }
    }
  });
  export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions
  export default expenseSlice.reducer;