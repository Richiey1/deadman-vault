import { useState, useRef } from 'react';
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
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setActiveTab('create');
    // Scroll to tabs section
    setTimeout(() => {
      tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Only show tabs and content when wallet is connected */}
      <div ref={tabsRef}>
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
      </div>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            © 2025 Deadman Vault. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
