import React from 'react'
import { cn } from '../../utils/cn'
import { LucideIcon } from 'lucide-react'

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

const StatCard: React.FC<StatCardProps> = ({
  className,
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'border-border',
    success: 'border-green-500/20 bg-green-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
    destructive: 'border-red-500/20 bg-red-500/5'
  }

  const trendColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-muted-foreground'
  }

  const getTrendColor = (value: number) => {
    if (value > 0) return trendColors.positive
    if (value < 0) return trendColors.negative
    return trendColors.neutral
  }

  return (
    <div
      className={cn(
        'rounded-xl border bg-card/50 p-6 shadow-sm transition-all duration-200 hover:shadow-md',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <span className={cn('text-xs font-medium', getTrendColor(trend.value))}>
                {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  )
}

export { StatCard }
