'use client';

import React, { useState } from 'react';
import TiptapEditor from './TipTapEditor';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientPage() {
  const [editorContent, setEditorContent] = useState('');
  const [publishedContent, setPublishedContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handlePublish = () => {
    setPublishedContent(editorContent);
    setIsPublished(true);
  };

  const handleEdit = () => {
    setIsPublished(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <TiptapEditor
          content={editorContent}
          onChange={handleContentChange}
        />
        <div className="flex justify-end">
          <Button 
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Publish
          </Button>
        </div>
      </div>

      {isPublished && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Published Content</CardTitle>
            <Button 
              onClick={handleEdit}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formatted" className="w-full">
              <TabsList>
                <TabsTrigger value="formatted">Formatted</TabsTrigger>
                <TabsTrigger value="raw">Raw HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="formatted">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: publishedContent }}
                />
              </TabsContent>
              <TabsContent value="raw">
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{publishedContent}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}