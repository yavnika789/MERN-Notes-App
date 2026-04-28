import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon, UserIcon } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-content/5">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tighter hover:opacity-80 transition-all">
            ThinkBoard
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/create" className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg shadow-primary/20">
                  <PlusIcon className="size-4" />
                  <span className="hidden sm:inline">New Note</span>
                </Link>
                
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-base-300">
                    <UserIcon className="size-5" />
                  </div>
                  <ul tabIndex={0} className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-box w-52 border border-base-content/10">
                    <li className="menu-title text-primary">{user.name}</li>
                    <li><button onClick={onLogout} className="text-error gap-2">
                      <LogOutIcon className="size-4" /> Logout
                    </button></li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;