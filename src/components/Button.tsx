import clsx from 'clsx'
import Link from 'next/link'

import { ArrowIcon } from '@/components/icons/ArrowIcon'

const variantStyles = {
  primary:
    'rounded-full bg-[#0078d4] py-1 px-3 text-white hover:bg-[#106ebe] dark:bg-[#0078d4] dark:text-white dark:hover:bg-[#2b88d8]',
  secondary:
    'rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
  filled:
    'rounded-full bg-[#0078d4] py-1 px-3 text-white hover:bg-[#106ebe] dark:bg-[#0078d4] dark:text-white dark:hover:bg-[#2b88d8]',
  outline:
    'rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-[#0078d4] hover:text-[#106ebe] dark:text-[#2b88d8] dark:hover:text-[#4fa3e0]',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  arrow?: 'left' | 'right'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
    variantStyles[variant],
    className,
  )

  const arrowIcon = (
    <ArrowIcon
      direction={arrow}
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
      )}
    />
  )

  const inner = (
    <>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
