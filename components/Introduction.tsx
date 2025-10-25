
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};

const interactiveContent = [
  {
    id: 'a',
    title: 'a. Vận hành theo quy luật thị trường:',
    icon: 'fas fa-chart-line',
    subheading: '“Bàn tay vô hình” của thị trường',
    explanation: 'Giống như một cái chợ sôi động, nền kinh tế nước ta chấp nhận cạnh tranh (các công ty đua nhau làm tốt hơn), giá cả thay đổi theo cung - cầu (hàng hiếm thì đắt, hàng thừa thì rẻ).',
    example: 'Giá vé máy bay dịp Tết tăng cao do nhiều người muốn về quê (cầu tăng). Các hãng điện thoại (Samsung, Apple, Oppo...) liên tục ra mẫu mới, giảm giá để cạnh tranh giành khách hàng.',
    imageUrl: '/images/a.jpg',
    referenceUrl: 'https://nguyentrungba.edu.vn/vi-du-ve-thi-truong-canh-tranh-hoan-hao'
  },
  {
    id: 'b',
    title: 'b. Hướng tới mục tiêu "dân giàu, nước mạnh, dân chủ, công bằng, văn minh":',
    icon: 'fas fa-flag-checkered',
    subheading: '“La bàn” định hướng xã hội',
    explanation: 'Đây chính là cái "la bàn" định hướng XHCN. Chúng ta dùng cái chợ (thị trường) không chỉ để làm giàu cho một nhóm người, mà là công cụ để cả xã hội cùng phát triển tốt đẹp hơn, công bằng hơn.',
    example: 'Nhà nước vẫn đầu tư làm đường, kéo điện đến những vùng sâu vùng xa dù tốn kém, không có lãi ngay. Có chính sách BHYT cho người nghèo, người dân tộc thiểu số để đảm bảo ai cũng được chăm sóc sức khỏe cơ bản.',
    imageUrl: '/images/b.jpg',
    referenceUrl: 'https://thuviennhadat.vn/phap-ly-nha-dat/bo-xay-dung-co-trach-nhiem-gi-trong-viec-quan-ly-tai-san-ket-cau-ha-tang-duong-sat-do-nha-nuoc-dau-t-696407.html'
  },
  {
    id: 'c',
    title: 'c. Có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo:',
    icon: 'fas fa-landmark',
    subheading: '“Bàn tay hữu hình” của Nhà nước',
    explanation: 'Để "cái chợ" hoạt động hiệu quả mà không gây ra hỗn loạn hay bất công quá lớn, Nhà nước ("trọng tài") sẽ can thiệp bằng luật pháp, chính sách. Và đường lối tổng thể, mục tiêu lớn do Đảng Cộng sản Việt Nam ("người chỉ đường") vạch ra.',
    example: 'Nhà nước quy định mức lương tối thiểu để bảo vệ người lao động. Đảng đề ra Chiến lược phát triển kinh tế-xã hội 10 năm (ví dụ 2021-2030) làm định hướng cho các chính sách của Nhà nước.',
    imageUrl: '/images/c.jpg',
    referenceUrl: 'https://thuvienphapluat.vn/lao-dong-tien-luong/chien-luoc-phat-trien-kinh-te--xa-hoi-10-nam-20212030-neu-phuong-huong-nhiem-vu-giai-phap-day-manh--34187.html'
  }
];

interface InteractiveItemProps {
  item: typeof interactiveContent[0];
  isActive: boolean;
  onClick: () => void;
}

