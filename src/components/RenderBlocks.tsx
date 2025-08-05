'use client';
import * as React from 'react';

type Block = {
  id: string;
  type: string;
  data: any;
};

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'header': {
      const level = block.data?.level;
      const safeLevel = [1, 2, 3, 4, 5, 6].includes(level) ? level : 2;
      const tag = `h${safeLevel}` as keyof React.JSX.IntrinsicElements;

      return React.createElement(
        tag,
        { key: index, className: 'font-bold text-xl mb-2' },
        block.data.text
      );
    }

    case 'paragraph': {
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

    case 'list': {
      const Tag = block.data.style === 'unordered' ? 'ul' : 'ol';

      return (
        <Tag key={index} className="pl-6 list-disc mb-2">
          {block.data.items.map((item: any, i: number) => (
            <li key={i}>{item.content}</li>
          ))}
        </Tag>
      );
    }

    default:
      return (
        <div key={index} className="text-red-500">
          Block <strong>{block.type}</strong> belum didukung.
        </div>
      );
  }
}

export default function DescriptionRenderer({ data }: { data: any }) {
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
