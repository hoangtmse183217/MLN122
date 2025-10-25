
import React from 'react';
import type { Question } from '../types';

interface QuizProps {
  quizState: 'idle' | 'active' | 'finished';
  questions: Question[];
  totalTime?: number;
  onStartQuiz?: () => void;
  answers?: { [key: number]: string };
  results?: { [key: number]: boolean | null };
  openHintId?: number | null;
  onAnswerChange?: (questionId: number, answer: string) => void;
  onHintClick?: (questionId: number) => void;
  onSubmitClick?: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  quizState,
  questions,
  totalTime,
  onStartQuiz,
  answers = {},
  results = {},
  openHintId,
  // Fix: Update default function signature to match type definition and accept expected arguments.
  onAnswerChange = (questionId: number, answer: string) => {},
  // Fix: Update default function signature to match type definition and accept expected arguments.
  onHintClick = (questionId: number) => {},
  onSubmitClick = () => {},
}) => {
  if (quizState === 'idle') {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal mb-6 border-l-4 border-brand-navy pl-4">
          Quiz: Bạn đã hiểu đúng?
        </h2>
        <div className="text-center py-12 animate-fadeIn">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Sẵn sàng để kiểm tra kiến thức của bạn?</h3>
          <div className="text-gray-600 space-y-2 mb-8 max-w-xs mx-auto">
            <p className="flex items-center justify-center gap-2"><i className="fas fa-list-ol text-brand-navy w-5 text-center"></i><span>Số câu hỏi: {questions.length}</span></p>
            <p className="flex items-center justify-center gap-2"><i className="fas fa-clock text-brand-navy w-5 text-center"></i><span>Thời gian làm bài: {totalTime ? totalTime / 60 : 0} phút</span></p>
            <p className="flex items-center justify-center gap-2"><i className="fas fa-circle-info text-brand-navy w-5 text-center"></i><span>Bài sẽ tự động nộp khi hết giờ.</span></p>
          </div>
          <button
            onClick={onStartQuiz}
            className="bg-brand-navy text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
          >
            Bắt đầu làm bài
          </button>
        </div>
        <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal mb-6 border-l-4 border-brand-navy pl-4">
        Quiz: Bạn đã hiểu đúng?
      </h2>
      <main>
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} id={`question-${q.id}`} className="pt-2 scroll-mt-24">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold flex-grow">Câu {index + 1}: {q.text}</p>
                {q.hint && quizState === 'finished' && (
                  <button
                    onClick={() => onHintClick(q.id)}
                    className="ml-4 text-sm text-yellow-600 hover:text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-shrink-0 animate-fadeIn"
                    aria-label={`Gợi ý cho câu hỏi ${index + 1}`}
                    aria-expanded={openHintId === q.id}
                  >
                    <i className="fas fa-lightbulb mr-1.5"></i>Gợi ý
                  </button>
                )}
              </div>

              {openHintId === q.id && (
                <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg text-sm animate-fadeIn">
                  <p><span className="font-bold">Gợi ý:</span> {q.hint}</p>
                </div>
              )}

              <div className="space-y-2">
                {Object.entries(q.options).map(([key, value]) => {
                  const isCorrectAnswer = q.correctAnswer === key;
                  const isSelectedAnswer = answers[q.id] === key;

                  let labelClass = 'border-gray-200 hover:bg-gray-100';
                  if (quizState === 'finished') {
                    if (isCorrectAnswer) {
                      labelClass = 'border-green-500 bg-green-100 font-semibold text-green-900';
                    } else if (isSelectedAnswer) {
                      labelClass = 'border-red-500 bg-red-100 text-red-900';
                    } else {
                      labelClass = 'border-gray-200 opacity-60';
                    }
                  }

                  return (
                    <label key={key} className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${labelClass}`}>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={key}
                        checked={isSelectedAnswer}
                        onChange={() => onAnswerChange(q.id, key)}
                        className="form-radio h-5 w-5 text-brand-navy focus:ring-brand-navy"
                        disabled={quizState === 'finished'}
                      />
                      <span className="ml-3 flex-1">{key}. {value}</span>
                      <span className="ml-3 w-5 h-5 flex items-center justify-center text-lg">
                        {quizState === 'finished' && isCorrectAnswer && (
                          <i className="fas fa-check text-green-600"></i>
                        )}
                        {quizState === 'finished' && isSelectedAnswer && !isCorrectAnswer && (
                          <i className="fas fa-xmark text-red-600"></i>
                        )}
                      </span>
                    </label>
                  )
                })}
              </div>
              {quizState === 'finished' && (
                <div className="mt-4 text-sm">
                  {results[q.id] === true && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-3 rounded-r-lg font-medium">
                      <p><i className="fas fa-circle-check mr-2"></i>Chính xác! Lựa chọn của bạn là đúng.</p>
                    </div>
                  )}
                  {results[q.id] === false && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-3 rounded-r-lg font-medium">
                      <p><i className="fas fa-circle-xmark mr-2"></i>Không chính xác. Đáp án đúng là <span className="font-bold">{q.correctAnswer}</span>.</p>
                    </div>
                  )}
                  {answers[q.id] === undefined && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded-r-lg font-medium">
                      <p>Bạn chưa trả lời câu này. Đáp án đúng là <span className="font-bold">{q.correctAnswer}</span>.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {quizState === 'active' && (
          <div className="mt-8 text-center">
            <button
              onClick={onSubmitClick}
              className="bg-brand-navy text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
            >
              Nộp bài
            </button>
          </div>
        )}
      </main>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Quiz;