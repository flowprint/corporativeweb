import { useState, useEffect } from 'react';
import { StockQuote, ForexQuote } from '../types';

// Mock data with realistic values
const MOCK_STOCK_DATA = [
  { symbol: '^GSPC', name: 'S&P 500', price: 4927.93, change: 25.61, percentChange: 0.52 },
  { symbol: '^DJI', name: 'Dow Jones', price: 38654.42, change: 134.58, percentChange: 0.35 },
  { symbol: '^IXIC', name: 'NASDAQ', price: 15628.95, change: -28.39, percentChange: -0.18 },
  { symbol: '^FTSE', name: 'FTSE 100', price: 7615.54, change: -42.17, percentChange: -0.55 },
  { symbol: '^N225', name: 'Nikkei 225', price: 36158.02, change: 148.50, percentChange: 0.41 }
];

const MOCK_FOREX_DATA = [
  { symbol: 'EURUSD', name: 'EUR/USD', price: 1.0785, change: -0.0015, percentChange: -0.14 },
  { symbol: 'GBPUSD', name: 'GBP/USD', price: 1.2635, change: 0.0025, percentChange: 0.20 },
  { symbol: 'USDJPY', name: 'USD/JPY', price: 148.35, change: -0.45, percentChange: -0.30 },
  { symbol: 'AUDUSD', name: 'AUD/USD', price: 0.6525, change: 0.0008, percentChange: 0.12 },
  { symbol: 'USDCAD', name: 'USD/CAD', price: 1.3465, change: -0.0020, percentChange: -0.15 }
];

const addVariation = (value: number, range: number = 0.001) => {
  const variation = (Math.random() - 0.5) * 2 * range * value;
  return Number((value + variation).toFixed(4));
};

export const useFinancialData = () => {
  const [stockData, setStockData] = useState<StockQuote[]>([]);
  const [forexData, setForexData] = useState<ForexQuote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateData = () => {
    try {
      const newStockData = MOCK_STOCK_DATA.map(stock => {
        const currentPrice = addVariation(stock.price);
        const change = currentPrice - stock.price;
        const percentChange = (change / stock.price) * 100;
        
        return {
          symbol: stock.symbol,
          name: stock.name,
          currentPrice,
          change: Number(change.toFixed(2)),
          percentChange: Number(percentChange.toFixed(2))
        };
      });

      const newForexData = MOCK_FOREX_DATA.map(forex => {
        const currentPrice = addVariation(forex.price, 0.0005);
        const change = currentPrice - forex.price;
        const percentChange = (change / forex.price) * 100;
        
        return {
          symbol: forex.symbol,
          name: forex.name,
          currentPrice,
          change: Number(change.toFixed(4)),
          percentChange: Number(percentChange.toFixed(2))
        };
      });

      setStockData(newStockData);
      setForexData(newForexData);
      setError(null);
    } catch (err) {
      setError('An error occurred while updating market data.');
      console.error('Error updating mock data:', err);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const updateIfMounted = () => {
      if (mounted) {
        updateData();
      }
    };

    updateIfMounted();
    const interval = setInterval(updateIfMounted, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { 
    stockData, 
    forexData, 
    error,
    isLoading: stockData.length === 0 && forexData.length === 0 && !error
  };
};