interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
  const baseStyles = 'bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border';
  const borderStyle = gradient 
    ? 'border-[#3B82F6]/20' 
    : 'border-[#3B82F6]/20';
  const hoverStyle = hover ? 'hover:border-[#14B8A6]/40 transition-colors cursor-pointer' : '';
  
  return (
    <div className={`${baseStyles} ${borderStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}
