import { Link } from '@tanstack/react-router';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants';

import { Logo } from './logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-card sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center gap-2" to="/">
              <Logo className="size-6 text-primary" />
              <span className="text-lg font-semibold">Palwiz</span>
            </Link>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                    key={label}
                    to={to}
                    activeOptions={{ includeSearch: false }}
                  >
                    {Icon && <Icon className="size-5" />}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <Button
              aria-expanded={mobileMenuOpen}
              className="text-muted-foreground"
              onClick={() => {
                setMobileMenuOpen((open) => !open);
              }}
              size="icon"
              type="button"
              variant="ghost"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? (
                <XIcon aria-hidden="true" className="size-6" />
              ) : (
                <MenuIcon aria-hidden="true" className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 py-3">
            {NAV_ITEMS.map(({ label, to }) => (
              <Link
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                key={label}
                to={to}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
