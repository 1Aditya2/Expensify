import { isEmpty } from "lodash";
import { CUSTOM } from "../../utils/constant";

export const addBudgetValidation = values => {
    const errors = {};
    const intAmount = Number(values.amount)
    if (isEmpty(values.name.trim(" "))) {
      errors.name = 'Budget name is required!';
    }
    if (isEmpty(values.category)) {
      errors.category = 'Category is required!';
    }
    if (!intAmount) {
      errors.amount = 'Amount should be a number!';
    }
    if (intAmount < 0 || intAmount === 0) {
      errors.amount = 'Amount should never be negative or zero!';
    }
    if (!values.period) {
        errors.period = 'Period is required!'
    }
    if (values.period === CUSTOM) {
        if (isEmpty(values.startDate) || isEmpty(values.endDate)) {
            
        }
    }
    return errors;
};
