import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <Router>
      <div className="px-2 py-1">
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
