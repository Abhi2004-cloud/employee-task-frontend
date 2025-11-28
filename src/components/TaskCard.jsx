import React from 'react';
import { format } from 'date-fns';

export default function TaskCard({ task, employees, onEdit }) {
  const assignee = employees.find((e) => e.id === task.assignee);
  const formattedDate = task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date';
  
  // Get status class based on task status
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="card mb-3 task-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-1">{task.title}</h5>
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {task.status || 'Pending'}
          </span>
        </div>

        {task.description && (
          <p className="card-text text-muted small mb-3">
            {task.description.length > 100
              ? `${task.description.substring(0, 100)}...`
              : task.description}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {assignee ? (
              <div className="avatar me-2">
                {getInitials(assignee.name)}
              </div>
            ) : (
              <div className="avatar me-2 bg-secondary">U</div>
            )}
            <small className="text-muted">
              {assignee ? assignee.name : 'Unassigned'}
            </small>
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <small className={`fw-medium ${'priority-' + (task.priority?.toLowerCase() || 'medium')}`}>
              {task.priority || 'Normal'}
            </small>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
