// src/components/Pricing.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Pricing() {
  return (
    <section className="mt-24">
      <h2 className="text-4xl font-bold text-center text-slate-900">
        Simple, Transparent Pricing
      </h2>
      <p className="text-center text-slate-600 mt-2">
        Same features. Only note limits change.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
        {/* Free */}
        <Card className="border-slate-300">
          <CardHeader>
            <h3 className="text-2xl font-bold">Free</h3>
            <p className="text-4xl font-bold">$0</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Up to 3 notes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                All core features
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className="bg-linear-to-br from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full w-fit">
              Most Popular
            </span>
            <h3 className="text-2xl font-bold mt-2">Pro</h3>
            <p className="text-4xl font-bold">$29</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} />
                Up to 50 notes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} />
                Same features as Free
              </li>
            </ul>
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
              <Link to='/tenant/upgrade'>Upgrade to Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
