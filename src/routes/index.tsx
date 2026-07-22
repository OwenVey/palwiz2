import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

import { NAV_ITEMS } from '@/constants';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-medium text-primary">Palwiz</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your Palworld companion</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explore pals and items to plan your next adventure.</p>
      </div>

      <nav aria-label="Explore Palwiz" className="mt-10 grid gap-4 sm:grid-cols-2">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
          <Link
            className="group flex min-h-44 flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:-translate-y-px hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            key={label}
            to={to}
          >
            {Icon ? (
              <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon aria-hidden="true" className="size-6" />
              </span>
            ) : null}
            <span className="mt-auto flex items-center justify-between gap-4 pt-6">
              <span className="text-xl font-semibold">{label}</span>
              <ArrowRightIcon
                aria-hidden="true"
                className="size-5 text-muted-foreground transition-transform group-hover:translate-x-px group-hover:text-primary"
              />
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
