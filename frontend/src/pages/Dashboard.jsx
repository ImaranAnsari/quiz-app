import React, { useState, useMemo } from 'react';
import '../css/global.css';
import StatCard from '../components/StatCard';
import QuizCard from '../components/QuizCard';
import Modal from '../components/Modal';
import Chart from '../components/Chart';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';
import useQuizzes from '../hooks/useQuizzes';
import useStats from '../hooks/useStats';
import { List, RefreshCw, Star, Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const { quizzes, loading, error } = useQuizzes();
  const stats = useStats(quizzes);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sort, setSort] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [toast, setToast] = useState('');

  const filteredQuizzes = useMemo(() => {
    let q = quizzes;
    if (search) q = q.filter(quiz => quiz.title?.toLowerCase().includes(search.toLowerCase()));
    if (difficulty) q = q.filter(quiz => quiz.difficulty === difficulty);
    if (sort === 'title') q = [...q].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    if (sort === 'attempts') q = [...q].sort((a, b) => (b.attempts || 0) - (a.attempts || 0));
    return q;
  }, [quizzes, search, difficulty, sort]);

  const chartData = useMemo(() =>
    quizzes.map(q => ({ name: q.title || 'Untitled', value: q.attempts || 0 })),
    [quizzes]
  );

  const handleStart = quiz => setToast(`Starting quiz: ${quiz.title}`);
  const handleEdit = quiz => { setSelectedQuiz(quiz); setModalOpen(true); };
  const handleModalClose = () => { setModalOpen(false); setSelectedQuiz(null); };

  return (
    <div className="main">
      <div className="topbar">
        <h2>Dashboard</h2>
        <ThemeToggle />
      </div>

      <div className="stat-cards">
        <StatCard icon={<List size={20} />} label="Total Quizzes" value={stats.totalQuizzes} color="var(--color-primary)" />
        <StatCard icon={<RefreshCw size={20} />} label="Total Attempts" value={stats.totalAttempts} color="var(--color-accent)" />
        <StatCard icon={<Star size={20} />} label="Average Score" value={stats.averageScore} color="var(--color-success)" />
      </div>

      <Chart data={chartData} title="Quiz Attempts" color="var(--color-primary)" />

      <div className="quiz-controls">
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
          <input
            id="dashboard-search"
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '2rem' }}
          />
        </div>
        <select id="dashboard-difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select id="dashboard-sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="attempts">Attempts</option>
        </select>
        <button id="dashboard-create-btn" className="btn" onClick={() => { setModalOpen(true); setSelectedQuiz(null); }}>
          <Plus size={16} /> Create Quiz
        </button>
      </div>

      {loading ? (
        <div className="quiz-grid">
          {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} height={180} />)}
        </div>
      ) : error ? (
        <div className="empty-state">
          <div className="empty-state__icon">⚠️</div>
          <p style={{ color: 'var(--color-danger)' }}>Failed to load quizzes. Please try again.</p>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <p>No quizzes found. Create your first quiz!</p>
          <button className="btn mt-md" onClick={() => { setModalOpen(true); setSelectedQuiz(null); }}>
            <Plus size={16} /> Create Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-grid">
          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz._id} quiz={quiz} onStart={handleStart} onEdit={handleEdit} progress={quiz.completion || 0} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={handleModalClose}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>{selectedQuiz ? 'Edit Quiz' : 'Create Quiz'}</h3>
        <div style={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
          (Quiz form coming soon)
        </div>
        <button className="btn btn--outline" onClick={handleModalClose} id="modal-close-btn">Close</button>
      </Modal>

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
};

export default Dashboard;
