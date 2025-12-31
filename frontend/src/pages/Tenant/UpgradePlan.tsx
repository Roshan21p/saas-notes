import Layout from "@/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Crown, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Redux/store";
import { upgradeTenantPlan } from "@/Redux/Slices/TenantSlice";
import { useNavigate } from "react-router-dom";

function UpgradePlan() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const data = useSelector((state: RootState) => state.tenant.data);
  const isLoading = useSelector((state: RootState) => state.tenant.isLoading);

  const handleUpgrade = async () => {
    if (!data?.slug) return;
    try {
      await dispatch(upgradeTenantPlan({ slug: data.slug })).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to upgrade plan", error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border">
          <div className="text-center mb-6">
            <Crown className="mx-auto text-indigo-600" size={42} />
            <h2 className="text-2xl font-bold mt-4">Upgrade Your Plan</h2>
            <p className="text-slate-600 text-sm mt-2">
              Unlock more notes and features for your team
            </p>
          </div>

          <div className="border rounded-xl p-4 mb-6 space-y-2">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-500">Current plan:</span>{" "}
              <span className="capitalize font-semibold text-slate-900">
                {data?.plan}
              </span>
            </p>

            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-500">Note limit:</span>{" "}
              <span className="font-semibold text-slate-900">
                {data?.noteLimit}
              </span>
            </p>
          </div>

          <Button
            disabled={isLoading}
            onClick={handleUpgrade}
            className="w-full bg-linear-to-r from-indigo-600 to-blue-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Upgrading…
              </>
            ) : (
              "Upgrade to Pro"
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default UpgradePlan;
