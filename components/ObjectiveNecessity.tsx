import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};

interface ComparisonResult {
  criterion: string;
  model1: string;
  model2: string;
  vietnamModel: string;
}

const ComparisonMatrix: React.FC = () => {
    const availableModels = [
        'Kinh tế thị trường Tự do (Mỹ)',
        'Kinh tế Kế hoạch hóa Tập trung (Liên Xô cũ)',
        'Kinh tế Thị trường Xã hội (Đức)',
        'Kinh tế Hỗn hợp (Bắc Âu)'
    ];

    const [selectedModel1, setSelectedModel1] = useState(availableModels[0]);
    const [selectedModel2, setSelectedModel2] = useState(availableModels[1]);
    const [comparisonData, setComparisonData] = useState<ComparisonResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = async () => {
        if (selectedModel1 === selectedModel2) {
            setError("Vui lòng chọn hai mô hình khác nhau để so sánh.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setComparisonData([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const schema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        criterion: { type: Type.STRING, description: "Tiêu chí so sánh (ví dụ: Mục tiêu tối thượng)" },
                        model1: { type: Type.STRING, description: `Phân tích ngắn gọn cho mô hình ${selectedModel1}` },
                        model2: { type: Type.STRING, description: `Phân tích ngắn gọn cho mô hình ${selectedModel2}` },
                        vietnamModel: { type: Type.STRING, description: "Phân tích ngắn gọn cho mô hình KTTT ĐHXHCN Việt Nam" }
                    },
                    required: ["criterion", "model1", "model2", "vietnamModel"]
                }
            };

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Bạn là một chuyên gia kinh tế chính trị so sánh. Hãy tạo một bảng so sánh giữa 3 mô hình kinh tế: "${selectedModel1}", "${selectedModel2}", và "Kinh tế thị trường định hướng XHCN ở Việt Nam".
                Sử dụng 3-4 tiêu chí so sánh cốt lõi và súc tích nhất, ví dụ: "Mục tiêu tối thượng", "Vai trò của Nhà nước", "Nguyên tắc phân phối", "Hình thức sở hữu chủ đạo".`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            
            const resultText = response.text.trim();
            const resultJson = JSON.parse(resultText);
            setComparisonData(resultJson);

        } catch (e) {
            console.error(e);
            setError("Đã xảy ra lỗi khi tạo ma trận so sánh. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedModel1(availableModels[0]);
        setSelectedModel2(availableModels[1]);
        setComparisonData([]);
        setError(null);
    };

    return (
        <div className="my-6 p-4 border border-brand-navy/20 rounded-lg bg-brand-navy/5">
            <h4 className="font-bold text-lg text-brand-charcoal mb-3 text-center flex items-center justify-center gap-3">
                <i className="fas fa-balance-scale text-brand-navy"></i>
                Ma trận So sánh Mô hình
            </h4>
            <p className="text-sm text-center text-gray-600 mb-4">Chọn 2 mô hình để so sánh với KTTT ĐHXHCN của Việt Nam và xem AI phân tích.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select 
                    value={selectedModel1} 
                    onChange={e => setSelectedModel1(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-brand-navy"
                >
                    {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select 
                    value={selectedModel2} 
                    onChange={e => setSelectedModel2(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-brand-navy"
                >
                    {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    onClick={handleCompare}
                    disabled={isLoading}
                    className="w-full sm:flex-1 bg-brand-navy text-white font-semibold py-2.5 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
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
                            <i className="fas fa-balance-scale-right mr-2"></i> So sánh
                        </>
                    )}
                </button>
                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-gray-200 text-gray-800 font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <i className="fas fa-undo"></i> Reset
                </button>
            </div>

            {error && <p className="mt-4 text-center text-red-600 font-semibold text-sm">{error}</p>}

            {comparisonData.length > 0 && (
                <div className="mt-6 overflow-x-auto animate-fadeIn">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-200 text-gray-800 uppercase font-semibold">
                            <tr>
                                <th scope="col" className="px-4 py-3">Tiêu chí</th>
                                <th scope="col" className="px-4 py-3">{selectedModel1}</th>
                                <th scope="col" className="px-4 py-3">{selectedModel2}</th>
                                <th scope="col" className="px-4 py-3 bg-brand-navy/20">KTTT ĐH XHCN (Việt Nam)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{row.criterion}</th>
                                    <td className="px-4 py-3">{row.model1}</td>
                                    <td className="px-4 py-3">{row.model2}</td>
                                    <td className="px-4 py-3 font-medium text-brand-charcoal">{row.vietnamModel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const necessityPoints = [
  {
    icon: 'fas fa-globe-asia',
    title: '1. Phù hợp với xu hướng phát triển khách quan',
    content: (
        <>
          <p className="mb-2"><strong>Tính quy luật của KTTT:</strong> KTTT là giai đoạn phát triển cao của kinh tế hàng hóa. Khi có đủ điều kiện, nó sẽ tự hình thành và phát triển. Ở Việt Nam, các điều kiện này đã tồn tại khách quan, do đó sự hình thành KTTT là tất yếu.</p>
          <p className="mb-2"><strong>Định hướng XHCN:</strong> Mong muốn "dân giàu, nước mạnh, dân chủ, công bằng, văn minh" là mục tiêu chung. Việc định hướng KTTT để đạt được các giá trị đó là phù hợp và tất yếu.</p>
          <p className="mb-2"><strong>Bối cảnh quốc tế:</strong> KTTT tư bản chủ nghĩa đang có xu hướng tự phủ định. Sự lựa chọn mô hình KTTT ĐHXHCN của Việt Nam là phù hợp với xu thế thời đại, không mâu thuẫn với tiến trình phát triển của đất nước.</p>
          <div className="mt-3 bg-gray-100 border-l-4 border-gray-300 p-3 rounded-r-lg text-sm">
            <p className="font-semibold">Ví dụ:</p>
            <p className="italic">Việt Nam gia nhập WTO (2007) và ký các FTA (CPTPP, EVFTA...) đã mở cửa thị trường, thu hút vốn FDI mạnh mẽ (Samsung, Intel...). KTTT phát triển tất yếu để hội nhập với thế giới.</p>
          </div>
        </>
    )
  },
  {
    icon: 'fas fa-rocket',
    title: '2. Do tính ưu việt của kinh tế thị trường',
    content: (
      <>
        <p className="mb-2"><strong>Phương thức hiệu quả:</strong> KTTT là phương thức phân bổ nguồn lực hiệu quả nhất mà loài người đạt được. Nó luôn là động lực thúc đẩy lực lượng sản xuất phát triển nhanh, kích thích tiến bộ kỹ thuật, nâng cao năng suất và chất lượng sản phẩm.</p>
        <p className="mb-2"><strong>Công cụ để đạt mục tiêu XHCN:</strong> Sự phát triển của KTTT không mâu thuẫn với mục tiêu của CNXH. Việt Nam cần phát triển KTTT để thúc đẩy lực lượng sản xuất, thực hiện mục tiêu "dân giàu, nước mạnh...". Đây là sự lựa chọn cách làm đúng quy luật để đi đến mục tiêu cuối cùng.</p>
        <div className="mt-3 bg-gray-100 border-l-4 border-gray-300 p-3 rounded-r-lg text-sm">
          <p className="font-semibold">Ví dụ:</p>
          <p className="italic">Do áp dụng cơ chế thị trường, khu vực kinh tế tư nhân bùng nổ, đóng góp hơn 40% GDP, tạo hàng triệu việc làm. Điều này giúp kinh tế tăng trưởng nhanh, tạo nguồn lực để Nhà nước thực hiện các mục tiêu XHCN như giảm nghèo, mở rộng BHYT.</p>
        </div>
      </>
    )
  },
  {
    icon: 'fas fa-users',
    title: '3. Phù hợp với khát vọng của người dân',
    content: (
      <>
        <p className="mb-2"><strong>Hiện thực hóa khát vọng:</strong> Phát triển KTTT ĐHXHCN phù hợp với nguyện vọng "dân giàu, nước mạnh..." của người dân. Để hiện thực hóa khát vọng đó, việc thực hiện KTTT hướng tới các giá trị mới là tất yếu khách quan.</p>
        <p className="mb-2"><strong>Tác động tích cực:</strong> KTTT phá vỡ tính tự cấp, tự túc; đẩy mạnh phân công lao động; tạo việc làm; thúc đẩy lực lượng sản xuất; khuyến khích sáng tạo và sử dụng hiệu quả nguồn lực. Điều này hoàn toàn phù hợp với mong muốn của người dân Việt Nam.</p>
        <div className="mt-3 bg-gray-100 border-l-4 border-gray-300 p-3 rounded-r-lg text-sm">
          <p className="font-semibold">Ví dụ:</p>
          <p className="italic">Sự phát triển của thương mại – dịch vụ hiện đại (Vinmart, Shopee) và y tế – giáo dục tư nhân đã đáp ứng nhu cầu ngày càng cao về đời sống, việc làm, thu nhập, hiện thực hóa mong muốn "dân giàu, nước mạnh...".</p>
        </div>
      </>
    )
  }
];

const ObjectiveNecessity: React.FC = () => {
  return (
    <section className="mb-12">
      <Card>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal mb-6 border-l-4 border-brand-navy pl-4">
          2. Tính tất yếu khách quan của việc phát triển mô hình này
        </h2>
        <div className="space-y-4 text-justify text-gray-700">
            <p>
              Việc lựa chọn phát triển KTTT ĐHXHCN ở Việt Nam không phải là một ý muốn chủ quan, mà là một <strong>đòi hỏi tất yếu, khách quan</strong>, xuất phát từ cả cơ sở lý luận và thực tiễn sâu sắc của đất nước. Dưới đây là ba lý do chính:
            </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {necessityPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                <i className={`${point.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{point.title}</h3>
                <div className="text-gray-700 text-justify space-y-2">{point.content}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 border-t-2 border-gray-200 pt-8">
            <ComparisonMatrix />
        </div>

        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Tóm lại:</h3>
            <p className="text-gray-700">
                Sự ra đời của mô hình KTTT định hướng XHCN là một bước ngoặt, một lựa chọn chiến lược phù hợp với quy luật phát triển, với bối cảnh lịch sử của Việt Nam và xu thế chung của thời đại.
            </p>
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

export default ObjectiveNecessity;