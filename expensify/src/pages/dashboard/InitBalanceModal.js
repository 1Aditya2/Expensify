import React from 'react';
import { Modal } from '../../components/modal/Modal';
import { Button } from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { delay } from '../../utils/helper';
import { addInitialBalance } from '../../redux/expenseSlice';
import { Formik } from 'formik';
import { Input } from '../../components/input/Input';
import { addBalanceValidation } from './helper';

const InitBalanceModal = ({ open, onClose }) => {
    const {initialBalance, baseCurrency} = useSelector(state => state.expenseReducer);
    const focusRef = React.useRef(null);
    const dispatch = useDispatch();

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Add Initial Balance"
            initialFocusRef={focusRef}
        >
            <div className='flex flex-col gap-3'>
                <Formik
                    initialValues={{ balance: initialBalance }}
                    validate={addBalanceValidation}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await delay(2000);
                        dispatch(addInitialBalance(values));
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
                                label={`Initial Balance (${baseCurrency})`}
                                name={'balance'}
                                value={values.balance}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className='mb-2'
                                placeholder={'Enter the initial balance'}
                                error={touched.balance && errors.balance}
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

export default InitBalanceModal;