import type { LinkProps } from '@tanstack/react-router';
import { CatIcon, PencilRulerIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const NAV_ITEMS = [
  { icon: CatIcon, label: 'Pals', to: '/pals' },
  { icon: PencilRulerIcon, label: 'Items', to: '/items' },
] satisfies { to: LinkProps['to']; label: string; icon?: LucideIcon }[];
