import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";   
import SignupPage from "./pages/SignupPage"; 
import Navbar from "./components/Navbar";
import toast from "react-hot-toast"; 

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on app load
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return null;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200"> 
        <Navbar user={user} onLogout={logout} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={!user ? <LoginPage setUser={login} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignupPage setUser={login} /> : <Navigate to="/" />} />
          <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
          <Route path="/note/:id" element={user ? <NoteDetailPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}