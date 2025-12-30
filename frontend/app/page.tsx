'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import TabNavigation from '@/components/layout/TabNavigation';
import CreateVaultTab from '@/components/vault/CreateVaultTab';
import MyVaultsTab from '@/components/vault/MyVaultsTab';
import ClaimTab from '@/components/vault/ClaimTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('create');
  const { isConnected } = useAccount();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateVaultTab />;
      case 'vaults':
        return <MyVaultsTab />;
      case 'claim':
        return <ClaimTab />;
      default:
        return <CreateVaultTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Only show tabs and content when wallet is connected */}
      {isConnected ? (
        <>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </>
      ) : (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
              <div className="text-6xl mb-6">🔐</div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">
                Please connect your wallet to access the Deadman Vault dashboard and manage your vaults.
              </p>
              <p className="text-sm text-gray-500">
                Click the "Connect Wallet" button in the header to get started.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Deadman Vault</h3>
              <p className="text-gray-400 text-sm">
                Secure your digital legacy with automated inheritance on Base blockchain.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-[#14B8A6]">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#14B8A6]">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#14B8A6]">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Network</h3>
              <p className="text-gray-400 text-sm">Base Mainnet (Chain ID: 8453)</p>
              <p className="text-gray-400 text-sm mt-2">Built with ❤️ for digital inheritance</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Deadman Vault. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
