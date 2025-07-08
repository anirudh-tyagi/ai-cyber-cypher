import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  children: React.ReactNode
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ 
  className, 
  variant = 'default',
  children,
  ...props 
}) => {
  const variants = {
    default: 'bg-card border-border shadow-sm',
    elevated: 'bg-card border-border shadow-lg',
    outlined: 'bg-card border-2 border-border shadow-none',
    ghost: 'bg-transparent border-none shadow-none'
  }

  return (
    <div
      className={cn(
        'rounded-xl border backdrop-blur-sm transition-all duration-200 w-full min-w-0 hover:shadow-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-4 sm:p-6 pb-2 sm:pb-4', className)}
    {...props}
  >
    {children}
  </div>
)

const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <div className={cn('p-4 sm:p-6 pt-0', className)} {...props}>
    {children}
  </div>
)

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div
    className={cn('flex items-center p-4 sm:p-6 pt-0', className)}
    {...props}
  >
    {children}
  </div>
)

export { Card, CardHeader, CardContent, CardFooter }
