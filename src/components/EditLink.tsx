'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SocialGitHubIcon } from '@/components/icons/SocialGitHubIcon'

export function EditLink() {
  const pathname = usePathname()
  const editUrl = `https://github.com/PowerPlatformToolBox/pptb-docs-web/edit/main/src/app${pathname}/page.mdx`

  return (
    <Link
      href={editUrl}
      className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
      target="_blank"
      rel="noopener noreferrer"
      title="Edit this page on GitHub"
    >
      <SocialGitHubIcon className="h-4 w-4 fill-zinc-600 transition group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-200" />
      <span>Edit this page on GitHub</span>
    </Link>
  )
}
