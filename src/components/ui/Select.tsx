import React from 'react'
import { cn } from '../../utils/cn'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'outline' | 'ghost'
  selectSize?: 'default' | 'sm' | 'lg'
  children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({
  className,
  variant = 'default',
  selectSize = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'border-border bg-background focus:border-primary',
    outline: 'border-2 border-border bg-transparent focus:border-primary',
    ghost: 'border-none bg-muted/50 focus:bg-muted/80'
  }

  const sizes = {
    default: 'h-10 px-3 py-2',
    sm: 'h-8 px-2 py-1 text-sm',
    lg: 'h-12 px-4 py-3'
  }

  return (
    <div className="relative">
      <select
        className={cn(
          'flex w-full appearance-none rounded-lg border text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant],
          sizes[selectSize],
          'pr-8', // Space for arrow
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  )
}

export { Select }
