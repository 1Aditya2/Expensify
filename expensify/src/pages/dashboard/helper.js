import moment from "moment";
import { MONTH, QUARTER, TODAY, WEEK } from "../../utils/constant";

export const periodBasedCondition = (period, expenseDate) => {
    if (period === TODAY) {
      return expenseDate !== moment().format('YYYY-MM-DD')
    } else if (period === WEEK) {
      const endPrevWeek = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
      return moment(expenseDate).isSameOrBefore(endPrevWeek)
    } else if (period === MONTH) {
      const endDatePrevMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      return moment(expenseDate).isSameOrBefore(endDatePrevMonth)
    } else if (period === QUARTER) {
      const endDatePrevQuarter = moment().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD');
      return moment(expenseDate).isSameOrBefore(endDatePrevQuarter);
    } else {
      const endDatePrevYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
      return moment(expenseDate).isSameOrBefore(endDatePrevYear);
    }
  };
export const chartPeriodCondition = (period, expenseDate) => {
    if (period === TODAY) {
        return expenseDate === moment().format('YYYY-MM-DD')
      } else if (period === WEEK) {
        const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
        return moment(expenseDate).isSameOrAfter(startOfWeek) && moment(expenseDate).isSameOrBefore(endOfWeek)
      } else if (period === MONTH) {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
        return moment(expenseDate).isSameOrAfter(startOfMonth) && moment(expenseDate).isSameOrBefore(endOfMonth)
      } else if (period === QUARTER) {
        const startOfQuarter = moment().startOf('quarter').format('YYYY-MM-DD');
        const endOfQuarter = moment().endOf('quarter').format('YYYY-MM-DD');
        return moment(expenseDate).isSameOrAfter(startOfQuarter) && moment(expenseDate).isSameOrBefore(endOfQuarter)
      } else {
        const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
        const endOfYear = moment().endOf('year').format('YYYY-MM-DD');
        return moment(expenseDate).isSameOrAfter(startOfYear) && moment(expenseDate).isSameOrBefore(endOfYear)
      }
};