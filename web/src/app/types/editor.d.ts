// types/editor.d.ts
import { Editor } from '@tiptap/react';

export interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}