import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = ({ navItems }) => {
  return (
    <div className='w-14 sticky z-50 bg-white
    left-0 top-[50%] -translate-y-1/2 min-h-[50%] p-2 border-[2px] border-black
    rounded-2xl flex flex-col items-center justify-around'>
      {navItems?.map(({ icon, to }, index) => {
        return (
          <NavLink key={`${to}-${index}`} to={to} className={({ isActive }) =>
            `hover:bg-slate-300 p-1 rounded-[50%] cursor-pointer ${isActive ? 'bg-slate-300' : ''}`
          }>
            {icon}
          </NavLink>
        );
      })}
    </div>
  )
}

export default Sidebar