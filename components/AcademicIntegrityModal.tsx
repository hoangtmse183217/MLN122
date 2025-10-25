import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcademicIntegrityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Đóng modal khi nhấn phím ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Phụ lục: Minh bạch AI & Liêm chính Học thuật
          </h3>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Nội dung */}
        <div className="space-y-6 text-sm md:text-base text-gray-700">
          {/* 1. Cam kết */}
          <section>
            <h4 className="font-semibold text-lg mb-2">
              1. Cam kết Liêm chính Học thuật (Tiêu chí 4.4)
            </h4>
            <p>
              Tôi/Chúng tôi cam kết rằng sản phẩm này được thực hiện với sự liêm
              chính. AI chỉ đóng vai trò hỗ trợ sáng tạo (tạo sơ đồ, quiz, khung
              sườn web), không thay thế hoàn toàn tư duy phân tích và kiểm chứng
              thông tin của sinh viên.
            </p>
          </section>

          {/* 2. Nhật ký sử dụng AI */}
          <section>
            <h4 className="font-semibold text-lg mb-2">
              2. Nhật ký sử dụng AI (Tiêu chí 4.1)
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Công cụ AI sử dụng:</strong>{" "}
                <span className="italic text-gray-500">
                  Google Gemini, ChatGPT.
                </span>
              </li>
              <li>
                <strong>Mục đích sử dụng:</strong>{" "}
                <span className="italic text-gray-500">
                  Tạo khung sườn code HTML/CSS/React, Lên ý tưởng sơ đồ, Tạo câu
                  hỏi quiz, Tóm tắt nội dung...
                </span>
              </li>
            </ul>
          </section>

          {/* 3. Phân định nội dung */}
          <section>
            <h4 className="font-semibold text-lg mb-2">
              3. Phân định nội dung (Tiêu chí 4.4)
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Nội dung do AI khởi tạo:</strong>{" "}
                <span className="italic text-gray-500">
                  Khung sườn trang web, code JavaScript cho quiz, thiết kế sơ
                  đồ...
                </span>
              </li>
              <li>
                <strong>Nội dung do Sinh viên biên soạn & chỉnh sửa:</strong>{" "}
                <span className="italic text-gray-500">
                  Toàn bộ nội dung phân tích lý thuyết, ví dụ thực tiễn, số liệu
                  cập nhật, phần liên hệ bối cảnh, câu trả lời FAQ...
                </span>
              </li>
            </ul>
          </section>

          {/* 4. Trách nhiệm & kiểm chứng */}
          <section>
            <h4 className="font-semibold text-lg mb-2">
              4. Trách nhiệm & Kiểm chứng thông tin (Tiêu chí 4.2, 4.4)
            </h4>
            <p className="mb-2">
              Tất cả thông tin lý thuyết do AI hỗ trợ tạo ra đã được đối chiếu
              và kiểm chứng lại dựa trên các nguồn chính thống:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Giáo trình Kinh tế chính trị Mác - Lênin (2021), NXB Chính trị
                quốc gia Sự thật.
              </li>
              <li>
                <span className="italic text-gray-500">
                  Các văn kiện, nghị quyết Đảng có liên quan...
                </span>
              </li>
            </ul>
            <p className="mt-2 font-semibold text-gray-800">
              Sinh viên chịu trách nhiệm hoàn toàn về tính chính xác của nội
              dung cuối cùng.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className="bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-800 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Hiệu ứng animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AcademicIntegrityModal;
