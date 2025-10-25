
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const featuresContent = [
  {
    id: 'muc-tieu',
    title: 'a) Về mục tiêu',
    icon: 'fas fa-bullseye',
    points: [
      'Hướng tới phát triển lực lượng sản xuất, xây dựng cơ sở vật chất - kỹ thuật của chủ nghĩa xã hội.',
      'Nâng cao đời sống nhân dân, thực hiện mục tiêu “dân giàu, nước mạnh, dân chủ, công bằng, văn minh”.',
      'Khác với KTTT tư bản chủ nghĩa, KTTT ĐHXHCN phát triển vì con người, vì xã hội, gắn tăng trưởng với tiến bộ và công bằng xã hội.',
      'Sử dụng cơ chế thị trường để giải phóng sức sản xuất, thúc đẩy công nghiệp hóa – hiện đại hóa, xây dựng cơ sở cho CNXH.',
    ]
  },
  {
    id: 'so-huu',
    title: 'b) Về quan hệ sở hữu và thành phần kinh tế',
    icon: 'fas fa-building-columns',
    points: [
      'Tồn tại đa dạng các hình thức sở hữu và thành phần kinh tế, hoạt động bình đẳng trước pháp luật.',
      '<strong>Kinh tế nhà nước:</strong> giữ vai trò <strong>chủ đạo</strong>, là công cụ để Nhà nước định hướng, điều tiết vĩ mô.',
      '<strong>Kinh tế tập thể:</strong> cùng với kinh tế nhà nước tạo thành <strong>nền tảng</strong> vững chắc.',
      '<strong>Kinh tế tư nhân:</strong> được coi là một <strong>động lực quan trọng</strong> của nền kinh tế.',
      'Khuyến khích mọi thành phần kinh tế liên kết, hợp tác, huy động mọi nguồn lực để phát triển.',
    ]
  },
  {
    id: 'quan-ly',
    title: 'c) Về quan hệ quản lý nền kinh tế',
    icon: 'fas fa-gavel',
    points: [
      'Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân, dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.',
      '<strong>Đảng lãnh đạo:</strong> bằng đường lối, chủ trương, bảo đảm định hướng XHCN.',
      '<strong>Nhà nước quản lý:</strong> bằng pháp luật, chiến lược, chính sách và các công cụ kinh tế, tôn trọng quy luật thị trường.',
      '<strong>Mục tiêu điều tiết vĩ mô:</strong> Ổn định kinh tế, khắc phục khuyết tật của thị trường, hỗ trợ nhóm yếu thế, đảm bảo an sinh xã hội.',
    ]
  },
  {
    id: 'phan-phoi',
    title: 'd) Về quan hệ phân phối',
    icon: 'fas fa-chart-pie',
    points: [
      'Thực hiện nhiều hình thức phân phối, trong đó phân phối theo kết quả lao động, hiệu quả kinh tế là chủ yếu.',
      'Phân phối theo mức đóng góp vốn và các nguồn lực khác.',
      'Phân phối lại thông qua hệ thống phúc lợi và an sinh xã hội, thể hiện tính công bằng và định hướng XHCN.',
      'Đảm bảo công bằng trong cơ hội tiếp cận các nguồn lực phát triển cho mọi người dân.',
    ]
  },
  {
    id: 'tang-truong-cong-bang',
    title: 'đ) Về quan hệ giữa tăng trưởng kinh tế và công bằng xã hội',
    icon: 'fas fa-scale-balanced',
    points: [
      'Gắn kết chặt chẽ tăng trưởng kinh tế với tiến bộ và công bằng xã hội ngay trong từng bước, từng chính sách.',
      'Không “hy sinh công bằng để chạy theo tăng trưởng đơn thuần”, nhưng cũng không “cào bằng, chia đều” một cách máy móc.',
      'Công bằng xã hội vừa là mục tiêu, vừa là động lực cho sự phát triển bền vững.',
      'Thực hiện công bằng thông qua chính sách thu nhập, an sinh, phúc lợi và đảm bảo cơ hội phát triển bình đẳng cho mọi người.',
    ]
  },
];


