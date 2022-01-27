
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddInvoice from './components/Addinvoice';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/AddInvoice" element={<AddInvoice />}></Route>
          <Route path="/AddInvoice" element={<AddInvoice />}></Route>
          <Route path="*" element={<img width="100%" height="657px" src="" alt="not found" />} />

        </Routes>
      </Router>

    </>
  );
}

export default App;
