'use client';

import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';


export interface EditorProps {
  onChange: (data: any) => void;
  initialData?: any;
}

export default function Editor({ onChange, initialData }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          linkTool: LinkTool,
        },
        data: initialData || { blocks: [] },
        onChange: async () => {
          const data = await editor.save();
          onChange(data);
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="border rounded p-4" />;
}
