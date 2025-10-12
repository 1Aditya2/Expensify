import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { navItems } from './utils/constant';
import { capsFirst } from './utils/helper';
const Expenses = React.lazy(() => import('./pages/expenses/Expenses'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Budget = React.lazy(() => import('./pages/budget/Budget'));
const Analytics = React.lazy(() => import('./pages/analytics/Analytics'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { pathname = '' } = useLocation();
  // const { baseCurrency = 'USD' } = useSelector(state => state.expenseReducer);
  // const dispatch = useDispatch();
  // const [currency, setCurrency] = useState(baseCurrency);

  // const handleCurrencyChange = (e) => {
  //   const newCurrency = e.target.value;
  //   setCurrency(newCurrency);
  //   // dispatch(setCurrencyChanger(newCurrency));
  //   dispatch(fetchCurrencyRate({ baseCurrency, newCurrency }));
  // };
  return (
    <div className='h-[100vh] p-4 relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'>
      <Sidebar navItems={navItems}/> 
      <div className='rounded-3xl p-4 z-0 top-3 right-3 bottom-3 absolute left-12 shadow-2xl overflow-hidden bg-white dark:bg-slate-900'>
        <div className='flex items-center gap-3'>
        <p className='text-xl bg-slate-300 dark:bg-slate-700 inline p-2 rounded-lg'>
          {(capsFirst(pathname.slice(1) || 'Dashboard'))}
        </p>
        {/* <Select
          name={'currency'}
          value={currency}
          placeholder={'Change currency'}
          options={currencyMap}
          onChange={handleCurrencyChange}
        /> */}
        </div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </div>  
  );
}

export default App;
