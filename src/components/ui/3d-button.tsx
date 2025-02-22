/* From Uiverse.io by mahiatlinux */ import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ThreeDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ThreeDButton({ children, className, ...props }: ThreeDButtonProps) {
  return (
    <div className="flex justify-center items-center relative group w-fit">
      {/* Effet de glow en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00A2FF] via-[#0077FF] to-[#0052FF] rounded-[20px] opacity-70 blur-md group-hover:opacity-100 transition-all duration-500 group-hover:duration-200 animate-tilt"></div>
      
      <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px] relative">
        <button
          className={cn(
            "group p-[4px] rounded-[12px]",
            "bg-gradient-to-b from-gray-700 to-gray-600",
            "shadow-[0_2px_4px_rgba(0,0,0,0.7)]",
            "hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)]",
            "hover:translate-y-[-2px]",
            "active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]",
            "active:translate-y-[1px]",
            "active:scale-[0.98]",
            "transition-all duration-300",
            className
          )}
          {...props}
        >
          <div className="relative bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-4 py-3 overflow-hidden">
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            
            <div className="flex gap-2 items-center relative z-10">
              <span className="font-semibold text-white text-lg group-hover:scale-105 transition-transform duration-200">
                {children}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
