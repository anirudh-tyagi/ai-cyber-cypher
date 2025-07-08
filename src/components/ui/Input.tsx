import React from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'ghost'
  inputSize?: 'default' | 'sm' | 'lg'
}

const Input: React.FC<InputProps> = ({
  className,
  variant = 'default',
  inputSize = 'default',
  type,
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
    <input
      type={type}
      className={cn(
        'flex w-full rounded-lg border text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[inputSize],
        className
      )}
      {...props}
    />
  )
}

export { Input }
