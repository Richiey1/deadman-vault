'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useFactory, useWatchVaultCreated } from '@/hooks/useFactory';
import { isAddress, type Address } from 'viem';
import { NETWORK_CONFIG } from '@/config/constants';

export default function CreateVaultTab() {
  const { address, isConnected } = useAccount();
  const [beneficiary, setBeneficiary] = useState('');
  const [timeout, setTimeout] = useState('2592000'); // 30 days default
  const [createdVaultAddress, setCreatedVaultAddress] = useState<Address | null>(null);
  
  const { createVault, hash, isPending, isSuccess, error } = useFactory();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const timeoutPresets = [
    { label: '1 Week', value: '604800' },
    { label: '1 Month', value: '2592000' },
    { label: '3 Months', value: '7776000' },
    { label: '6 Months', value: '15552000' },
    { label: '1 Year', value: '31536000' },
  ];

  // Watch for VaultCreated events
  useWatchVaultCreated((owner, vault, beneficiaryAddr, timeoutVal) => {
    if (owner === address && hash) {
      setCreatedVaultAddress(vault);
    }
  });

  // Reset form after successful creation
  useEffect(() => {
    if (isConfirmed && createdVaultAddress) {
      // Keep the vault address visible, but could reset form here if desired
    }
  }, [isConfirmed, createdVaultAddress]);

  const handleCreate = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!isAddress(beneficiary)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      await createVault(beneficiary as Address, BigInt(timeout));
    } catch (err) {
      console.error('Error creating vault:', err);
    }
  };

  const handleReset = () => {
    setBeneficiary('');
    setTimeout('2592000');
    setCreatedVaultAddress(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create New Vault</h2>
        <p className="text-gray-600 mb-8">Set up your deadman vault with custom beneficiary and timeout period</p>

        {/* Success Message */}
        {isConfirmed && createdVaultAddress && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <div className="flex-1">
                <p className="font-semibold text-green-800 mb-2">Vault Created Successfully!</p>
                <p className="text-sm text-green-700 mb-2">Your vault address:</p>
                <div className="bg-white p-3 rounded border border-green-200 mb-3">
                  <code className="text-sm text-gray-800 break-all">{createdVaultAddress}</code>
                </div>
                <a
                  href={`${NETWORK_CONFIG.explorerUrl}/address/${createdVaultAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline inline-flex items-center"
                >
                  View on {NETWORK_CONFIG.explorerName} →
                </a>
                <button
                  onClick={handleReset}
                  className="ml-4 text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Create Another Vault
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Error:</span> {error.message}
            </p>
          </div>
        )}

        {/* Wallet Connection Warning */}
        {!isConnected && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Please connect your wallet to create a vault
            </p>
          </div>
        )}

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
            disabled={isPending || isConfirming}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isPending || isConfirming}
                className={`px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
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
            disabled={isPending || isConfirming}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-2">How long before beneficiary can claim</p>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!isConnected || !beneficiary || !timeout || isPending || isConfirming || !isAddress(beneficiary)}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isPending ? 'Waiting for approval...' : isConfirming ? 'Creating vault...' : 'Create Vault'}
        </button>

        {/* Transaction Hash */}
        {hash && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Transaction Hash:</p>
            <a
              href={`${NETWORK_CONFIG.explorerUrl}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline break-all"
            >
              {hash}
            </a>
          </div>
        )}

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
