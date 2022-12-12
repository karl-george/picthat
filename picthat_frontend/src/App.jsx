import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
}

export default App;
