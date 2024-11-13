import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import ExpensePage from './page/ExpensePage';
import UpdatePage from './page/UpdatePage';
import Report from './page/Report';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-expense" element={<ExpensePage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/statistics" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
