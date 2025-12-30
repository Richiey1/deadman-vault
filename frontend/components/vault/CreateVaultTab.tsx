'use client';

import { useState } from 'react';

export default function CreateVaultTab() {
  const [beneficiary, setBeneficiary] = useState('');
  const [timeout, setTimeout] = useState('2592000'); // 30 days default
  const [initialDeposit, setInitialDeposit] = useState('');

  const timeoutPresets = [
    { label: '1 Week', value: '604800' },
    { label: '1 Month', value: '2592000' },
    { label: '3 Months', value: '7776000' },
    { label: '6 Months', value: '15552000' },
    { label: '1 Year', value: '31536000' },
  ];

  const handleCreate = () => {
    console.log({ beneficiary, timeout, initialDeposit });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create New Vault</h2>
        <p className="text-gray-600 mb-8">Set up your deadman vault with custom beneficiary and timeout period</p>

        {/* Beneficiary Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beneficiary Address
          </label>
          <input
            type="text"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">Who will inherit if you stop pinging</p>
        </div>

        {/* Timeout Presets */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Timeout Period
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {timeoutPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setTimeout(preset.value)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  timeout === preset.value
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={timeout}
            onChange={(e) => setTimeout(e.target.value)}
            placeholder="Custom (seconds)"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">How long before beneficiary can claim</p>
        </div>

        {/* Initial Deposit (Optional) */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Initial Deposit (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              placeholder="0.0"
              step="0.01"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ETH</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">You can deposit later</p>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!beneficiary || !timeout}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Create Vault
        </button>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-gray-700">
            💡 <span className="font-semibold">Tip:</span> You'll need to ping your vault regularly to prevent your beneficiary from claiming.
          </p>
        </div>
      </div>
    </div>
  );
}
