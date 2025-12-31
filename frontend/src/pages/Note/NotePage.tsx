import ActionButtons from "@/components/NotePage/ActionButtons";
import NoteForm from "@/components/NotePage/NoteForm";
import NotesList from "@/components/NotePage/NoteList";
import TenantHeader from "@/components/NotePage/TenantHeader";
import Layout from "@/Layout/Layout";
import {
  createNote,
  deleteNote,
  fetchAllNotesAdmin,
  fetchMyNotes,
  updateMyNotes,
} from "@/Redux/Slices/NoteSlice";
import type { AppDispatch, RootState } from "@/Redux/store";
import type { NoteFormData } from "@/types/note";
import confirmDelete from "@/utils/ConfirmDelete";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function NotePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { notes, isLoading } = useSelector((state: RootState) => state.notes);

    const name = useSelector((state: RootState) => state?.tenant?.data?.name);


  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
  });

  // Track note being edited; null means create mode
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (notes.length === 0) {
      dispatch(fetchMyNotes());
    }
  }, [dispatch]);

  // Handler for input changes, typed for input element change event
  function handleFormInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // When user clicks "Edit" on a note
  function handleEdit(note: { _id: string; title: string; content: string }) {
    setEditingNoteId(note._id);
    setFormData({ title: note.title, content: note.content });
    setShowForm(true);
  }

  // Handle delete note function
  async function handleDelete(id: string) {
    confirmDelete(async () => {
      try {
        await dispatch(deleteNote(id)).unwrap();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }, id);
  }

  // Form submit handler typed with FormEvent<HTMLFormElement> for accurate form event typing
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Fill the title name");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Fill the content");
      return;
    }

    try {
      if (editingNoteId) {
        // Update note
        const apiResponse = await dispatch(
          updateMyNotes({ id: editingNoteId, ...formData })
        ).unwrap();

        if (apiResponse?.success) {
          setFormData({
            title: "",
            content: "",
          });
          setEditingNoteId(null);
          setShowForm(false);
          return;
        }
      } else {
        // Create new note
        // unwrap returns only fulfilled payload and remove payload
        const apiResponse = await dispatch(createNote(formData)).unwrap();

        if (apiResponse?.success) {
          setFormData({
            title: "",
            content: "",
          });
          setShowForm(false);
          return;
        }
      }
    } catch (error) {
      console.log("Create note failed", error);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-10 flex flex-col items-center gap-6">
            <TenantHeader tenantName={name} />
            <ActionButtons
              onNewNote={() => {
                setEditingNoteId(null);
                setFormData({ title: "", content: "" });
                setShowForm(true);
              }}
              onFetchNotes={() => dispatch(fetchMyNotes())}
              onFetchNotesAdmin={() => dispatch(fetchAllNotesAdmin())}
              isLoading={isLoading}
            />
          </div>

          {showForm && (
            <NoteForm
              handleFormSubmit={handleFormSubmit}
              handleFormInput={handleFormInput}
              formData={formData}
              isLoading={isLoading}
              onCancel={() => {
                setShowForm(false);
                setEditingNoteId(null);
                setFormData({ title: "", content: "" });
              }}
              submitButtonLabel={editingNoteId ? "Update Note" : "Create Note"}
              formTitle={editingNoteId ? "Edit Note" : "Create New Note"}
            />
          )}
          <NotesList
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
}

export default NotePage;
