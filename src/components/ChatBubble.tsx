// src/app/components/ChatBubble.tsx

import React from 'react';

// Perbarui tipe props untuk menyertakan 'variant'
interface ChatBubbleProps {
  message: string;
  timestamp: string;
  variant?: 'sent' | 'received'; // '?' berarti prop ini opsional
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  variant = 'received', // Atur nilai default ke 'received'
}) => {
  // Tentukan apakah ini varian 'sent'
  const isSent = variant === 'sent';

  // --- Logika Kondisional untuk Kelas Tailwind ---

  // Perataan: 'self-end' untuk kanan, 'self-start' untuk kiri
  const bubbleAlignment = isSent ? 'self-end' : 'self-start';

  // Warna latar: biru untuk dikirim, teal untuk diterima
  const bubbleColor = isSent ? 'bg-blue-500' : 'bg-teal-600';

  // Sudut tajam: kanan-atas untuk dikirim, kiri-atas untuk diterima
  const roundedCorner = isSent ? 'rounded-tr-sm' : 'rounded-tl-sm';

  // Posisi "ekor"
  const tailPosition = isSent ? 'right-[-10px]' : 'left-[-10px]';

  // Bentuk dan warna "ekor"
  const tailBorderStyle = isSent
    ? `border-l-[10px] border-l-blue-500` // Segitiga menunjuk ke kiri
    : `border-r-[10px] border-r-teal-600`; // Segitiga menunjuk ke kanan

  return (
    // Gunakan template literal (`) untuk menggabungkan kelas-kelas dinamis
    <div
      className={`relative w-fit max-w-sm rounded-xl px-4 py-2 text-white shadow-md ${bubbleAlignment} ${bubbleColor} ${roundedCorner}`}
    >
      {/* "Ekor" Gelembung */}
      <div
        className={`absolute top-0 h-0 w-0 border-b-[15px] border-b-transparent ${tailPosition} ${tailBorderStyle}`}
      ></div>

      {/* Konten Gelembung */}
      <div>
        <p className="text-base">{message}</p>
        <p className="mt-1 text-right text-xs text-white/80">{timestamp}</p>
      </div>
    </div>
  );
};

export default ChatBubble;