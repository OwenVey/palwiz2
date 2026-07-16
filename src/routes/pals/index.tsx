import { createFileRoute, Link } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import pals from '@/data/pals.json';

export const Route = createFileRoute('/pals/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <div>{pals.length} pals</div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pals.map((pal) => (
          <Link
            key={pal.id}
            to="/pals/$palId"
            params={{ palId: pal.id }}
            className="p-4 relative border rounded grid place-items-center bg-card"
          >
            <Badge className="absolute top-2 left-2 gap-0 font-mono items-baseline h-fit font-normal" variant="outline">
              <span className="opacity-30">#{'000'.slice(pal.ZukanIndex.toString().length)}</span>
              <span>{pal.ZukanIndex}</span>
              <span className="text-[10px]">{pal.ZukanIndexSuffix}</span>
            </Badge>

            <img
              src={`/images/pals/${pal.id}.webp`}
              alt={pal.name}
              loading="lazy"
              className="mb-4 size-20 rounded-full object-cover"
            />

            <div>{pal.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
