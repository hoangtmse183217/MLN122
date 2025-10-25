import React from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs = [
  { id: 'content', title: 'Nội dung' },
  { id: 'quiz', title: 'Quiz' },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-md z-40">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center space-x-4 md:space-x-8 h-16">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`text-sm md:text-base font-medium transition-colors duration-300 relative py-2 block
                  ${activeTab === tab.id
                    ? 'text-blue-700'
                    : 'text-gray-600 hover:text-blue-700'
                  }
                `}
              >
                {tab.title}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Tabs;