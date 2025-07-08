import React from 'react'
import { cn } from '../../utils/cn'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'warning' | 'success'
  className?: string
}

interface AlertTitleProps {
  children: React.ReactNode
  className?: string
}

interface AlertDescriptionProps {
  children: React.ReactNode
  className?: string
}

const alertVariants = {
  default: 'bg-background text-foreground border-border',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  warning: 'border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600',
  success: 'border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600'
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'default', 
  className 
}) => {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
        alertVariants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  return (
    <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)}>
      {children}
    </h5>
  )
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className }) => {
  return (
    <div className={cn('text-sm [&_p]:leading-relaxed', className)}>
      {children}
    </div>
  )
}
