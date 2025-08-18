'use client';
import * as React from 'react';

type Block = {
  id: string;
  type: string;
  data: any;
};

function renderBlock(block: Block, index: number) {
  if (block.type === 'paragraph') {
      const text = block.data?.text;
      const displayText =
        typeof text === 'string' ? (
          <span dangerouslySetInnerHTML={{ __html: text }} />
        ) : (
          JSON.stringify(text)
        );

      return (
        <p key={index} className="mb-2 text-gray-800">
          {displayText}
        </p>
      );
    }


}

export default function DescriptionRendererLite({ data }: { data: any }) {
  if (!data?.blocks?.length)
    return <p className="text-gray-500">Tidak ada deskripsi.</p>;

  return (
    <div className="prose max-w-none">
      {data.blocks.map((block: Block, index: number) =>
        renderBlock(block, index)
      )}
    </div>
  );
}
