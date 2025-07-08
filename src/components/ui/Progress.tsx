import React from 'react'
import { cn } from '../../utils/cn'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  animated?: boolean
}

const Progress: React.FC<ProgressProps> = ({
  className,
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showValue = false,
  animated = false,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variants = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    destructive: 'bg-red-500'
  }

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-muted/30',
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            variants[variant],
            animated && 'animate-pulse'
          )}
          style={{
            width: `${percentage}%`,
            background: animated 
              ? `linear-gradient(90deg, ${variants[variant].replace('bg-', '')}, ${variants[variant].replace('bg-', '')}/60, ${variants[variant].replace('bg-', '')})`
              : undefined
          }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-center text-xs text-muted-foreground">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

export { Progress }
