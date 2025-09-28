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
  return (
    <div className='h-[100vh] p-6 relative'>
      <Sidebar navItems={navItems}/> 
      <div className='rounded-3xl p-4 z-0 top-6 right-6 bottom-6 absolute left-12 shadow-2xl overflow-hidden'>
        <p className='text-xl bg-slate-300 inline p-2 rounded-lg'>{(capsFirst(pathname.slice(1) || 'Dashboard'))}</p>
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
