// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/Redux/store";
import { logout } from "@/Redux/Slices/AuthSlice"; // if you have / will add
import { clearNotes } from "@/Redux/Slices/NoteSlice";

export function Navbar() {
  // AppDispatch -> Typed dispatch function that understand async thunks
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // RootState -> Type of the entire Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout()); // clears state + localStorage
    dispatch(clearNotes());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          SaaS Notes
        </Link>

        {/* Login / Logout */}
        {isAuthenticated ? (
          <Button
            variant="outline"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
