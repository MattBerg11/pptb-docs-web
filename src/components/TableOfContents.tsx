'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ArrowIcon } from '@/components/icons/ArrowIcon'

interface Heading {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<Heading[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Find all h2, h3, h4 headings in the main content
    const main = document.querySelector('main')
    if (!main) return

    const headingElements = main.querySelectorAll('h2, h3, h4')
    const extractedHeadings: Heading[] = []

    headingElements.forEach((element) => {
      const level = parseInt(element.tagName[1])
      const id =
        element.id ||
        element.textContent?.toLowerCase().replace(/\s+/g, '-') ||
        ''

      if (id && element.textContent) {
        extractedHeadings.push({
          id,
          title: element.textContent,
          level,
        })

        // Set id on element if not already set
        if (!element.id) {
          element.id = id
        }
      }
    })

    setHeadings(extractedHeadings)
    // Close mobile menu when pathname changes
    setIsOpen(false)
  }, [pathname])

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Mobile view */}
      <div className="fixed top-14 right-0 z-20 mx-4 mb-6 bg-white shadow-sm sm:mx-6 lg:left-72 lg:mx-8 xl:hidden dark:bg-zinc-900">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
        >
          On this page
          <ArrowIcon
            direction={isOpen ? 'up' : 'down'}
            className="h-4 w-4 transition-transform"
          />
        </button>
        {isOpen && (
          <nav
            aria-labelledby="mobile-toc-title"
            className="mt-2 max-h-[calc(100vh-10rem)] overflow-y-auto rounded-lg bg-white p-2 shadow-lg dark:bg-zinc-800"
          >
            <ul role="list" className="space-y-1 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                >
                  <Link
                    href={`#${heading.id}`}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block rounded px-2 py-1 break-words transition hover:text-zinc-900 dark:hover:text-white',
                      heading.level === 2
                        ? 'font-semibold text-zinc-900 dark:text-white'
                        : 'text-zinc-600 dark:text-zinc-400',
                    )}
                  >
                    {heading.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="mt-16 xl:hidden"></div>

      {/* Desktop view */}
      <div className="hidden xl:sticky xl:top-[3.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-3.5rem)] xl:flex-none xl:overflow-x-hidden xl:overflow-y-auto xl:py-16 xl:pr-6">
        <nav aria-labelledby="on-this-page-title" className="w-56">
          <h2
            id="on-this-page-title"
            className="text-sm font-semibold text-zinc-900 dark:text-white"
          >
            On this page
          </h2>
          <ul role="list" className="mt-4 space-y-2 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
              >
                <Link
                  href={`#${heading.id}`}
                  className={clsx(
                    'block py-1 break-words transition hover:text-zinc-900 dark:hover:text-white',
                    heading.level === 2
                      ? 'font-semibold text-zinc-900 dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-400',
                  )}
                >
                  {heading.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
