"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, ArrowRightLeft } from 'lucide-react';

export default function CurrencyTracker() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [previousRates, setPreviousRates] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  
  const currencies = [
    { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
    { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
    { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳' },
    { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
    { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
    { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' }
  ];

  const displayCurrencies = currencies.filter(c => c.code !== 'BRL');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
      const data = await response.json();
      
      setPreviousRates(prev => rates);
      setRates(data.rates);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []); // Array vazio - executa apenas uma vez

  const getTrend = (current: number | undefined, previous: number | undefined) => {
    if (!current || !previous || previous === current) return null;
    return current > previous ? 'up' : 'down';
  };

  const formatRate = (rate: number) => {
    return (1 / rate).toFixed(4);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const convertCurrency = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || !rates[fromCurrency] || !rates[toCurrency]) return '0.00';
    
    // Converter de fromCurrency para BRL, depois de BRL para toCurrency
    const inBRL = value / rates[fromCurrency];
    const result = inBRL * rates[toCurrency];
    
    return result.toFixed(2);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Monitor de Moedas</h1>
            </div>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>

          {lastUpdate && (
            <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Última atualização: {formatTime(lastUpdate)}
            </div>
          )}

          {/* Campo de Conversão */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100"
              />
              
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>

              <button
                onClick={swapCurrencies}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4 text-gray-600" />
              </button>

              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>

              <div className="flex-1 min-w-[120px]">
                <div className="text-right">
                  <span className="text-sm text-gray-500">= </span>
                  <span className="text-xl font-bold text-indigo-600">{convertCurrency()}</span>
                  <span className="text-sm text-gray-500 ml-1">{toCurrency}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {displayCurrencies.map(currency => {
              const rate = rates[currency.code];
              const prevRate = previousRates[currency.code];
              const trend = getTrend(rate, prevRate);
              
              return (
                <div
                  key={currency.code}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{currency.flag}</span>
                      <div>
                        <h3 className="font-bold text-gray-800">{currency.code}</h3>
                        <p className="text-xs text-gray-500">{currency.name}</p>
                      </div>
                    </div>
                    {trend && (
                      <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend === 'up' ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  {loading && !rate ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-300 rounded w-32"></div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        R$ {rate ? formatRate(rate) : '---'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        1 {currency.code} = {rate ? formatRate(rate) : '---'} BRL
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}