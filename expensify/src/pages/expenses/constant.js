import { isEmpty } from 'lodash';
export const addExpenseValidation = values => {
    const errors = {};
    const intAmount = Number(values.amount)
    if (isEmpty(values.name.trim(" "))) {
      errors.name = 'Expense name is required!';
    }
    if (!values.category) {
      errors.category = 'Category is required!';
    }
    if (!intAmount) {
      errors.amount = 'Amount should be a number!';
    }
    if (intAmount < 0 || intAmount === 0) {
      errors.amount = 'Amount should never be negative or zero!';
    }
    if (!values.date) {
        errors.date = 'Date is required!'
    }
    return errors;
};
export const initExpenseFilters = {
  category: '',
  date: '',
  search: ''
}