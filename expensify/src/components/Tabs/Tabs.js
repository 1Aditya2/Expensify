import React from 'react';
import { capsFirst } from '../../utils/helper';

const Tabs = ({ tabsArray = [], currentTab = '', changeTab }) => {
    return (
        <div className='border-2 flex border-slate-300 rounded-md w-full'>
            {tabsArray?.map(({ label, value }, index) => {
                return (<div onClick={() => changeTab(value)} className={`p-2 flex-1 cursor-pointer text-center
                ${(value === currentTab) ? 'bg-slate-300 text-black' : 'text-slate-500'}
                ${(index + 1 !== tabsArray.length) && 'border-r-2 border-slate-300'}`}>
                    {capsFirst(label)}
                </div>);
            })}
        </div>
    );
};

export default Tabs;