interface FeatureItemProps {
  item: typeof featuresContent[0];
  isActive: boolean;
  onClick: () => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ item, isActive, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 px-5 text-left font-semibold text-brand-charcoal hover:bg-gray-50 focus:outline-none"
        aria-expanded={isActive}
      >
        <span className="flex items-center">
          <i className={`${item.icon} mr-4 text-xl w-6 text-center text-brand-navy`}></i>
          {item.title}
        </span>
        <i className={`fas fa-chevron-down transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="p-4 pl-12 pr-5 text-gray-700">
          <ul className="space-y-3 list-disc list-inside">
            {item.points.map((point, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const GoalEquityFilter: React.FC = () => {
    const [policyInput, setPolicyInput] = useState<string>('Quyết định giảm thuế VAT cho hàng tiêu dùng.');
    const [analysisResult, setAnalysisResult] = useState<{ growthImpact: string; equityImpact: string; } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const policySuggestions = [
        'Miễn thuế TNCN cho người thu nhập thấp.',
        'Giảm lãi suất cho vay doanh nghiệp nhỏ.',
        'Xây thêm bệnh viện công ở vùng xa.',
        'Cho phép FDI vào năng lượng tái tạo.',
    ];

    const handleAnalyze = async () => {
        if (!policyInput.trim()) {
            setError("Vui lòng nhập một chính sách để phân tích.");
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);
        setError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Bạn là một "Công cụ Phân tích Lợi/Hại" (Trade-off Analyzer) trong bối cảnh KTTT ĐHXHCN ở Việt Nam. Phân tích chính sách sau đây và chỉ ra sự đánh đổi (trade-off) giữa hai mặt:
                1. Tác động Tăng trưởng/Hiệu quả: Chính sách này thúc đẩy kinh tế, hiệu quả thị trường như thế nào?
                2. Tác động Công bằng/XHCN: Chính sách này ảnh hưởng đến công bằng xã hội, an sinh, lợi ích của người lao động và các nhóm yếu thế ra sao?

                Chính sách: "${policyInput}"
                `,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            growthImpact: { type: Type.STRING, description: "Tác động đến Tăng trưởng/Hiệu quả" },
                            equityImpact: { type: Type.STRING, description: "Tác động đến Công bằng/XHCN" },
                        },
                        required: ["growthImpact", "equityImpact"],
                    },
                },
            });
            
            const resultText = response.text.trim();
            const resultJson = JSON.parse(resultText);
            setAnalysisResult(resultJson);

        } catch (e) {
            console.error(e);
            setError("Đã xảy ra lỗi khi phân tích. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setPolicyInput('');
        setAnalysisResult(null);
        setError(null);
    };

    return (
        <div className="mt-12 border-t pt-8">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-brand-charcoal mb-4 text-center flex items-center justify-center gap-3">
                <i className="fas fa-filter-circle-dollar text-brand-navy"></i>
                "Bộ lọc" Mục tiêu và Công bằng
            </h3>
            <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
                Kiểm tra cách một chính sách cân bằng giữa <strong>Tăng trưởng</strong> (Thị trường) và <strong>Công bằng</strong> (XHCN). Nhập một hành động kinh tế và xem AI phân tích sự đánh đổi.
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
                    placeholder="Nhập một hành động/chính sách kinh tế..."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-colors"
                    rows={3}
                />
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={handleAnalyze}
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
                                <i className="fas fa-balance-scale mr-2"></i> Phân tích
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-undo"></i> Reset
                    </button>
                </div>

                {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}

                {analysisResult && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <i className="fas fa-chart-line text-blue-600"></i>
                                Mặt Tăng trưởng / Hiệu quả
                            </h4>
                            <p className="text-gray-700">{analysisResult.growthImpact}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-l-4 border-green-500 rounded-r-lg">
                             <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <i className="fas fa-users text-green-600"></i>
                                Mặt Công bằng / XHCN
                            </h4>
                            <p className="text-gray-700">{analysisResult.equityImpact}</p>
                        </div>
                    </div>
                )}
            </div>
             <style>{`
                .animate-fadeIn {
                  animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

interface FeaturesProps {
  onNavigateToQuiz: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigateToQuiz }) => {
    const [activeItem, setActiveItem] = useState<string>('muc-tieu');

    const handleItemClick = (id: string) => {
        setActiveItem(activeItem === id ? '' : id);
    };

  return (
    <section className="mb-12">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal mb-6 border-l-4 border-brand-navy pl-4">
          3. Các đặc trưng cơ bản của KTTT ĐHXHCN ở Việt Nam
        </h2>
        
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden bg-white">
            {featuresContent.map(item => (
                <FeatureItem 
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={() => handleItemClick(item.id)}
                />
            ))}
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-brand-charcoal mb-2 flex items-center">
                <i className="fas fa-flag-checkered mr-3 text-brand-navy"></i>
                Kết luận
            </h3>
            <p className="text-gray-800">
                KTTT định hướng XHCN ở Việt Nam là một mô hình kinh tế đặc sắc, kết hợp hài hòa giữa các quy luật khách quan của thị trường với bản chất ưu việt và các mục tiêu của chủ nghĩa xã hội. Đây là con đường để vừa phát triển kinh tế năng động, hiệu quả, vừa đảm bảo tiến bộ, công bằng xã hội, hướng tới một xã hội Việt Nam hiện đại, nhân văn và phát triển bền vững.
            </p>
        </div>
        
        <GoalEquityFilter />

        <div className="mt-10 text-center">
            <button
                onClick={onNavigateToQuiz}
                className="bg-brand-navy text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
            >
                Ôn tập nội dung đã học
            </button>
        </div>

      </div>
    </section>
  );
};

export default Features;
