'use client'

import { useState } from 'react'

interface EventsFilterProps {
  categories: string[]
}

export function EventsFilter({ categories }: EventsFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
      <button
        onClick={() => setActiveFilter('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeFilter === 'all'
            ? 'bg-mocha-brown text-white'
            : 'bg-warm-beige/50 dark:bg-dark-warm-beige/50 text-soft-brown dark:text-warm-beige hover:bg-mocha-brown/10'
        }`}
      >
        All Events
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
            activeFilter === category
              ? 'bg-mocha-brown text-white'
              : 'bg-warm-beige/50 dark:bg-dark-warm-beige/50 text-soft-brown dark:text-warm-beige hover:bg-mocha-brown/10'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
