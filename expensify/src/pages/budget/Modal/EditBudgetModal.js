import React from 'react'
import { Modal } from '../../../components/modal/Modal'
import { Formik } from 'formik';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/Button/Button';
import { Select } from '../../../components/select/Select';
import { DateSelector } from '../../../components/dateSelector/DateSelector';
import { CUSTOM, expenseCategories, periodCategories } from '../../../utils/constant';
import { addBudgetValidation } from '../constant';
import { delay } from '../../../utils/helper';
import { useDispatch } from 'react-redux';
import { editBudget } from '../../../redux/budgetSlice';

const EditBudgetModal = ({ open, onClose, data }) => {
    const focusRef = React.useRef(null);
    const dispatch = useDispatch();
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit Budget"
            initialFocusRef={focusRef}
            size='lg'
        >
            <div className='flex flex-col gap-3'>
                <Formik
                    initialValues={data}
                    validate={addBudgetValidation}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await delay(2000);
                        dispatch(editBudget(values));
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
                                placeholder={'Enter the budget name'}
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
                                placeholder={'Enter the budget amount'}
                                error={touched.amount && errors.amount}
                            />
                            <Select
                                label={'Period'}
                                name={'period'}
                                value={values.period}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={periodCategories}
                                className='mb-2'
                                placeholder={'Select a budget period'}
                                error={touched.period && errors.period}
                            />
                            {
                                values.period === CUSTOM && <div className='flex items-center gap-4'>
                                    <DateSelector
                                        label={'Start Date'}
                                        name={'startDate'}
                                        required
                                        value={values.startDate}
                                        max={values.endDate}
                                        className='mb-2'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.startDate && errors.startDate}
                                    />
                                    <DateSelector
                                        label={'End Date'}
                                        name={'endDate'}
                                        required
                                        value={values.endDate}
                                        className='mb-2'
                                        onChange={handleChange}
                                        min={values.startDate}
                                        onBlur={handleBlur}
                                        error={touched.endDate && errors.endDate}
                                    />
                                </div>
                            }
                            <Select
                                label={'Category'}
                                name={'category'}
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                multiple
                                options={expenseCategories.slice(0, expenseCategories.length - 1)}
                                className='mb-2'
                                placeholder={'Select a category'}
                                error={touched.category && errors.category}
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
    );
};

export default EditBudgetModal;
