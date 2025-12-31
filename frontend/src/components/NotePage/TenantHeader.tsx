type TenantHeaderProps = {
  tenantName: string | undefined;
};

function TenantHeader({ tenantName }: TenantHeaderProps) {
  return (
    <div className="mb-10 flex flex-col items-center gap-6">
      <div className="text-center">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 rounded-2xl blur-lg opacity-60"></div>
          <div className="relative px-8 py-6 bg-linear-to-r from bg-indigo-600 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl mb-2 border border-indigo-400/30">
            <h2 className="text-3xl sm:text4xl font-bold text-white drop-shadow-lg">
              {tenantName}
            </h2>
          </div> 
        </div>
      </div>
      <p className="text-base text-indigo-700 font-semibold mt-3 tracking-wide">
        Workspace Notes
      </p>
    </div>
  );
}

export default TenantHeader;
