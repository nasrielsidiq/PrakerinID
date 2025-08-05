'use client';

import { useState } from 'react';
import Editor from '@/components/Editor';
import ThemeToggle from '@/components/themeToggle';

export default function InternshipCreatePage() {
  const [editorData, setEditorData] = useState({ blocks: [] });

  const handleSubmit = async () => {
    // const res = await fetch('http://localhost:8000/api/internships', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: 'Judul Magang',
    //     description: editorData, // ini dalam bentuk JSON
    //   }),
    // });

    // if (res.ok) {
    //   alert('Berhasil disimpan!');
    // }

    console.log(JSON.stringify(editorData));
    
  };

  return (
    <div className="p-4">
        <div className="hidden">
            <ThemeToggle />
        </div>
      <h1 className="text-2xl font-bold mb-4">Buat Lowongan</h1>
      <Editor onChange={setEditorData} />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </div>
  );
}
