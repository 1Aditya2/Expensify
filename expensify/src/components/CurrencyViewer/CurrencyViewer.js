import { Loader } from 'lucide-react';
import { USDFormat } from '../../utils/helper';

const CurrencyViewer = ({ amount = 0, baseCurrency = 'INR', viewingCurrency = 'INR', exchangeRate = 1, withoutSymbol = false, loader = false }) => {
    if (baseCurrency === viewingCurrency) {
        return loader ? <Loader size={16} className='animate-spin'/> : USDFormat(amount, baseCurrency, withoutSymbol)
    }
    const exchangedAmount = Number(amount*exchangeRate);
    return (
        loader ? <Loader size={16} className='animate-spin'/> : USDFormat(exchangedAmount, viewingCurrency, withoutSymbol)
    );
};

export default CurrencyViewer;