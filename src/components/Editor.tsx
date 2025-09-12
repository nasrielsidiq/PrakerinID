"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS, { BlockToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export interface EditorProps {
  onChange: (data: any) => void;
  initialData?: any;
}

export default function Editor({ onChange, initialData }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Cek apakah editor belum diinisialisasi DAN initialData bukan string kosong
    const shouldInitialize =
      !hasInitialized && !editorRef.current && initialData !== "";

    if (shouldInitialize) {
      console.log("panggil - menginisialisasi editor");

      // Tentukan data yang akan digunakan
      const editorData =
        initialData === null || initialData === undefined
          ? undefined
          : initialData;

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          list: {
            class: List as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
        },
        data: editorData,
        onChange: async () => {
          const data = await editor.save();
          onChange(data);
        },
      });

      editorRef.current = editor;
      setHasInitialized(true); // Tandai bahwa editor sudah diinisialisasi
    }
  }, [initialData, onChange, hasInitialized]);

  // Effect terpisah untuk cleanup - hanya saat component unmount
  useEffect(() => {
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div
        id="editorjs"
        className="w-full border border-gray-300 rounded-lg py-4 px-16 min-h-[200px] focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 text-black"
      />
    </div>
  );
}
