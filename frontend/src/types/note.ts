export interface NoteFormData {
  title: string;
  content: string;
}

export interface Note {
  id: string;
  _id: string;
  title: string;
  content: string;
  tenantId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

