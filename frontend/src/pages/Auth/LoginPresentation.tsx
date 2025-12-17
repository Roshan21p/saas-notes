import Layout from "@/Layout/Layout";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
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
    <Layout>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT SIDE */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold text-slate-900">
              Welcome
              <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Back!
              </span>
            </h1>
            <p className="text-lg text-slate-600">
              Sign in to collaborate with your team in a secure multi-tenant
              workspace.
            </p>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
              <p className="text-sm text-slate-600">
                Enter your credentials to continue
              </p>
            </div>

            {/* ✅ FORM */}
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleUserInput}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleUserInput}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative text-xs text-center">
                <span className="px-2 bg-white text-slate-500">
                  OR TRY DEMO ACCOUNTS
                </span>
              </div>
            </div>

            {/* Demo Accounts */}
            {/* Demo Credentials */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("acme-admin")}
                  className="text-left px-3 py-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition text-xs cursor-pointer"
                >
                  <div className="font-semibold text-blue-900">Acme Admin</div>
                  <div className="text-blue-700 truncate">admin@acme.test</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("acme-member")}
                  className="text-left px-3 py-2 bg-linear-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition text-xs cursor-pointer"
                >
                  <div className="font-semibold text-indigo-900">
                    Acme Member
                  </div>
                  <div className="text-indigo-700 truncate">user@acme.test</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("globex-admin")}
                  className="text-left px-3 py-2 bg-linear-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition text-xs cursor-pointer"
                >
                  <div className="font-semibold text-purple-900">
                    Globex Admin
                  </div>
                  <div className="text-purple-700 truncate">
                    admin@globex.test
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("globex-member")}
                  className="text-left px-3 py-2 bg-linear-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 hover:border-pink-400 hover:shadow-md transition text-xs cursor-pointer"
                >
                  <div className="font-semibold text-pink-900">
                    Globex Member
                  </div>
                  <div className="text-pink-700 truncate">user@globex.test</div>
                </button>
              </div>
              <p className="text-xs text-center text-slate-500 mt-2">
                All demo accounts use password:{" "}
                <span className="font-semibold">password</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
