import type { Note } from "@/types/note";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/store";

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

function NoteItem({ note, onEdit, onDelete, isLoading }: NoteItemProps) {
  const name = useSelector((state: RootState) => state?.auth?.userData?.name);

  return (
    <div
      key={note?._id}
      className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 relative overflow-hidden group"
    >
      {/* left accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
            {note?.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-3">{note?.content}</p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
              {note?.userId?.name || name}
            </span>
            <span>•</span>
            <span>
              {new Date(note?.createdAt ?? note?.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 ml-4">
          {/* Edit */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(note)}
            disabled={isLoading}
            className="text-indigo-600 hover:bg-indigo-100 rounded-xl hover:scale-110 shadow-sm transition-all cursor-pointer"
          >
            <Edit2 size={18} />
          </Button>

          {/* Delete */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(note?._id)}
            disabled={isLoading}
            className="text-red-600 hover:bg-red-100 rounded-xl hover:scale-110 shadow-sm transition-all cursor-pointer"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
