
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcademicIntegrityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-heading text-2xl font-bold text-brand-charcoal">Phụ lục: Minh bạch AI & Liêm chính Học thuật</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-6 text-sm md:text-base">
          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">1. Cam kết Liêm chính Học thuật (Tiêu chí 4.4)</h4>
            <p className="text-gray-600">Tôi/Chúng tôi cam kết rằng sản phẩm này được thực hiện với sự liêm chính. AI chỉ đóng vai trò hỗ trợ sáng tạo (tạo sơ đồ, quiz, khung sườn web), không thay thế hoàn toàn tư duy phân tích và kiểm chứng thông tin của sinh viên.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">2. Nhật ký sử dụng AI (Tiêu chí 4.1)</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Công cụ AI sử dụng:</strong> <span className="italic text-gray-500">[Google AI Studio, ChatGPT 4, Midjourney,...]</span></li>
              <li><strong>Mục đích sử dụng:</strong> <span className="italic text-gray-500">[Tạo khung sườn code HTML/CSS/React, Lên ý tưởng sơ đồ, Tạo câu hỏi quiz, Tóm tắt nội dung...]</span></li>
              <li><strong>Prompt (Lời nhắc) chính đã sử dụng:</strong>
                <pre className="bg-gray-100 p-3 rounded-md mt-2 text-xs md:text-sm text-gray-800 whitespace-pre-wrap"><code>[Dán prompt chính của bạn vào đây...]</code></pre>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">3. Phân định nội dung (Tiêu chí 4.4)</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Nội dung do AI khởi tạo:</strong> <span className="italic text-gray-500">[Khung sườn trang web, code JavaScript cho quiz, thiết kế sơ đồ...]</span></li>
              <li><strong>Nội dung do Sinh viên biên soạn & chỉnh sửa:</strong> <span className="italic text-gray-500">[Toàn bộ nội dung phân tích lý thuyết, các ví dụ thực tiễn, số liệu cập nhật, phần liên hệ bối cảnh, câu trả lời FAQ...]</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">4. Trách nhiệm & Kiểm chứng thông tin (Tiêu chí 4.2, 4.4)</h4>
            <p className="text-gray-600 mb-2">Tất cả thông tin lý thuyết do AI hỗ trợ tạo ra đã được đối chiếu và kiểm chứng lại dựa trên các nguồn chính thống:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Giáo trình Kinh tế chính trị Mác - Lênin (2021), NXB Chính trị quốc gia Sự thật.</li>
              <li><span className="italic text-gray-500">[Các văn kiện, nghị quyết Đảng có liên quan...]</span></li>
            </ul>
            <p className="text-gray-600 mt-2 font-semibold">Sinh viên chịu trách nhiệm hoàn toàn về tính chính xác của nội dung cuối cùng.</p>
          </div>
        </div>

        <div className="mt-6 text-right border-t pt-4">
            <button
                onClick={onClose}
                className="bg-brand-navy text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
                Đóng
            </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicIntegrityModal;
