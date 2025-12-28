import type { Note } from "@/types/note";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/store";
import NoteItem from "./NoteItem";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  isLoading: boolean
}
function NotesList({ notes, onEdit, onDelete, isLoading }: NotesListProps) { 

    const name = useSelector((state : RootState) => state?.auth?.userData?.name)

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-6 bg-indigo-50 rounded-full mb-4">
          <Plus size={48} className="text-indigo-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {notes.map((note) => (
        <NoteItem  key={note._id} note={note} userName={name || 'Unknown'} onEdit={onEdit} onDelete={onDelete} isLoading={isLoading} />
      ))}
    </div>
  );
}

export default NotesList;