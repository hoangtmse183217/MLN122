import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="max-w-4xl animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-700 to-indigo-800 text-transparent bg-clip-text">
          Chương 5: Kinh tế thị trường định hướng XHCN và các quan hệ lợi ích kinh tế ở Việt Nam
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          Khám phá nền tảng lý luận và thực tiễn cho sự phát triển bền vững.
        </p>
        <button
          onClick={onStart}
          className="mt-10 bg-blue-700 text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Bắt đầu học <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;