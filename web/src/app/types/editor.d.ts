// types/editor.d.ts
import { Editor } from '@tiptap/react';

export interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export interface Blog {
  id?: string;
  title: string;
  content: string;
  description: string;
  coverImage?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}