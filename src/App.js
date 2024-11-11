import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import ExpensePage from './page/ExpensePage';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-expense" element={<ExpensePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
