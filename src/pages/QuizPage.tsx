import { useEffect, useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { supabase, QuizQuestion } from '../lib/supabase';

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setQuestions(data || []);
      setAnsweredQuestions(new Array(data?.length || 0).fill(false));
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-slate-600">Không có câu hỏi nào.</p>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Kết Quả Trắc Nghiệm</h1>
              <p className="text-purple-100 mt-2">Chúc mừng bạn đã hoàn thành bài trắc nghiệm!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl font-bold text-white">{score}/{questions.length}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Điểm của bạn</h2>
            <p className="text-xl text-slate-600">
              Bạn đã trả lời đúng {score} / {questions.length} câu hỏi ({percentage.toFixed(0)}%)
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {percentage >= 80 && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <p className="text-lg font-semibold text-green-800">Xuất sắc!</p>
                <p className="text-green-700">Bạn đã nắm vững kiến thức về tư tưởng Hồ Chí Minh.</p>
              </div>
            )}
            {percentage >= 50 && percentage < 80 && (
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
                <p className="text-lg font-semibold text-blue-800">Khá tốt!</p>
                <p className="text-blue-700">Bạn đã hiểu khá tốt về nội dung bài học.</p>
              </div>
            )}
            {percentage < 50 && (
              <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-6">
                <p className="text-lg font-semibold text-amber-800">Cần cố gắng thêm!</p>
                <p className="text-amber-700">Hãy xem lại kiến thức và thử lại nhé.</p>
              </div>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answeredQuestions[currentQuestion];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <Award className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Trắc Nghiệm Kiến Thức</h1>
            <p className="text-purple-100 mt-2">Kiểm tra hiểu biết của bạn</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-purple-100">Tiến độ:</span>
          <div className="flex-1 bg-purple-800 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-purple-100 font-semibold">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct_answer;
            const showCorrect = isAnswered && isCorrect;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            let buttonClass = 'bg-slate-50 border-slate-300 hover:border-purple-500 hover:bg-purple-50';
            if (showCorrect) {
              buttonClass = 'bg-green-50 border-green-500';
            } else if (showIncorrect) {
              buttonClass = 'bg-red-50 border-red-500';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${buttonClass} ${
                  isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
                } flex items-center justify-between`}
              >
                <span className="text-slate-800 font-medium">{option}</span>
                {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
            <p className="text-blue-900 font-semibold mb-2">Giải thích:</p>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
