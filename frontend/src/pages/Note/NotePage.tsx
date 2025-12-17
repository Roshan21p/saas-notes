import ActionButtons from "@/components/NotePage/ActionButtons";
import TenantHeader from "@/components/NotePage/TenantHeader";
import Layout from "@/Layout/Layout";

function NotePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-10 flex flex-col items-center gap-6">
            <TenantHeader tenantName={"Acme Corporation"} />
            <ActionButtons />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotePage;
