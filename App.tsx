
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Introduction from './components/Introduction';
import Features from './components/Features';
import Quiz from './components/Quiz';
import QuizPanel from './components/QuizPanel';
import AcademicIntegrityModal from './components/AcademicIntegrityModal';
import FloatingButton from './components/FloatingButton';
import ConfirmationModal from './components/ConfirmationModal';
import ObjectiveNecessity from './components/ObjectiveNecessity';
import Sidebar from './components/Sidebar';
import type { Question } from './types';

const contentSections = [
  { id: 'section-1', title: '1. Khái niệm KTTT ĐHXHCN' },
  { id: 'section-2', title: '2. Tính tất yếu khách quan' },
  { id: 'section-3', title: '3. Các đặc trưng cơ bản' },
];

const questions: Question[] = [
  {
    id: 1,
    text: 'Mô hình KTTT ĐHXHCN ở Việt Nam được xác định là gì?',
    options: {
      A: 'Kinh tế thị trường tư bản chủ nghĩa.',
      B: 'Kinh tế xã hội chủ nghĩa hoàn chỉnh.',
      C: 'Mô hình kinh tế tổng quát trong thời kỳ quá độ.',
      D: 'Kinh tế kế hoạch hóa tập trung.',
    },
    correctAnswer: 'C',
    hint: 'Hãy nhớ rằng Việt Nam đang trong giai đoạn chuyển tiếp lên CNXH, chưa phải là một mô hình đã hoàn thiện.',
  },
  {
    id: 2,
    text: 'Đâu KHÔNG phải là mục tiêu của KTTT ĐHXHCN ở Việt Nam?',
    options: {
      A: 'Dân giàu, nước mạnh.',
      B: 'Dân chủ, công bằng, văn minh.',
      C: 'Tối đa hóa lợi nhuận cho một nhóm nhỏ.',
      D: 'Xây dựng một xã hội phát triển, công bằng, văn minh.',
    },
    correctAnswer: 'C',
    hint: 'Mục tiêu của định hướng XHCN là vì lợi ích của toàn xã hội, không phải của một nhóm riêng lẻ.',
  },
  {
    id: 3,
    text: 'Yếu tố nào đóng vai trò là "phương tiện, công cụ" trong KTTT ĐHXHCN?',
    options: {
      A: 'Định hướng xã hội chủ nghĩa.',
      B: 'Sự điều tiết của Nhà nước.',
      C: 'Thị trường.',
      D: 'Vai trò của Đảng Cộng sản.',
    },
    correctAnswer: 'C',
    hint: 'Chúng ta sử dụng cơ chế nào để vận hành, trao đổi hàng hóa và dịch vụ một cách hiệu quả?',
  },
  {
    id: 4,
    text: 'Trong mô hình KTTT định hướng XHCN ở Việt Nam, mục đích chính của vai trò điều tiết của Nhà nước là gì?',
    options: {
      A: 'Đảm bảo thị trường luôn cạnh tranh gay gắt để tối đa hóa lợi nhuận doanh nghiệp.',
      B: 'Can thiệp để điều chỉnh sai lệch thị trường, bảo đảm công bằng xã hội và phát triển bền vững.',
      C: 'Thực hiện toàn bộ hoạt động sản xuất — thay thế hoàn toàn vai trò doanh nghiệp tư nhân.',
      D: 'Hạn chế mọi hình thức kinh doanh xuyên biên giới để bảo vệ nền sản xuất trong nước.',
    },
    correctAnswer: 'B',
    hint: 'Nhà nước đóng vai trò "trọng tài" để đảm bảo sân chơi công bằng và hướng tới mục tiêu chung, chứ không phải để thay thế người chơi hoặc chỉ cổ vũ cho một bên.',
  },
  {
    id: 5,
    text: '“Định hướng XHCN” trong KTTT ĐHXHCN được hiểu chính xác nhất là:',
    options: {
      A: 'Tiến thẳng ngay lập tức đến hình thái xã hội chủ nghĩa hoàn chỉnh, loại bỏ thị trường.',
      B: 'Dùng thị trường như công cụ kinh tế nhưng hướng các kết quả thị trường phục vụ mục tiêu an sinh, công bằng và phát triển chung.',
      C: 'Ưu tiên hoàn toàn sở hữu nhà nước, không công nhận sở hữu tư nhân.',
      D: 'Trao toàn quyền hoạch định kinh tế cho các doanh nghiệp nhà nước mà không cần sự lãnh đạo của Đảng.',
    },
    correctAnswer: 'B',
    hint: 'Hãy nghĩ về mối quan hệ giữa "công cụ" (thị trường) và "mục tiêu" (dân giàu, nước mạnh, công bằng, văn minh). Định hướng XHCN chính là việc sử dụng công cụ để đạt được mục tiêu đó.',
  },
  {
    id: 6,
    text: 'Xung đột cơ bản cần quản lý trong KTTT ĐHXHCN là gì, và giải pháp phù hợp nhất theo định hướng của mô hình?',
    options: {
      A: 'Xung đột giữa cung và cầu — giải pháp: nhà nước không can thiệp để giá tự điều chỉnh.',
      B: 'Xung đột giữa tăng trưởng và phân phối công bằng — giải pháp: kết hợp cơ chế thị trường với chính sách công bằng (thuế, trợ cấp, an sinh).',
      C: 'Xung đột giữa công nghiệp và nông nghiệp — giải pháp: bỏ nông nghiệp để tập trung phát triển công nghiệp.',
      D: 'Xung đột giữa doanh nghiệp trong nước và FDI — giải pháp: cấm hoàn toàn FDI.',
    },
    correctAnswer: 'B',
    hint: 'Mô hình này luôn tìm cách cân bằng giữa việc "làm ra cái bánh to hơn" (tăng trưởng) và việc "chia bánh sao cho đều" (công bằng xã hội).',
  },
  {
    id: 7,
    text: 'Về vai trò các thành phần kinh tế, thành phần nào giữ vai trò **chủ đạo** trong KTTT ĐHXHCN ở Việt Nam?',
    options: {
      A: 'Kinh tế tư nhân.',
      B: 'Kinh tế nhà nước.',
      C: 'Kinh tế tập thể.',
      D: 'Kinh tế có vốn đầu tư nước ngoài.',
    },
    correctAnswer: 'B',
    hint: 'Đây là công cụ chính để Nhà nước định hướng, điều tiết vĩ mô nền kinh tế.',
  },
  {
    id: 8,
    text: 'Mục tiêu nào sau đây là mục tiêu cốt lõi của KTTT ĐHXHCN ở Việt Nam?',
    options: {
      A: 'Tối đa hóa lợi nhuận cho các doanh nghiệp nhà nước.',
      B: '“Dân giàu, nước mạnh, dân chủ, công bằng, văn minh”.',
      C: 'Ưu tiên tăng trưởng kinh tế bằng mọi giá.',
      D: 'Hạn chế hội nhập quốc tế để bảo hộ sản xuất.',
    },
    correctAnswer: 'B',
    hint: 'Mục tiêu cuối cùng là sự phát triển toàn diện của xã hội, không chỉ riêng về kinh tế.',
  },
  {
    id: 9,
    text: 'Điểm khác biệt cốt lõi trong quan hệ quản lý của KTTT ĐHXHCN so với kinh tế thị trường tự do thuần túy là gì?',
    options: {
      A: 'Nhà nước hoàn toàn không can thiệp vào kinh tế.',
      B: 'Nền kinh tế chỉ do các doanh nghiệp nhà nước vận hành.',
      C: 'Có sự kết hợp giữa quản lý của Nhà nước dưới sự lãnh đạo của Đảng và sự vận hành của các quy luật thị trường.',
      D: 'Các quy luật thị trường bị thay thế hoàn toàn bằng kế hoạch của nhà nước.',
    },
    correctAnswer: 'C',
    hint: 'Hãy nghĩ về sự cân bằng giữa "bàn tay vô hình" của thị trường và "bàn tay hữu hình" của nhà nước có định hướng chính trị.',
  },
  {
    id: 10,
    text: 'Về quan hệ phân phối, nguyên tắc nào giúp phân biệt KTTT ĐHXHCN với chủ nghĩa "bình quân, cào bằng"?',
    options: {
      A: 'Mọi người đều được hưởng phần như nhau bất kể đóng góp.',
      B: 'Phân phối chủ yếu theo kết quả lao động, hiệu quả kinh tế, đồng thời có phân phối lại qua phúc lợi xã hội.',
      C: 'Chỉ những người có vốn mới được hưởng thu nhập.',
      D: 'Nhà nước thu toàn bộ thu nhập rồi chia đều cho mọi người.',
    },
    correctAnswer: 'B',
    hint: 'Mô hình này khuyến khích sự đóng góp và hiệu quả ("làm theo năng lực, hưởng theo lao động") nhưng vẫn đảm bảo lưới an sinh, tránh việc cào bằng máy móc.',
  },
  {
    id: 11,
    text: 'Việc Chính phủ Việt Nam thực hiện chính sách hỗ trợ bảo hiểm y tế cho các hộ nghèo, đồng bào dân tộc thiểu số là biểu hiện trực tiếp của đặc trưng nào?',
    options: {
      A: 'Phát triển đa dạng các hình thức sở hữu.',
      B: 'Kinh tế nhà nước giữ vai trò chủ đạo.',
      C: 'Gắn kết tăng trưởng kinh tế với tiến bộ và công bằng xã hội.',
      D: 'Coi kinh tế tư nhân là một động lực quan trọng.',
    },
    correctAnswer: 'C',
    hint: 'Hãy xem xét chính sách này giải quyết vấn đề xã hội (đảm bảo công bằng, hỗ trợ nhóm yếu thế) như thế nào song song với phát triển kinh tế.',
  },
  {
    id: 12,
    text: 'Một tập đoàn tư nhân như Vingroup đầu tư mạnh vào sản xuất ô tô điện, góp phần vào công cuộc công nghiệp hóa, hiện đại hóa đất nước. Trong mô hình KTTT ĐHXHCN, tập đoàn này được xem là:',
    options: {
      A: 'Mối đe dọa cho vai trò chủ đạo của kinh tế nhà nước.',
      B: 'Một động lực quan trọng của nền kinh tế.',
      C: 'Một bộ phận của kinh tế tập thể.',
      D: 'Một thực thể cần được nhà nước hóa.',
    },
    correctAnswer: 'B',
    hint: 'Hãy nhớ lại vai trò được công nhận chính thức của khu vực kinh tế tư nhân trong mô hình kinh tế hiện nay.',
  },
  {
    id: 13,
    text: 'Tính tất yếu khách quan của việc phát triển KTTT định hướng XHCN ở Việt Nam xuất phát trước hết từ:',
    options: {
      A: 'Ý chí chủ quan của Đảng Cộng sản Việt Nam.',
      B: 'Sự tồn tại khách quan của các điều kiện hình thành kinh tế hàng hóa.',
      C: 'Mong muốn cạnh tranh với các nước tư bản phát triển.',
      D: 'Chính sách ưu đãi đầu tư của Nhà nước.',
    },
    correctAnswer: 'B',
    hint: 'Khi các điều kiện của kinh tế hàng hóa đã tồn tại khách quan, sự phát triển lên kinh tế thị trường là tất yếu, không phụ thuộc vào ý chí chủ quan.',
  },
  {
    id: 14,
    text: 'Việc Việt Nam phát triển KTTT định hướng XHCN là phù hợp với xu thế phát triển chung của nhân loại vì:',
    options: {
      A: 'Kinh tế thị trường tư bản chủ nghĩa đã khắc phục được mọi mâu thuẫn.',
      B: 'Kinh tế thị trường là trình độ phát triển tất yếu của kinh tế hàng hóa.',
      C: 'Mô hình kế hoạch hóa tập trung vẫn hiệu quả hơn.',
      D: 'Thế giới đang quay lại mô hình kinh tế tự cấp tự túc.',
    },
    correctAnswer: 'B',
    hint: 'Theo quy luật, kinh tế hàng hóa phát triển đến mức cao sẽ hình thành kinh tế thị trường — một tất yếu khách quan của loài người.',
  },
  {
    id: 15,
    text: 'Điểm khác biệt cơ bản giữa KTTT định hướng XHCN ở Việt Nam và KTTT tư bản chủ nghĩa là:',
    options: {
      A: 'Việt Nam không chấp nhận quy luật cung – cầu.',
      B: 'Việt Nam xóa bỏ hoàn toàn sở hữu tư nhân.',
      C: 'Việt Nam vận dụng quy luật thị trường nhưng hướng tới mục tiêu công bằng, dân chủ, văn minh.',
      D: 'Việt Nam chỉ áp dụng thị trường trong khu vực nhà nước.',
    },
    correctAnswer: 'C',
    hint: 'Cả hai đều vận hành theo quy luật thị trường, nhưng Việt Nam gắn nó với định hướng xã hội chủ nghĩa – mục tiêu con người và công bằng.',
  },
  {
    id: 16,
    text: 'Vì sao nói phát triển KTTT định hướng XHCN là sự lựa chọn đúng quy luật khách quan trong thời kỳ quá độ ở Việt Nam?',
    options: {
      A: 'Vì mô hình này giúp Việt Nam hội nhập mà vẫn giữ được định hướng phát triển xã hội chủ nghĩa.',
      B: 'Vì đây là con đường nhanh nhất để đạt GDP cao nhất.',
      C: 'Vì mô hình này loại bỏ hoàn toàn vai trò Nhà nước trong quản lý kinh tế.',
      D: 'Vì chỉ có kinh tế tư nhân mới phù hợp với xu hướng toàn cầu hóa.',
    },
    correctAnswer: 'A',
    hint: 'Sự kết hợp giữa quy luật thị trường và định hướng XHCN giúp Việt Nam phát triển kinh tế nhanh, nhưng vẫn đảm bảo mục tiêu công bằng xã hội.',
  },
  {
    id: 17,
    text: 'Việc Việt Nam gia nhập WTO, ký kết CPTPP, EVFTA và thu hút vốn đầu tư từ các tập đoàn như Samsung, Intel, LG thể hiện điều gì?',
    options: {
      A: 'Việt Nam đang từ bỏ mô hình XHCN để chạy theo toàn cầu hóa.',
      B: 'Kinh tế thị trường là tất yếu khách quan trong quá trình hội nhập quốc tế.',
      C: 'Việt Nam chỉ phát triển dựa vào các tập đoàn nước ngoài.',
      D: 'Hội nhập kinh tế không liên quan đến định hướng XHCN.',
    },
    correctAnswer: 'B',
    hint: 'Sự mở cửa hội nhập buộc Việt Nam phải vận hành theo quy luật thị trường, nhưng vẫn theo định hướng XHCN để đảm bảo phát triển bền vững.',
  },
  {
    id: 18,
    text: 'Khi khu vực tư nhân ở Việt Nam đóng góp hơn 40% GDP và tạo hàng chục triệu việc làm, điều đó chứng minh:',
    options: {
      A: 'Nhà nước đã buông lỏng quản lý kinh tế.',
      B: 'Kinh tế thị trường định hướng XHCN phát huy được vai trò động lực phát triển.',
      C: 'Việt Nam chuyển sang kinh tế tư bản chủ nghĩa.',
      D: 'Kinh tế thị trường làm gia tăng bất bình đẳng xã hội.',
    },
    correctAnswer: 'B',
    hint: 'Cơ chế thị trường tạo động lực sản xuất mạnh mẽ, nhưng dưới sự định hướng của Nhà nước, kết quả này phục vụ mục tiêu “dân giàu, nước mạnh, công bằng, văn minh”.',
  },
];
const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showNavConfirmModal, setShowNavConfirmModal] = useState(false);
  const [nextTab, setNextTab] = useState('');
  const [activeSection, setActiveSection] = useState('section-1');

  // Quiz State
  const [quizState, setQuizState] = useState<'idle' | 'active' | 'finished'>('idle');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: boolean | null }>({});
  const [openHintId, setOpenHintId] = useState<number | null>(null);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeTab !== 'content') return;

    const handleScroll = () => {
        const offset = 150; 
        let currentSectionId = contentSections[0].id;
        
        for (const section of contentSections) {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= offset) {
                    currentSectionId = section.id;
                }
            }
        }
        setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const submitAnswers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const newResults: { [key: number]: boolean | null } = {};
    questions.forEach(q => {
        newResults[q.id] = answers[q.id] === q.correctAnswer;
    });

    setResults(newResults);
    setQuizState('finished');
    setSubmissionTime(new Date());
    setOpenHintId(null);
    setShowSubmitConfirmModal(false);
  };

  useEffect(() => {
    if (quizState === 'active') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            if(timerRef.current) clearInterval(timerRef.current);
            submitAnswers();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  const isQuizActive = quizState === 'active';

  const handleTabChange = (tabId: string) => {
    if (isQuizActive && tabId !== 'quiz') {
      setNextTab(tabId);
      setShowNavConfirmModal(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleStart = () => {
    setActiveTab('content');
  };

  const handleConfirmNavigation = () => {
    submitAnswers();
    setActiveTab(nextTab);
    setShowNavConfirmModal(false);
    setNextTab('');
  };

  const handleCancelNavigation = () => {
    setShowNavConfirmModal(false);
    setNextTab('');
  };

  // Quiz handlers
  const startQuiz = () => {
    setAnswers({});
    setResults({});
    setOpenHintId(null);
    setSubmissionTime(null);
    setTimeLeft(TOTAL_TIME);
    setQuizState('active');
  };

  const resetQuiz = () => {
    setAnswers({});
    setResults({});
    setQuizState('idle');
    setOpenHintId(null);
    setSubmissionTime(null);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };
  
  const handleHintClick = (questionId: number) => {
    setOpenHintId(openHintId === questionId ? null : questionId);
  };

  const handleSubmitClick = () => {
    setShowSubmitConfirmModal(true);
  };

  // Quiz derived state for props
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctAnswersCount = Object.values(results).filter(result => result === true).length;

  return (
    <div className="min-h-screen text-brand-dark-gray leading-relaxed flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        {activeTab === 'home' && <Home onStart={handleStart} />}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <div className="sticky top-24">
                <Sidebar sections={contentSections} activeSection={activeSection} />
              </div>
            </aside>
            <div className="lg:col-span-9 xl:col-span-10">
              <div id="section-1" className="scroll-mt-24"><Introduction /></div>
              <div id="section-2" className="scroll-mt-24"><ObjectiveNecessity /></div>
              <div id="section-3" className="scroll-mt-24"><Features onNavigateToQuiz={() => handleTabChange('quiz')} /></div>
            </div>
          </div>
        )}
        {activeTab === 'quiz' && (
          quizState === 'idle' ? (
            <div className="max-w-6xl mx-auto">
              <Quiz
                quizState="idle"
                onStartQuiz={startQuiz}
                questions={questions}
                totalTime={TOTAL_TIME}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
              <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <div className="sticky top-24">
                  <QuizPanel
                    quizState={quizState}
                    timeLeft={timeLeft}
                    answeredCount={answeredCount}
                    totalQuestions={totalQuestions}
                    answers={answers}
                    questions={questions}
                    submissionTime={submissionTime}
                    correctAnswersCount={correctAnswersCount}
                    onResetQuiz={resetQuiz}
                  />
                </div>
              </aside>
              <div className="lg:col-span-9 xl:col-span-10">
                <Quiz
                  quizState={quizState}
                  questions={questions}
                  answers={answers}
                  results={results}
                  openHintId={openHintId}
                  onAnswerChange={handleAnswerChange}
                  onHintClick={handleHintClick}
                  onSubmitClick={handleSubmitClick}
                />
              </div>
            </div>
          )
        )}
      </main>
      <footer className="text-center py-6 bg-white border-t border-gray-200 text-gray-600">
        <p>&copy; 2025. Sản phẩm sáng tạo môn Kinh tế chính trị Mác-Lênin.</p>
      </footer>
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <AcademicIntegrityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ConfirmationModal
        isOpen={showNavConfirmModal}
        onClose={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        title="Xác nhận nộp bài"
        message="Bạn đang trong quá trình làm bài. Chuyển tab sẽ tự động nộp bài của bạn. Bạn có chắc chắn muốn tiếp tục?"
        confirmText="Nộp và chuyển tab"
        cancelText="Ở lại"
      />
      <ConfirmationModal
        isOpen={showSubmitConfirmModal}
        onClose={() => setShowSubmitConfirmModal(false)}
        onConfirm={submitAnswers}
        title="Xác nhận nộp bài"
        message="Bạn có chắc chắn muốn nộp bài không? Bạn sẽ không thể thay đổi câu trả lời của mình sau khi nộp."
        confirmText="Nộp bài"
        cancelText="Hủy"
      />
    </div>
  );
};

export default App;
