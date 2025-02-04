// src/components/Editor/EditorFooter.tsx
'use client';

import React from 'react';
import { Editor } from '@tiptap/react';

interface EditorFooterProps {
  editor: Editor | null;
  editable: boolean;
}

const EditorFooter = ({ editor, editable }: EditorFooterProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-t p-2 text-sm text-gray-500 flex justify-between items-center">
      <div>
        Characters: {editor.storage.characterCount.characters() ?? 0} /
        Words: {editor.storage.characterCount.words() ?? 0}
      </div>
      {!editable && (
        <div className="text-sm text-amber-600">Read-only mode</div>
      )}
    </div>
  );
};

export default EditorFooter;