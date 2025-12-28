import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface NoteFormProps {
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleFormInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: { title: string; content: string };
  isLoading: boolean;
  onCancel: () => void;
  submitButtonLabel?: string;
  formTitle: string;
}

function NoteForm({
  handleFormSubmit,
  handleFormInput,
  formData,
  isLoading,
  onCancel,
  submitButtonLabel,
  formTitle,
}: NoteFormProps) {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="mb-8 bg-white p-8 rounded-2xl border-2 border-indigo-100 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-linear-to-b from-indigo-600 to-blue-600 rounded-full" />
        <h3 className="text-xl font-bold text-gray-900">{formTitle}</h3>
      </div>

      <input
        name="title"
        type="text"
        placeholder="Enter title..."
        value={formData.title}
        disabled={isLoading}
        onChange={handleFormInput}
        className="w-full mb-4 px-5 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
      />

      <textarea
        name="content"
        placeholder="Write your note content..."
        rows={5}
        value={formData.content}
        disabled={isLoading}
        onChange={handleFormInput}
        className="w-full mb-5 px-5 py-3 border-2 border-indigo-100 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
      />

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-linear-to-r from-indigo-600 to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          {isLoading ? "Saving..." : submitButtonLabel}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NoteForm;