const InteractiveItem: React.FC<InteractiveItemProps> = ({ item, isActive, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 px-5 text-left font-semibold text-brand-charcoal hover:bg-gray-50 focus:outline-none"
        aria-expanded={isActive}
      >
        <span className="flex items-center">
          <i className={`${item.icon} mr-3 text-xl w-6 text-center text-brand-navy`}></i>
          {item.title}
        </span>
        <i className={`fas fa-chevron-down transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-4 pl-12 pr-5 text-gray-700 space-y-4">
          {item.subheading && <h3 className="font-bold text-lg text-brand-dark-gray italic">{item.subheading}</h3>}
          <p>{item.explanation}</p>
          <img 
            src={item.imageUrl} 
            alt={`Hình ảnh minh họa cho: ${item.title}`} 
            className="rounded-lg shadow-sm my-3 w-full h-48 object-cover object-center" 
          />
          <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="font-bold text-sm text-gray-800">Ví dụ thực tế:</p>
            <p className="italic">{item.example}</p>
          </div>
          {item.referenceUrl && (
            <div className="text-right text-sm pt-2">
              <a 
                href={item.referenceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-brand-navy hover:underline transition-colors"
              >
                Nguồn tham khảo <i className="fas fa-up-right-from-square ml-1.5 text-xs"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Introduction: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('a');
  
  const [policyInput, setPolicyInput] = useState<string>('Tăng thuế môi trường đối với các doanh nghiệp sản xuất thép.');
  const [simulationResult, setSimulationResult] = useState<{ marketImpact: string; socialistImpact: string; stateImpact: string; } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const policySuggestions = [
    'Tăng mức lương tối thiểu vùng.',
    'Xây dựng nhà ở xã hội.',
    'Giảm thuế cho doanh nghiệp công nghệ.',
    'Yêu cầu xử lý nước thải công nghiệp.',
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(activeItem === id ? '' : id);
  };
  
  const handleSimulatePolicy = async () => {
    if (!policyInput.trim()) {
        setError("Vui lòng nhập một chính sách để phân tích.");
        return;
    }
    
    setIsLoading(true);
    setSimulationResult(null);
    setError(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Bạn là một chuyên gia kinh tế chính trị. Phân tích tác động giả định của chính sách sau đây dựa trên 3 trụ cột của Kinh tế thị trường định hướng XHCN ở Việt Nam. Trả lời ngắn gọn, trực diện vào vấn đề:
            1. Tác động đến Quy luật thị trường (cạnh tranh, cung-cầu, giá cả).
            2. Tác động đến Định hướng XHCN (công bằng xã hội, phát triển bền vững, an sinh).
            3. Tác động đến Vai trò của Nhà nước (điều tiết, quản lý, can thiệp).

            Chính sách: "${policyInput}"
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        marketImpact: { type: Type.STRING, description: "Tác động đến quy luật thị trường" },
                        socialistImpact: { type: Type.STRING, description: "Tác động đến định hướng XHCN" },
                        stateImpact: { type: Type.STRING, description: "Tác động đến vai trò của Nhà nước" },
                    },
                    required: ["marketImpact", "socialistImpact", "stateImpact"],
                },
            },
        });
        
        const resultText = response.text.trim();
        const resultJson = JSON.parse(resultText);
        setSimulationResult(resultJson);

    } catch (e) {
        console.error(e);
        setError("Đã xảy ra lỗi khi phân tích. Vui lòng thử lại.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleResetSimulator = () => {
    setPolicyInput('');
    setSimulationResult(null);
    setError(null);
  };

  return (
    <section className="mb-12">
      <Card>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal mb-6 border-l-4 border-brand-navy pl-4">
          1. Khái niệm Kinh tế thị trường định hướng XHCN ở Việt Nam
        </h2>
        
        <div className="space-y-4 text-justify text-gray-700">
            <p>
                <strong>KTTT ĐHXHCN là gì?</strong> Như đã học ở Chương 2, KTTT là sản phẩm của văn minh nhân loại, là giai đoạn phát triển cao của kinh tế hàng hóa. Đặc trưng cơ bản của nó là sự vận hành theo các quy luật thị trường (cung-cầu, cạnh tranh, giá trị...).
            </p>
            <p>
                Tuy nhiên, không có mô hình KTTT chung cho mọi quốc gia. Mỗi nước sẽ có mô hình phù hợp với điều kiện lịch sử, chính trị, kinh tế - xã hội của mình.
            </p>
            <blockquote className="border-l-4 border-brand-navy/20 pl-4 py-3 my-6 bg-brand-navy/10 text-brand-dark-gray italic">
                <strong>Vậy, KTTT ĐHXHCN ở Việt Nam được định nghĩa là:</strong> Nền kinh tế vận hành theo các quy luật của thị trường, đồng thời góp phần hướng tới từng bước xác lập một xã hội mà ở đó dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo.
            </blockquote>
            <p>
                "Định hướng XHCN" ở đây thực chất là hướng tới các giá trị cốt lõi đó. Đây là những giá trị mà nhân loại nói chung và Việt Nam nói riêng đang phấn đấu. Một điểm nhấn quan trọng là vai trò điều tiết của Nhà nước và sự lãnh đạo của Đảng Cộng sản Việt Nam. Đây là yếu tố đảm bảo cho thị trường vận hành đúng định hướng, phục vụ mục tiêu phát triển đất nước.
            </p>
            <p className="font-semibold text-gray-800 mt-6">
                Mô hình này vừa bao hàm đặc trưng chung của KTTT thế giới, vừa có đặc trưng riêng, phù hợp với lịch sử, trình độ phát triển của Việt Nam. Sau đây chúng ta tìm hiểu sâu hơn từng ý chính với ví dụ thực tế:
            </p>
        </div>

        <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden bg-white">
            {interactiveContent.map(item => (
                <InteractiveItem 
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={() => handleItemClick(item.id)}
                />
            ))}
        </div>

        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Tóm lại:</h3>
            <p className="text-gray-700">
                KTTT ĐHXHCN ở Việt Nam là sự kết hợp giữa việc sử dụng các công cụ hiệu quả của thị trường (cạnh tranh, cung - cầu) với vai trò quản lý, định hướng của Nhà nước dưới sự lãnh đạo của Đảng, nhằm đạt mục tiêu cuối cùng là xây dựng một xã hội phát triển, công bằng, văn minh.
            </p>
        </div>

        {/* Policy Simulator Section */}
        <div className="mt-12 border-t pt-8">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-brand-charcoal mb-4 text-center flex items-center justify-center gap-3">
                <i className="fas fa-flask-vial text-brand-navy"></i>
                "Phòng thí nghiệm" Giả lập Chính sách
            </h3>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
                Hãy thử đóng vai là nhà hoạch định chính sách. Đề xuất một chính sách và xem AI phân tích các tác động giả định của nó.
            </p>
            <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-500 italic">Thử một vài gợi ý:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {policySuggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => setPolicyInput(suggestion)}
                            className="px-4 py-1.5 bg-gray-100 text-brand-dark-gray rounded-full text-xs md:text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy/50 transition-all duration-200"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
            <div className="max-w-xl mx-auto">
                <textarea
                    value={policyInput}
                    onChange={(e) => setPolicyInput(e.target.value)}
                    placeholder="Nhập chính sách giả định của bạn ở đây..."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-colors"
                    rows={3}
                />
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={handleSimulatePolicy}
                        disabled={isLoading}
                        className="w-full sm:flex-1 bg-brand-navy text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang phân tích...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-cogs mr-2"></i> Phân tích tác động
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleResetSimulator}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-undo"></i> Reset
                    </button>
                </div>

                {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}
                
                {simulationResult && (
                    <div className="mt-8 space-y-4 animate-fadeIn">
                        <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg">
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><i className="fas fa-chart-line w-6 text-center mr-2 text-blue-600"></i>Tác động thị trường:</h4>
                            <p className="text-gray-700">{simulationResult.marketImpact}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-l-4 border-green-500 rounded-r-lg">
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><i className="fas fa-flag-checkered w-6 text-center mr-2 text-green-600"></i>Tác động XHCN:</h4>
                            <p className="text-gray-700">{simulationResult.socialistImpact}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-l-4 border-purple-500 rounded-r-lg">
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><i className="fas fa-landmark w-6 text-center mr-2 text-purple-600"></i>Tác động Nhà nước:</h4>
                            <p className="text-gray-700">{simulationResult.stateImpact}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </Card>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Introduction;
