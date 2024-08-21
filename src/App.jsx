import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Main from './Pages/Main';
import Watch from './Pages/Watch';
import Details from './Pages/Details';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/details/:anime" element={<Details />} />
          <Route path="/watch/:anime/:id" element={<Watch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
