
import React from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs = [
  { id: 'home', title: 'Trang chủ' },
  { id: 'content', title: 'Nội dung' },
  { id: 'quiz', title: 'Quiz' },
];

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="font-heading font-bold text-xl text-brand-charcoal tracking-wider">
            MLN122
          </div>
          <nav>
            <ul className="flex items-center space-x-6 md:space-x-8">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`text-base transition-colors duration-300 relative py-2 block
                      ${activeTab === tab.id
                        ? 'text-brand-navy font-semibold'
                        : 'text-brand-dark-gray hover:text-brand-navy'
                      }
                    `}
                  >
                    {tab.title}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-navy rounded-full transform scale-x-100 transition-transform duration-300"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
