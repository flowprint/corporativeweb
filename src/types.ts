export interface StockQuote {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  percentChange: number;
}

export interface ForexQuote {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  percentChange: number;
}