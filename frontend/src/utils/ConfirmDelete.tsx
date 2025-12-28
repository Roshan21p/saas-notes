import toast, { type Toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

function confirmDelete(onConfirm: () => void, id: string) {
  const toastId = `confirm-delete-${id}`;

  toast.dismiss(toastId);

  toast(
    (t: Toast) => (
      <div className="min-w-62.5 p-4 bg-white">
        <p className="mb-4 text-gray-900">
          Are you sure you want to delete this note?
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    ),
    { id: toastId }
  );
}

export default confirmDelete;
