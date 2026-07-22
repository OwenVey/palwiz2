import { Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import { CatIcon, MenuIcon, PencilRulerIcon, XIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Logo } from './logo';

const navigationItems = [
  { icon: CatIcon, label: 'Pals', to: '/pals' },
  { icon: PencilRulerIcon, label: 'Items', to: '/items' },
] satisfies { to: LinkProps['to']; label: string; icon?: LucideIcon }[];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center gap-2" to="/">
              <Logo className="size-6 text-primary" />
              <span className="text-lg font-semibold">Palwiz</span>
            </Link>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationItems.map(({ label, to, icon: Icon }) => (
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                    key={label}
                    to={to}
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
              onClick={() => setMobileMenuOpen((open) => !open)}
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
            {navigationItems.map(({ label, to }) => (
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

export default Navbar;
