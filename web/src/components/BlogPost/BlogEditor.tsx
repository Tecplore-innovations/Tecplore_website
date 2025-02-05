"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import TiptapEditor from '../Editor/TipTapEditor';
import { Blog } from '../../app/types/editor';
import { Textarea } from "@/components/ui/textarea";

interface BlogEditorProps {
  onSave?: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const handleSave = () => {
    if (title && content && description) {
      const blogData = {
        title,
        content,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        published: false // default to unpublished
      };
      
      onSave?.(blogData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
        <CardDescription>Share your science experiment insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Brief description of your blog post"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-20"
        />
        <TiptapEditor
          content={content}
          onChange={setContent}
        />
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          onClick={handleSave} 
          className="flex items-center"
          disabled={!title || !content || !description}
        >
          <Save className="mr-2 h-4 w-4" />
          Publish Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogEditor;