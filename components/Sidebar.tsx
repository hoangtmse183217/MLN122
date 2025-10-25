
import React from 'react';

interface Section {
  id: string;
  title: string;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection }) => {
  
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Nội dung chương</h3>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={`block text-sm py-2 px-3 rounded-md transition-all duration-200 relative
                ${
                  activeSection === section.id
                    ? 'font-semibold text-brand-navy bg-brand-navy/10'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <span 
                className={`absolute left-0 top-0 h-full w-1 bg-brand-navy rounded-r-full transition-transform duration-300 ease-out
                  ${activeSection === section.id ? 'scale-y-100' : 'scale-y-0'}`
                }
              ></span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
