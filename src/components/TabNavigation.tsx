import { MapPin, List } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'deals' | 'map';
  onTabChange: (tab: 'deals' | 'map') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'deals' as const, label: 'Deals', icon: List },
    { id: 'map' as const, label: 'Map', icon: MapPin },
  ];

  return (
    <div className="bg-white border-b border-ink-line px-4 py-2 sm:px-6 sm:py-3">
      <div className="flex space-x-1 bg-paper-sunk rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-white text-markdown shadow-sm font-medium'
                  : 'text-ink-soft hover:text-ink hover:bg-paper'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
