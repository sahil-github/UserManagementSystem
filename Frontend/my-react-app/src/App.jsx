// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import SendNotification from './pages/SendNotification';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/send-notification" element={<SendNotification />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;