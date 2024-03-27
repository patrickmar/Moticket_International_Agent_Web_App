import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
// import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event-details" element={<EventDetails />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
