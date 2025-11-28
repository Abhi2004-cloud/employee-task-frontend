import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TaskModal({ show, onClose, onSave, employees, task }) {
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    status: 'Open',
    assignee: '',
    priority: 'Medium',
    dueDate: ''
  });

  useEffect(() => {
    if (task) setForm(task);
    else setForm(prev => ({ ...prev, id: uuidv4(), dueDate: '' }));
  }, [task]);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={submit}>
          <div className="modal-header">
            <h5 className="modal-title">{task ? 'Edit Task' : 'New Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="form-label">Title</label>
              <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-control" />
            </div>

            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-control" />
            </div>

            <div className="row g-2">
              <div className="col">
                <label className="form-label">Assignee</label>
                <select value={form.assignee} onChange={(e) => update('assignee', e.target.value)} className="form-select">
                  <option value=''>Unassigned</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              </div>
              <div className="col">
                <label className="form-label">Status</label>
                <select value={form.status} onChange={(e) => update('status', e.target.value)} className="form-select">
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
            </div>

            <div className="row g-2 mt-2">
              <div className="col">
                <label className="form-label">Priority</label>
                <select value={form.priority} onChange={(e) => update('priority', e.target.value)} className="form-select">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="col">
                <label className="form-label">Due Date</label>
                <input type="date" value={form.dueDate || ''} onChange={(e) => update('dueDate', e.target.value)} className="form-control" />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
