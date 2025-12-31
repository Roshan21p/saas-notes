// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/Redux/store";
import { logout } from "@/Redux/Slices/AuthSlice"; // if you have / will add
import { clearNotes } from "@/Redux/Slices/NoteSlice";
import { clearTenant } from "@/Redux/Slices/TenantSlice";

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
    dispatch(clearTenant());
    navigate("/");
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

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {/* Notes link */}
            <Button
              variant="outline"
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            >
              <Link to="/notes">Notes</Link>
            </Button>

            {/* Logout */}
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild>
            {/* Login  */}
            <Link to="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
