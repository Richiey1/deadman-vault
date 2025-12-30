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
    // Will implement Web3 logic later
    console.log({ beneficiary, timeout, initialDeposit });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-[#3B82F6]/20">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Vault</h2>

        {/* Beneficiary Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Beneficiary Address
          </label>
          <input
            type="text"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-[#0F172A] border border-[#3B82F6]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#14B8A6] transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">Who will inherit if you stop pinging</p>
        </div>

        {/* Timeout Presets */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Timeout Period
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {timeoutPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setTimeout(preset.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeout === preset.value
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white'
                    : 'bg-[#0F172A] text-gray-300 border border-[#3B82F6]/30 hover:border-[#14B8A6]'
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
            className="w-full px-4 py-3 bg-[#0F172A] border border-[#3B82F6]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#14B8A6] transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">How long before beneficiary can claim</p>
        </div>

        {/* Initial Deposit (Optional) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Initial Deposit (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              placeholder="0.0"
              step="0.01"
              className="w-full px-4 py-3 bg-[#0F172A] border border-[#3B82F6]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#14B8A6] transition-colors pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ETH</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">You can deposit later</p>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!beneficiary || !timeout}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#3B82F6]/20"
        >
          Create Vault
        </button>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-[#0F172A]/50 border border-[#14B8A6]/20 rounded-lg">
          <p className="text-sm text-gray-300">
            💡 <span className="font-medium">Tip:</span> You'll need to ping your vault regularly to prevent your beneficiary from claiming.
          </p>
        </div>
      </div>
    </div>
  );
}
