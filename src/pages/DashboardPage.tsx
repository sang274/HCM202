import { Link } from 'react-router-dom';
import { BookOpen, Clock, Globe2, MessageSquare, Award } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Tư Tưởng Hồ Chí Minh</h1>
        <p className="text-xl text-red-100">
          Về Đại Đoàn Kết Toàn Dân Tộc và Đoàn Kết Quốc Tế
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/knowledge"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-red-500"
        >
          <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-red-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Kiến Thức</h3>
          <p className="text-slate-600">
            Tìm hiểu chi tiết về tư tưởng Hồ Chí Minh và vận dụng trong giai đoạn hiện nay
          </p>
        </Link>

        <Link
          to="/timeline"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-blue-500"
        >
          <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-7 h-7 text-blue-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Dòng Thời Gian</h3>
          <p className="text-slate-600">
            Theo dõi các sự kiện lịch sử quan trọng và các Đại hội Đảng
          </p>
        </Link>

        <Link
          to="/map"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-green-500"
        >
          <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
            <Globe2 className="w-7 h-7 text-green-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Bản Đồ Tương Tác</h3>
          <p className="text-slate-600">
            Khám phá các địa điểm liên quan đến đoàn kết dân tộc
          </p>
        </Link>

        <Link
          to="/cooperation"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-amber-500"
        >
          <div className="bg-amber-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="w-7 h-7 text-amber-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Lĩnh Vực Hợp Tác</h3>
          <p className="text-slate-600">
            Tìm hiểu các lĩnh vực hợp tác và đoàn kết quốc tế
          </p>
        </Link>

        <Link
          to="/quiz"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-purple-500"
        >
          <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-purple-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Trắc Nghiệm</h3>
          <p className="text-slate-600">
            Kiểm tra kiến thức của bạn với các câu hỏi trắc nghiệm
          </p>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Giới Thiệu</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế là một trong những
            giá trị cốt lõi của cách mạng Việt Nam. Trong giai đoạn hiện nay, việc vận dụng sáng tạo
            những tư tưởng này có ý nghĩa quan trọng đối với sự nghiệp xây dựng và bảo vệ Tổ quốc.
          </p>
          <p>
            Hệ thống này được xây dựng để giúp bạn tìm hiểu, nghiên cứu và nắm vững các quan điểm,
            chủ trương của Đảng về đại đoàn kết dân tộc và đoàn kết quốc tế.
          </p>
        </div>
      </div>
    </div>
  );
}
