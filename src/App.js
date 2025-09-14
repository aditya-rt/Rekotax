import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Dashboard/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      {/* Navbar is outside Routes so it is always visible */}
      <Navbar />
      <Routes>
        {/* default home route */}
        <Route path="/" element={<Home />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
