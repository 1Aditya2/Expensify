import { BanknoteArrowDown, ChartNoAxesCombined, HandCoins, LayoutDashboard } from 'lucide-react';
export const navItems = [
    {
        label: 'Dashboard',
        to: '/',
        icon: <LayoutDashboard />
    },
    {
        label: 'All Expenses',
        to: '/expenses',
        icon: <BanknoteArrowDown />
    },
    {
        label: 'Budget',
        to: '/budget',
        icon: <HandCoins />
    },
    {
        label: 'Analytics',
        to: '/analytics',
        icon: <ChartNoAxesCombined />
    }
];

export const expenseCategories = [
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "rent", label: "Rent" },
    { value: "utilities", label: "Utilities" },
    { value: 'income', label: 'Income' }
];
export const periodCategories = [
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
    { value: "year", label: "Year" },
    { value: 'custom', label: 'Custom' }
];
export const INCOME = 'income';
export const EXPENSES = 'expenses';
export const FOOD = 'food';
export const TRAVEL = 'travel';
export const UTITLITIES = 'utilities';
export const RENT = 'rent';
export const CASH_FLOW = 'cashFlow';

export const periodOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
    { value: 'year', label: 'Year' }
];
export const currencyMap = [
    { label: '$ - US Dollar', value: 'USD' },
    { label: '€ - Euro', value: 'EUR' },
    { label: '₹ - Indian Rupee', value: 'INR' },
    { label: '£ - British Pound', value: 'GBP' }
];

export const barChartOptions = [
    { value: "days", label: "Last 5 days" },
    { value: "months", label: "Last 5 months" },
    { value: "quarters", label: "Last 5 quarters" },
    { value: "years", label: "Last 5 years" }
];

export const TODAY = 'today';
export const RECENT = 'recent';
export const WEEK = 'week';
export const MONTH = 'month';
export const QUARTER = 'quarter';
export const YEAR = 'year';
export const CUSTOM = 'custom';
export const defaultDateFormat = 'YYYY-MM-DD';

export const categoryArray = [
    { each: INCOME, color: "hsl(130, 70%, 50%)" },
    { each: FOOD, color: "hsl(215, 70%, 50%)" },
    { each: TRAVEL, color: "hsl(35, 70%, 50%)" },
    { each: RENT, color: "hsl(22, 70%, 50%)" },
    { each: UTITLITIES, color: "hsl(191, 70%, 50%)" }
];
