import type { RootState } from "@/Redux/store";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ActionButtonsProps {
  onNewNote: () => void;
  onFetchNotes: () => void;
  onFetchNotesAdmin: () => void;
  isLoading: boolean;
}

function ActionButtons({
  onNewNote,
  onFetchNotes,
  onFetchNotesAdmin,
  isLoading,
}: ActionButtonsProps) {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl">
      {/* New Note */}
      <Button
        onClick={onNewNote}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
      >
        <Plus size={18} />
        New Note
      </Button>

      {/* My Notes */}
      <Button
        variant="outline"
        onClick={onFetchNotes}
        disabled={isLoading}
        className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-700 border-indigo-200 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
      >
        My Notes
      </Button>

      {role === "Admin" && (
        <>
          {/* Invite User */}
          <Button
            variant="outline"
            disabled={isLoading}
            className="px-5 py-3 rounded-xl text-sm font-medium text-blue-700 border-blue-200 shadow-md hover:bg-blue-50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Link to="/tenant/invite">Invite User</Link>
          </Button>

          {/* All Notes */}
          <Button
            variant="outline"
            onClick={onFetchNotesAdmin}
            disabled={isLoading}
            className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-700 border-indigo-200 shadow-md hover:bg-indigo-50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            All Notes
          </Button>
        </>
      )}
    </div>
  );
}

export default ActionButtons;
