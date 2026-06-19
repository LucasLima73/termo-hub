"use client";

import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[280px] h-[580px] rounded-[44px] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-[3px] shadow-2xl">
        {/* outer bezel */}
        <div className="relative w-full h-full rounded-[42px] bg-black overflow-hidden">
          {/* notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
          </div>
          {/* screen */}
          <div className="absolute inset-[8px] rounded-[36px] overflow-hidden bg-bg">
            {children}
          </div>
          {/* glass reflection */}
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
      {/* side buttons */}
      <div className="absolute left-[-3px] top-[120px] w-[3px] h-[60px] bg-zinc-700 rounded-l-md" />
      <div className="absolute left-[-3px] top-[200px] w-[3px] h-[60px] bg-zinc-700 rounded-l-md" />
      <div className="absolute right-[-3px] top-[160px] w-[3px] h-[90px] bg-zinc-700 rounded-r-md" />
    </div>
  );
}
