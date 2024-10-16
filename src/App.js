import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageList from './PageList';
import PageDetail from './PageDetail';
import './styles/styles.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageList />} />
        <Route path="/game/:slug" element={<PageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
