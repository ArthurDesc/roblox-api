import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Définir les variantes avec cva
const buttonVariants = cva(
  'font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95', // Styles de base
  {
    variants: {
      variant: {
        primary: 'bg-[#00A2FF] hover:bg-[#008AE6] text-white shadow-lg',
        secondary: 'bg-[#FF3F3F] hover:bg-[#E62E2E] text-white shadow-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Définir les props du composant
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

// Composant Button
export function Button({ 
  variant, 
  size, 
  className, 
  asChild = false,
  children,
  ...props 
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Exporter buttonVariants pour une utilisation ailleurs
export { buttonVariants }; 