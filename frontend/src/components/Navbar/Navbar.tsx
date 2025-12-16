// src/components/Navbar.tsx
import { Button } from "@/components/ui/button";

export function Navbar() {
  const isAuthenticated = false; // later from auth context

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          SaaS Notes
        </span>

        {/* Login / Logout */}
        {isAuthenticated ? (
          <Button variant="outline">Logout</Button>
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </nav>
  );
}
