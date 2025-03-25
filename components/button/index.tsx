import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "p-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
