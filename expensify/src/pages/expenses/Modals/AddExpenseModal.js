import React from 'react'
import { Modal } from '../../../components/modal/Modal'
import { Button } from '../../../components/Button/Button';
import { Formik } from 'formik';
import { addExpenseValidation } from '../constant';
import { Input } from '../../../components/input/Input';
import { Select } from '../../../components/select/Select';
import { DateSelector } from '../../../components/dateSelector/DateSelector';
import { expenseCategories, todayDate } from '../../../utils/constant';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../../redux/expenseSlice';
import { delay } from '../../../utils/helper';

const AddExpenseModal = ({ open, onClose }) => {
  const focusRef = React.useRef(null);
  const dispatch = useDispatch();
  const max = todayDate();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Expense"
      initialFocusRef={focusRef}
      size='lg'
    >
      <div className='flex flex-col gap-3'>
        <Formik
          initialValues={{ name: '', category: '', amount: '', date: '' }}
          validate={addExpenseValidation}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await delay(2000);
            dispatch(addExpense(values));
            onClose();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label={'Name'}
                name={'name'}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={'Enter the expense name'}
                className='mb-2'
                error={touched.name && errors.name}
              />
              <Input
                label={'Amount'}
                name={'amount'}
                value={values.amount}
                onBlur={handleBlur}
                onChange={handleChange}
                className='mb-2'
                placeholder={'Enter the expense amount'}
                error={touched.amount && errors.amount}
              />
              <Select
                label={'Category'}
                name={'category'}
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                options={expenseCategories}
                className='mb-2'
                placeholder={'Select a category!'}
                error={touched.category && errors.category}
              />
              <DateSelector
                label={'Expense Date'}
                name={'date'}
                value={values.date}
                className='mb-2'
                onChange={handleChange}
                max={max}
                onBlur={handleBlur}
                error={touched.date && errors.date}
              />
              <div className='flex flex-row-reverse justify-start items-center gap-3'>
                <Button loading={isSubmitting} primary type='submit'>
                  Save
                </Button>
                <Button disabled={isSubmitting} onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default AddExpenseModal