import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="max-w-4xl animate-fadeIn">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight text-brand-charcoal">
          Chương 5: Kinh tế thị trường định hướng XHCN và các quan hệ lợi ích kinh tế ở Việt Nam
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Khám phá nền tảng lý luận và thực tiễn cho sự phát triển bền vững.
        </p>
        <button
          onClick={onStart}
          className="mt-10 bg-brand-navy text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
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