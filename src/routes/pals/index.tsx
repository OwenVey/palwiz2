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
            <div className="absolute top-2 left-2 ">
              <Badge className="gap-0 font-mono items-baseline h-fit font-normal" variant="outline">
                <span className="opacity-30">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                <span>{pal.zukanIndex}</span>
                <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
              </Badge>

              <div className="flex mt-2 flex-col gap-1">
                {pal.elementType1 && (
                  <img src={`/images/elements/${pal.elementType1}.png`} className="size-6" alt={pal.elementType1} />
                )}
                {pal.elementType2 && (
                  <img src={`/images/elements/${pal.elementType2}.png`} className="size-6" alt={pal.elementType2} />
                )}
              </div>
            </div>

            <div className="absolute top-2 right-2">
              {Object.entries(pal.workSuitabilities)
                .filter(([_, value]) => value > 0)
                .toSorted(([, value1], [, value2]) => value2 - value1)
                .map(([suitability, value]) => (
                  <div key={suitability} className="flex items-center gap-0.5">
                    <img src={`/images/work/${suitability}.png`} className="size-6" alt={suitability} />
                    <span className="text-xs font-mono">{value}</span>
                  </div>
                ))}
            </div>

            <img
              src={`/images/pals/${pal.id}.webp`}
              alt={pal.name}
              loading="lazy"
              className="mb-4 size-20 rounded-full object-cover"
            />

            <div className="font-medium">{pal.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
