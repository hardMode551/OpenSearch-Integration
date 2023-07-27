import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import TablePage from './pages/TablePage';
import CommentDetails from './components/CommentDetails';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/comment/:id" element={<CommentDetails />} />
    </Routes>
  );
}

export default App;
