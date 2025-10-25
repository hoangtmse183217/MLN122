import React, { useState } from 'react';
import type { FaqItem as FaqItemType } from '../types';

const faqData: FaqItemType[] = [
  {
    id: 1,
    question: "KTTT ĐHXHCN khác gì KTTT tư bản chủ nghĩa?",
  },
  {
    id: 2,
    question: "Vai trò của kinh tế nhà nước trong KTTT ĐHXHCN là gì?",
  },
  {
    id: 3,
    question: "Làm thế nào để đảm bảo định hướng XHCN trong quá trình phát triển kinh tế thị trường?",
  },
];

interface FaqItemProps {
  item: FaqItemType;
}

const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 px-2"
      >
        <span>{item.question}</span>
        <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}></i>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5 pt-0 text-gray-600">
          <p className="italic">[Sinh viên tự điền câu trả lời, phân tích dựa trên lý thuyết và thực tiễn...]</p>
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  return (
    <section>
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 border-l-4 border-blue-700 pl-4">
          Hỏi đáp thường gặp (FAQ)
        </h2>
        <div className="space-y-2">
          {faqData.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
