
import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-brand-navy text-white w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy z-50"
      aria-label="Phụ lục Liêm chính Học thuật"
    >
      <i className="fas fa-book"></i>
    </button>
  );
};

export default FloatingButton;