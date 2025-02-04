// src/components/Editor/TableControls.tsx
'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";

interface TableControlsProps {
  editor: Editor;
}

const TableControls = ({ editor }: TableControlsProps) => {
  return (
    <div className="border-t p-2 bg-gray-50 flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        Add Column Before
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        Add Column After
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        Delete Column
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        Add Row Before
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        Add Row After
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        Delete Row
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="text-red-600"
      >
        Delete Table
      </Button>
    </div>
  );
};

export default TableControls;