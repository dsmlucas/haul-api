import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inspections from './pages/inspections/Inspections';
import Inspection from './pages/inspections/Inspection';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/inspections/:id" element={<Inspection />} />
          <Route path="/" element={<Inspections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
