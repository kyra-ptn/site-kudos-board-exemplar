import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import BoardPage from './components/boardpage/BoardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;

