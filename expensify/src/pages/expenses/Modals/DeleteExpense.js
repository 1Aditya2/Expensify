import React, { useState } from 'react'
import { Modal } from '../../../components/modal/Modal'
import { Button } from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { delay } from '../../../utils/helper';
import { deleteExpense } from '../../../redux/expenseSlice';

const DeleteExpense = ({ open, onClose, data }) => {
  const focusRef = React.useRef(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoader(true);
    await delay(2000);
    dispatch(deleteExpense(data));
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Expense"
      initialFocusRef={focusRef}
    >
      <div className='flex flex-col gap-3'>
        <p>Are you sure you want to delete this expense?</p>
        <div className='flex flex-row-reverse justify-start items-center gap-3'>
          <Button loading={loader} primary onClick={handleSubmit}>
            Delete
          </Button>
          <Button disabled={loader} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteExpense