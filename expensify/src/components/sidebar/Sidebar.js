import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../redux/expenseSlice';
const Sidebar = ({ navItems }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.expenseReducer.darkMode);

  useEffect(() => {
    darkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    if (next) {
      document.documentElement.classList.add('dark');
      dispatch(setDarkMode(true));
    } else {
      document.documentElement.classList.remove('dark');
      dispatch(setDarkMode(false));
    }
  };

  return (
    <div className='w-14 sticky z-50 bg-white dark:bg-slate-900
    left-0 top-[50%] -translate-y-1/2 min-h-[50%] p-2 border-[2px] border-black dark:border-slate-700
    rounded-2xl flex flex-col items-center justify-around gap-2'>
      {navItems?.map(({ icon, to }, index) => {
        return (
          <NavLink key={`${to}-${index}`} to={to} className={({ isActive }) =>
            `hover:bg-slate-300 dark:hover:bg-slate-500 p-1 rounded-[50%] cursor-pointer ${isActive ? 'bg-slate-300 dark:bg-slate-500' : ''}`
          }>
            {icon}
          </NavLink>
        );
      })}
      <div onClick={toggleTheme} aria-label="Toggle dark mode"
        className='hover:bg-slate-300 dark:hover:bg-slate-500 p-1 rounded-[50%] cursor-pointer'>
        <div className='w-5 h-5 flex items-center justify-center'>
          {!darkMode ? '🌙' : '☀️'}
        </div>
      </div>
    </div>
  )
}

export default Sidebar