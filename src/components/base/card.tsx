// src/components/ui/card.tsx
interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export function Card({ title, children, className = '' }: CardProps) {
    return (
      <div className={`
        rounded-2xl
        bg-zinc-900
        backdrop-blur-lg
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
        border
        border-zinc-800/50
        shadow-2xl
        ${className}
      `}>
        {title && (
          <div className="border-b border-zinc-800/50 p-4">
            <h2 className="text-xl font-medium text-white">{title}</h2>
          </div>
        )}
        <div className={title ? 'p-6' : 'p-4'}>
          {children}
        </div>
      </div>
    );
  }