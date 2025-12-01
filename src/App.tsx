import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import KnowledgePage from './pages/KnowledgePage';
import TimelinePage from './pages/TimelinePage';
import InteractiveMap from './pages/InteractiveMap';
import CooperationFieldsPage from './pages/CooperationFieldsPage';
import QuizPage from './pages/QuizPage';

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/knowledge', label: 'Kiến Thức', icon: BookOpen },
    { path: '/timeline', label: 'Dòng Thời Gian' },
    { path: '/map', label: 'Bản Đồ' },
    { path: '/cooperation', label: 'Hợp Tác' },
    { path: '/quiz', label: 'Trắc Nghiệm' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-amber-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMzksNjgsNjgsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative">
        <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-2xl border-b-4 border-yellow-500 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="bg-yellow-400 p-2 rounded-full shadow-lg">
                  <BookOpen className="w-6 h-6 text-red-700" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Tư Tưởng Hồ Chí Minh</h1>
                  <p className="text-red-100 text-xs">Đại Đoàn Kết Toàn Dân Tộc</p>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-yellow-400 text-red-900 font-semibold'
                          : 'hover:bg-red-800 text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-red-800 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {isMenuOpen && (
              <nav className="md:hidden mt-4 pb-2 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-yellow-400 text-red-900 font-semibold'
                          : 'hover:bg-red-800 text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="bg-slate-800 text-slate-300 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm">
              © 2025 Tư Tưởng Hồ Chí Minh - Đại Đoàn Kết Toàn Dân Tộc
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/cooperation" element={<CooperationFieldsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
