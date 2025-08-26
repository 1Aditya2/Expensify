import { BanknoteArrowDown, ChartNoAxesCombined, HandCoins, LayoutDashboard } from 'lucide-react';
export const navItems = [
    {
        label: 'Dashboard',
        to: '/dashboard',
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
export const todayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
export const INCOME = 'income';