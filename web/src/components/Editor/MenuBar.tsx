// components/Editor/MenuBar.tsx
'use client';

import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline, Strikethrough, 
  Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks,
  Link2, Image as ImageIcon, Table as TableIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Code, Quote, Highlighter,
  Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  Undo, Redo, Type
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!editor) {
    return null;
  }

  const addImage = () => {
    setIsImageDialogOpen(true);
  };

  const addLink = () => {
    if (editor.state.selection.empty) {
      // Optional: Show a toast or alert to select text first
      return;
    }
    setIsLinkDialogOpen(true);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
      setLinkUrl('');
      setIsLinkDialogOpen(false);
    }
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      setImageUrl('');
      setIsImageDialogOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="border border-input bg-transparent rounded-t-lg p-1">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1">
          <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('bold') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('italic') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('underline') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('strike') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Headings */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('heading', { level: 1 }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('heading', { level: 2 }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('heading', { level: 3 }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Lists */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('bulletList') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('orderedList') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('taskList') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                >
                  <ListChecks className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Task List</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Alignment */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive({ textAlign: 'left' }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive({ textAlign: 'center' }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive({ textAlign: 'right' }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive({ textAlign: 'justify' }) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Justify</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Special Formatting */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('link') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={addLink}
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Link</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addImage}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Image</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Table</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Advanced Formatting */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('codeBlock') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code Block</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('blockquote') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quote</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('highlight') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                >
                  <Highlighter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Sub/Superscript */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('subscript') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleSubscript().run()}
                >
                  <SubscriptIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Subscript</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive('superscript') ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleSuperscript().run()}
                >
                  <SuperscriptIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Superscript</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="mx-1 h-8" />

          {/* Undo/Redo */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLinkSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-url" className="text-right">
                  URL
                </Label>
                <Input
                  id="link-url"
                  className="col-span-3"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleImageSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-url" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image-url"
                  className="col-span-3"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Image</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default MenuBar;