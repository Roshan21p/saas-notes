import Layout from "@/Layout/Layout";
import { User, Mail, Tag, Hash, Loader2, Check } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface InviteUserPresentationProps {
  inviteUserData: {
    name: string;
    email: string;
    role: "Member";
    slug: string;
  };
  handleUserInput: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

function InviteUserPresentation({
  inviteUserData,
  handleUserInput,
  handleFormSubmit,
  isLoading,
}: InviteUserPresentationProps) {
  const { name, email, role, slug } = inviteUserData;

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT - Info */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold text-slate-900">
              Invite a
              <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                New User!
              </span>
            </h1>
            <p className="text-lg text-slate-600">
              Fill in the details below to send an invitation to join your
              tenant workspace.
            </p>
          </div>

          {/* RIGHT - FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Invite User</h2>
              <p className="text-sm text-slate-600">
                Provide user details and tenant slug to send an invitation.
              </p>
            </div>

            <form noValidate className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleUserInput}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    placeholder="email@company.com"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <select
                    name="role"
                    value={role}
                    onChange={handleUserInput}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="Member">Member</option>
                  </select>
                </div>
              </div>

              {/* Tenant Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Hash
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="slug"
                    type="text"
                    value={slug}
                    onChange={handleUserInput}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="your-tenant-slug"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending Invite...
                  </>
                ) : (
                  <>
                    Send Invite
                    <Check size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default InviteUserPresentation;
