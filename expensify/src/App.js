import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { navItems } from './utils/constant';
import Expenses from './pages/expenses/Expenses';
import { capsFirst } from './utils/helper';
import Dashboard from './pages/dashboard/Dashboard';
import Redirect from './pages/Redirect';
import Budget from './pages/budget/Budget';

function App() {
  const { pathname = '' } = useLocation();
  return (
    <div className='h-[100vh] p-6 relative'>
      <Sidebar navItems={navItems}/> 
      <div className='rounded-3xl p-4 z-0 top-6 right-6 bottom-6 absolute left-12 shadow-2xl overflow-hidden'>
        <p className='text-xl bg-slate-300 inline p-2 rounded-lg'>{(capsFirst(pathname.slice(1) || 'Dashboard'))}</p>
      <Routes>
        <Route path="/" element={<Redirect/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget/>} />
      </Routes>
      </div>
    </div>  
  );
}

export default App;
