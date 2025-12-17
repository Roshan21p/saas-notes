import ActionButtons from "@/components/NotePage/ActionButtons";
import NoteForm from "@/components/NotePage/NoteForm";
import TenantHeader from "@/components/NotePage/TenantHeader";
import Layout from "@/Layout/Layout";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

interface NoteFormData {
  title: string;
  content: string;
}

function NotePage() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
  });

  const [showForm, setShowForm] = useState(false);

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
  // Form submit handler typed with FormEvent<HTMLFormElement> for accurate form event typing
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Fill the title name");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Fill the content");
      return;
    }

    setIsLoading(true);

    try {
      // TODO : using redux
    } catch (error) {
      console.log("Create note failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-10 flex flex-col items-center gap-6">
            <TenantHeader tenantName={"Acme Corporation"} />
            <ActionButtons onNewNote={() => setShowForm(true)} />
          </div>

          {showForm && (
            <NoteForm
              handleFormSubmit={handleFormSubmit}
              handleFormInput={handleFormInput}
              formData={formData}
              isLoading={isLoading}
              onCancel={() => {
                setShowForm(false);
                setFormData({ title: "", content: "" });
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default NotePage;
