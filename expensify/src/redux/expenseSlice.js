import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateId } from "../utils/helper";
import { currencyMap } from "../utils/constant";
import { setCurrencyInBudget } from "./budgetSlice";
export const fetchCurrencyRate = createAsyncThunk('', async (body, { dispatch }) => {
  try {
    const { baseCurrency, newCurrency } = body;
    let symbolsArray = '';
    for (let i = 0; i<currencyMap.length; i++) {
      if (i === currencyMap.length - 1) {
        symbolsArray = symbolsArray + `${currencyMap[i].value}`
        break;
      }
      symbolsArray = symbolsArray + `${currencyMap[i].value},`
    }
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?symbols=${symbolsArray}&base=${baseCurrency}`);
    const data = await res.json();
    const exchangeRate = data.rates[newCurrency] || 1;
    dispatch(setCurrencyInBudget(exchangeRate));
    return {exchangeRate, baseCurrency: newCurrency};
  } catch (e) {
    alert('Exchange rate service down.Try later!');
  }
})

const expenseSlice = createSlice({
    name: "expenseSlice",
    initialState: {
      expenses: [],
      initialBalance: '',
      initBalanceFlag: true,
      darkMode: false,
      baseCurrency: 'INR',
      currencyLoader: false
    },
    reducers: {
      setCurrencyLoader(state, action) {
        state.currencyLoader = action.payload;
      },
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
      },
      setDarkMode(state, action) {
        state.darkMode = action.payload
      }
    },
    extraReducers:(builder) => {
      builder
        .addCase(fetchCurrencyRate.pending, (state) => {
          state.currencyLoader = true;
        })
        .addCase(fetchCurrencyRate.fulfilled, (state, action) => {
          const {exchangeRate, baseCurrency} = action.payload;
          const oldInitBalance = state.initialBalance;
          const updatedExpenses = state.expenses.map((each) => {
            return {
              ...each,
              amount: (each.amount * exchangeRate)
            }
          });
          state.expenses = updatedExpenses;
          state.initialBalance = (oldInitBalance * exchangeRate)
          state.baseCurrency = baseCurrency;
          state.currencyLoader = false;
        })
        .addCase(fetchCurrencyRate.rejected, (state) => {
          state.currencyLoader = false;
        })
    }
  });
  export const {
    addExpense, editExpense, deleteExpense,
    bulkDeleteExpenses, addInitialBalance,
    setInitBalanceFlag, setDarkMode,
    setCurrencyLoader
  } = expenseSlice.actions
  export default expenseSlice.reducer;