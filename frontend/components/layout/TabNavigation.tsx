'use client';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'create', label: 'Create Vault', icon: '➕' },
    { id: 'vaults', label: 'My Vaults', icon: '🔐' },
    { id: 'claim', label: 'Claim', icon: '🎁' },
  ];

  return (
    <div className="bg-[#1E293B]/50 backdrop-blur-sm border-b border-[#3B82F6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 px-4 sm:px-6 py-4 font-medium transition-all whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-[#14B8A6]'
                    : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'
                }
              `}
            >
              <span className="text-lg sm:text-xl">{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
