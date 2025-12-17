import type { RootState } from "@/Redux/store";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

function ActionButtons() {
  const role = useSelector((state : RootState ) => state.auth.role);
  return (
    <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl">
      <button
        onClick={() => {}}
        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        <Plus size={18} />
        New Note
      </button>

      <button className="px-5 py-3 rounded-xl text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50 border-2 border-indigo-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
        My Notes
      </button>

      {role === "Admin" && (
        <>
          <button className="px-5 py-3 rounded-xl text-sm font-medium bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            Invite User
          </button>

          <button className="px-5 py-3 rounded-xl text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50 border-2 border-indigo-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
            All Notes
          </button>
        </>
      )}
    </div>
  );
}

export default ActionButtons;
