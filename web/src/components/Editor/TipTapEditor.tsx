// src/components/Editor/TipTapEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import MenuBar from './MenuBar';
import { extensions } from './Extensions';
import dynamic from 'next/dynamic';

// Dynamically import components
const EditorFooter = dynamic(() => import('./EditorFooter'), { ssr: false });
const TableControls = dynamic(() => import('./TableControls'), { ssr: false });

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Write something...',
  editable = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions,
    content,
    editable,
    onCreate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    // Fix for SSR hydration
    immediatelyRender: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full border rounded-lg shadow-sm bg-white">
      <MenuBar editor={editor} />
      <div className="border-t p-4 min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
      
      {editor?.isActive('table') && (
        <TableControls editor={editor} />
      )}
      
      <EditorFooter editor={editor} editable={editable} />
    </div>
  );
};

export default TipTapEditor;