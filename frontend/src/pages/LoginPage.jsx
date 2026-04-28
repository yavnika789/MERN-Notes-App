import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Login clicked", { email, password });
  try {
    const res = await api.post("/notes/login", { email, password });
    console.log("Login success:", res.data);
    setUser(res.data.token, res.data.user);
    navigate("/");
  } catch (err) {
    console.error("Login error:", err);
    toast.error(err.response?.data?.message || "Login Failed");
  }
};
  return (
    <div className="flex justify-center items-center py-20">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-content/5">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
          
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Email</span></label>
            <div className="input input-bordered flex items-center gap-2">
              <Mail className="size-4 opacity-50" />
              <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="grow" />
            </div>
          </div>

          <div className="form-control mt-2">
            <label className="label"><span className="label-text font-medium">Password</span></label>
            <div className="input input-bordered flex items-center gap-2">
              <Lock className="size-4 opacity-50" />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="grow" />
            </div>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          
          <p className="text-center text-sm mt-4">
            Don't have an account? <Link to="/signup" className="link link-primary">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;