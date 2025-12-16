import { Users, Shield, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Pricing } from "@/components/Pricing/Pricing";
import { Footer } from "@/components/Footer/Footer";
import FeatureCard from "@/components/Feature/FeatureCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex flex-col">
      <Navbar />

      <main className="grow max-w-7xl mx-auto px-4 py-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-slate-900">
            Organize Your Team’s
            <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notes & Ideas
            </span>
          </h1>
          <p className="text-xl text-slate-600 mt-6 max-w-3xl mx-auto">
            Multi-tenant notes platform with role-based access and subscription limits.
          </p>
        </div>

        {/* Features */}
<div className="grid md:grid-cols-3 gap-8 mt-24">
  <FeatureCard
    icon={<Users />}
    title="Multi-Tenant Support"
    description="Isolate data per company while running on a shared, scalable database."
  />

  <FeatureCard
    icon={<Shield />}
    title="Role-Based Access"
    description="Admins and Members have clearly defined permissions for secure collaboration."
  />

  <FeatureCard
    icon={<Zap />}
    title="Secure Authentication"
    description="JWT-based authentication ensures safe and stateless user sessions."
  />
</div>

        <Pricing />
      </main>

      <Footer />
    </div>
  );
}

