import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Chương 5: Kinh tế thị trường định hướng XHCN và các quan hệ lợi ích kinh tế ở Việt Nam
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            Khám phá nền tảng lý luận và thực tiễn cho sự phát triển bền vững.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
