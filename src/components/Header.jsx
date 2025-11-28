import React from 'react';

export default function Header() {
  return (
    <header className="mb-4">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            TaskFlow
          </a>
          <div className="d-flex align-items-center">
            <div className="avatar me-2">AP</div>
            <span className="fw-medium">Abhishek Palekar</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
