import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Main from './Pages/Main';


function App() {

  return (
    <>
      <Router>
      <Navbar />
      <Main/>
    </Router>
    </>
  )
}

export default App
