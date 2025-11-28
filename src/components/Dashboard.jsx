import React, { useEffect, useState } from 'react';
import { fetchAll, saveTask } from '../services/mockApi';
import EmployeeList from './EmployeeList';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await fetchAll();
        if (!mounted) return;
        setEmployees(data.employees);
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => (mounted = false);
  }, []);

  const handleCreate = () => {
    setEditTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleSave = async (task) => {
    try {
      const saved = await saveTask(task);
      setTasks((prev) => {
        const exists = prev.find((t) => t.id === saved.id);
        if (exists) {
          return prev.map((t) => (t.id === saved.id ? saved : t));
        } else {
          return [saved, ...prev];
        }
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Filter tasks based on search term and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="h4 mb-1">Task Management</h2>
              <p className="text-muted mb-0">Manage your team's tasks</p>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleCreate}
            >
              + New Task
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <div className="row align-items-center">
                <div className="col-md-6 mb-2 mb-md-0">
                  <h5 className="mb-0">Tasks</h5>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-body">
              {filteredTasks.length > 0 ? (
                <TaskList tasks={filteredTasks} employees={employees} onEdit={handleEdit} />
              ) : (
                <div className="text-center py-5">
                  <div className="mb-3 text-muted">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="12" y1="10" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <h5 className="text-muted">No tasks found</h5>
                  <p className="text-muted mb-3">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'No tasks match your criteria.'
                      : 'Get started by creating a new task.'}
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleCreate}
                  >
                    Create Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Team Members</h5>
            </div>
            <div className="card-body p-0">
              <EmployeeList employees={employees} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          employees={employees}
          task={editTask}
        />
      )}
    </div>
  );
}
