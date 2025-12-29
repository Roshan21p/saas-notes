import Layout from "@/Layout/Layout";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";

interface Props {
  password: string;
  confirmPassword: string;
  setPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

function AcceptInvitePresentation({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  handleSubmit,
  isLoading,
}: Props) {
  return (
    <Layout>
      {/*  Full height so footer stays bottom */}
      <div className="flex-1 flex items-center justify-center px-4 bg-linear-to-br from-indigo-50 via-blue-50 to-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Accept Invitation
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Create your password to activate your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Create a strong password"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-blue-600 flex items-center justify-center gap-2 font-semibold hover:shadow-lg transition cursor-pointer"
            >
              Activate Account
              <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AcceptInvitePresentation;
