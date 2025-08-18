'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { EditorProps } from '@/components/Editor';
import ThemeToggle from '@/components/themeToggle';

const Editor = dynamic<EditorProps>(() => import('@/components/Editor'), {
  ssr: false,
});

export default function EditorPage() {
  const [editorData, setEditorData] = useState<any>(null);

  const handleEditorChange = (data: any) => {
    setEditorData(data);
    console.log('Editor data:', data);
  };

  return (
    <>
      <div className="hidden">
        <ThemeToggle />
      </div>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Halaman Editor</h1>
        <Editor onChange={handleEditorChange} />

        <pre className="mt-6 bg-gray-100 p-4 rounded">
          {JSON.stringify(editorData, null, 2)}
        </pre>
      </div>
    </>
  );
}
