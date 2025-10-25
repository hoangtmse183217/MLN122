import React from 'react';
import type { Question } from '../types';

interface QuizPanelProps {
  quizState: 'active' | 'finished';
  timeLeft: number;
  answeredCount: number;
  totalQuestions: number;
  answers: { [key: number]: string };
  questions: Question[];
  submissionTime: Date | null;
  correctAnswersCount: number;
  onResetQuiz: () => void;
}

const QuizPanel: React.FC<QuizPanelProps> = ({
  quizState,
  timeLeft,
  answeredCount,
  totalQuestions,
  answers,
  questions,
  submissionTime,
  correctAnswersCount,
  onResetQuiz,
}) => {
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const progressColor = progressPercentage >= 50 ? 'bg-green-500' : 'bg-brand-navy';

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, questionId: string) => {
    event.preventDefault();
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (quizState === 'active') {
    return (
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        {/* Timer */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Thời gian còn lại</p>
          <div className={`mt-2 text-3xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-brand-charcoal'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-semibold text-gray-700">Tiến độ</span>
            <span className="font-medium text-gray-500">{answeredCount} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`${progressColor} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        
        {/* Question Nav */}
        <div>
          <h4 className="font-semibold text-center text-gray-600 mb-4">Danh sách câu hỏi</h4>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, index) => {
              const isAnswered = !!answers[q.id];
              return (
                <a
                  key={q.id}
                  href={`#question-${q.id}`}
                  onClick={(e) => handleNavClick(e, `question-${q.id}`)}
                  aria-label={`Đi đến câu ${index + 1}`}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105
                    ${isAnswered 
                      ? 'bg-brand-navy text-white shadow-sm' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }
                  `}
                >
                  {index + 1}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'finished') {
    const TOTAL_TIME = 20 * 60; // 20 minutes in seconds
    const timeTaken = TOTAL_TIME - timeLeft;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;
    const scoreColor = scorePercentage >= 50 ? 'text-green-500' : 'text-red-500';
    const scoreRingColor = scorePercentage >= 50 ? 'stroke-green-500' : 'stroke-red-500';

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
        <h3 className="font-heading text-xl font-bold text-gray-800 mb-6 text-center">Kết quả bài làm</h3>

        <div className="relative flex items-center justify-center my-4 h-40 w-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="stroke-current text-gray-200" strokeWidth="8" fill="transparent" r={radius} cx="60" cy="60" />
                <circle 
                    className={`stroke-current ${scoreRingColor} transition-all duration-1000 ease-out`}
                    strokeWidth="8" 
                    strokeLinecap="round"
                    fill="transparent" 
                    r={radius} 
                    cx="60" 
                    cy="60" 
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <span className={`absolute text-4xl font-bold ${scoreColor}`}>
                {scorePercentage}<span className="text-2xl">%</span>
            </span>
        </div>

        <p className="text-center font-semibold text-lg text-gray-700 mb-6">
            {scorePercentage >= 80 ? "Xuất sắc!" : scorePercentage >= 50 ? "Làm tốt lắm!" : "Cần cố gắng hơn!"}
        </p>
        
        <div className="space-y-4 text-gray-700 border-t border-b py-4">
            <div className="flex justify-between items-center text-base">
                <span className="font-semibold flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-5 text-center"></i>Số câu đúng</span>
                <span className="font-bold text-gray-800 font-mono">{correctAnswersCount} / {totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center text-base">
                <span className="font-semibold flex items-center gap-2"><i className="fas fa-list-ol text-blue-500 w-5 text-center"></i>Tổng số câu</span>
                <span className="font-bold text-gray-800 font-mono">{totalQuestions}</span>
            </div>
            <div className="flex justify-between items-center text-base">
                <span className="font-semibold flex items-center gap-2"><i className="fas fa-hourglass-half text-purple-500 w-5 text-center"></i>Thời gian làm bài</span>
                <span className="font-bold text-gray-800 font-mono">{formatTime(timeTaken)}</span>
            </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onResetQuiz}
            className="bg-brand-navy text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 w-full flex items-center justify-center gap-2"
          >
            <i className="fas fa-redo"></i>
            Làm lại
          </button>
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
  }

  return null;
};

export default QuizPanel;