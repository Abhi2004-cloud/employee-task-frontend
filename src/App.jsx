import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-4">
        <div className="container">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}

export default App;
