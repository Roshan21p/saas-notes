import { Mail, Lock, Loader2 } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

type DemoCredentialType =
  | "acme-admin"
  | "acme-member"
  | "globex-admin"
  | "globex-member";

interface LoginPresentationProps {
  handleUserInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loginData: { email: string; password: string };
  isLoading: boolean;
  fillDemoCredentials: (type: DemoCredentialType) => void;
}

export default function LoginPresentation({
  handleUserInput,
  handleFormSubmit,
  loginData,
  isLoading,
  fillDemoCredentials,
}: LoginPresentationProps) {
  const { email, password } = loginData;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            SaaS Notes
          </h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-slate-700 mb-2">
            Demo Credentials:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => fillDemoCredentials("acme-admin")}
              className="w-full text-left px-3 py-2 bg-white rounded border border-slate-200 hover:border-blue-400 transition text-sm"
            >
              <span className="font-medium text-slate-900">Acme Admin:</span>
              <span className="text-slate-600 ml-2">admin@acme.test</span>
            </button>
            <button
              onClick={() => fillDemoCredentials("acme-member")}
              className="w-full text-left px-3 py-2 bg-white rounded border border-slate-200 hover:border-blue-400 transition text-sm"
            >
              <span className="font-medium text-slate-900">Acme Member:</span>
              <span className="text-slate-600 ml-2">user@acme.test</span>
            </button>
            <button
              onClick={() => fillDemoCredentials("globex-admin")}
              className="w-full text-left px-3 py-2 bg-white rounded border border-slate-200 hover:border-blue-400 transition text-sm"
            >
              <span className="font-medium text-slate-900">Globex Admin:</span>
              <span className="text-slate-600 ml-2">admin@globex.test</span>
            </button>
            <button
              onClick={() => fillDemoCredentials("globex-admin")}
              className="w-full text-left px-3 py-2 bg-white rounded border border-slate-200 hover:border-blue-400 transition text-sm"
            >
              <span className="font-medium text-slate-900">Globex Member:</span>
              <span className="text-slate-600 ml-2">user@globex.test</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Password: password</p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-slate-400" size={20} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleUserInput}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@test.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-slate-400" size={20} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleUserInput}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 px-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Login</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
