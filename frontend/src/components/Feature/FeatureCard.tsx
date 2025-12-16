import type React from "react";

type FeatureProps = {
    icon: React.ReactNode,
    title: string,
    description: string
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-white p-8 rounded-xl border-slate-200 shadow-sm hover:shadow-xl transition">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-4">{title}</h3>

      <p className="text-slate-600 mt-2">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
