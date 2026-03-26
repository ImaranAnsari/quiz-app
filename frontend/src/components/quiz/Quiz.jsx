import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuiz, deleteQuiz, publishQuiz } from '../../api/Quiz';
import { MoreDetails } from "./MoreDetails";
import ThemeToggle from '../ThemeToggle';
import { Plus, Search, Eye, Pencil, Trash2, Zap } from 'lucide-react';
import '../../css/global.css';

export const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const toggleModal = (_id) => { setSelectedQuizId(_id); setModalOpen(true); };

  async function getQuizList() {
    setLoading(true);
    try {
      let quizD = await getQuiz();
      setQuizzes(quizD.data.data || []);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getQuizList(); }, [flag]);

  const editHandler = (_id) => navigate(`/dashboard/editquiz`, { state: { quizId: _id } });

  const deleteHandler = async (_id) => {
    if (!window.confirm('Delete this quiz?')) return;
    await deleteQuiz({ _id });
    setFlag(!flag);
  };

  const publishHandler = async (_id) => {
    await publishQuiz({ _id });
    setFlag(!flag);
  };

  const filteredQuizzes = useMemo(() => {
    let q = quizzes;
    if (search) q = q.filter(quiz => quiz.quizName?.toLowerCase().includes(search.toLowerCase()));
    if (filter) q = q.filter(quiz => quiz.status === filter);
    return q;
  }, [quizzes, search, filter]);

  return (
    <>
      {isModalOpen && <MoreDetails quizId={selectedQuizId} onRequestClose={() => setModalOpen(false)} />}

      <div className="main">
        <div className="topbar">
          <h2>My Quizzes</h2>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
            <ThemeToggle />
            <button id="add-quiz-btn" className="btn" onClick={() => navigate("/dashboard/addquiz")}>
              <Plus size={16} /> Add Quiz
            </button>
          </div>
        </div>

        <div className="quiz-controls">
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
            <input
              id="quiz-search"
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2rem' }}
            />
          </div>
          <select id="quiz-status-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="quiz-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="quiz-card">
                <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: '40%' }} />
              </div>
            ))}
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <p>No quizzes found. Create your first quiz!</p>
            <button className="btn mt-md" onClick={() => navigate("/dashboard/addquiz")}>
              <Plus size={16} /> Add Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-grid">
            {filteredQuizzes.map((item) => (
              <div className="quiz-card" key={item._id} id={`quiz-item-${item._id}`}>
                <div className="quiz-card__title">{item.quizName}</div>
                <div className="quiz-card__meta">
                  <span>{item.questionsList?.length || 0} questions</span>
                  <span className={`badge ${item.status === 'published' ? 'badge--published' : 'badge--draft'}`}>
                    {item.status || 'draft'}
                  </span>
                </div>
                <div className="quiz-card__actions">
                  <button className="action_button" onClick={() => toggleModal(item._id)} title="View Details" id={`quiz-details-${item._id}`}>
                    <Eye size={15} />
                  </button>
                  <button className="action_button" onClick={() => editHandler(item._id)} title="Edit Quiz" id={`quiz-edit-${item._id}`}>
                    <Pencil size={15} />
                  </button>
                  <button className="action_button" onClick={() => deleteHandler(item._id)} title="Delete Quiz" id={`quiz-delete-${item._id}`} style={{ color: 'var(--color-danger)' }}>
                    <Trash2 size={15} />
                  </button>
                  <button className="action_button" onClick={() => publishHandler(item._id)} title={item.status === 'published' ? 'Unpublish' : 'Publish'} id={`quiz-publish-${item._id}`} style={item.status === 'published' ? { color: 'var(--color-success)' } : {}}>
                    <Zap size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
