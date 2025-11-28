import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, employees, onEdit }) {
  if (!tasks.length) return <div>No tasks yet.</div>;

  return (
    <div className="row">
      {tasks.map((task) => (
        <div key={task.id} className="col-md-6 mb-3">
          <TaskCard task={task} employees={employees} onEdit={() => onEdit(task)} />
        </div>
      ))}
    </div>
  );
}
