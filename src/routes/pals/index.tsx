import { createFileRoute, Link, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { Grid3x3Icon, SearchIcon, Table2Icon } from 'lucide-react';
import * as v from 'valibot';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/pals-table/columns';
import { Badge } from '@/components/ui/badge';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import pals from '@/data/pals.json';

const ViewSearchSchema = v.object({
  search: v.optional(v.fallback(v.string(), ''), ''),
  view: v.optional(v.fallback(v.picklist(['grid', 'table']), 'grid'), 'grid'),
});

const defaultSearchValues = { search: '', view: 'grid' } as const;

export const Route = createFileRoute('/pals/')({
  validateSearch: ViewSearchSchema,
  search: {
    middlewares: [retainSearchParams(['search', 'view']), stripSearchParams(defaultSearchValues)],
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { search, view } = Route.useSearch();
  const navigate = Route.useNavigate();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredPals = normalizedSearch
    ? pals.filter((pal) => pal.name.toLowerCase().includes(normalizedSearch))
    : pals;
  const palCount = normalizedSearch ? `${filteredPals.length}/${pals.length} pals` : `${pals.length} pals`;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
        <Field className="w-full sm:w-80">
          <FieldLabel className="sr-only" htmlFor="pal-search">
            Search pals by name
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="pal-search"
              autoFocus
              value={search}
              onChange={(event) => {
                const nextSearch = event.target.value;
                void navigate({
                  search: (previous) => ({ ...previous, search: nextSearch }),
                });
              }}
              placeholder="Search pals"
            />
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{palCount}</InputGroupAddon>
          </InputGroup>
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ToggleGroup
            value={[view]}
            onValueChange={([newView]) => {
              if (newView === 'grid' || newView === 'table') {
                void navigate({
                  search: (previous) => ({ ...previous, view: newView }),
                });
              }
            }}
            variant="outline"
            size="sm"
            aria-label="Choose a Pals view"
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Grid3x3Icon />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Grid View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ToggleGroupItem value="table" aria-label="Table view">
                    <Table2Icon />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Table View</TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>
      </div>

      {view === 'table' ? (
        <DataTable className="mt-4" columns={columns} data={filteredPals} />
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPals.map((pal) => (
            <Link
              key={pal.id}
              to="/pals/$palId"
              params={{ palId: pal.id }}
              className="relative grid place-items-center rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow hover:shadow-primary"
            >
              <div className="absolute top-2 left-2">
                <Badge className="block h-fit items-baseline gap-0 font-mono font-normal" variant="outline">
                  <span className="opacity-30">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                  <span>{pal.zukanIndex}</span>
                  <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
                </Badge>

                <div className="mt-2 flex flex-col gap-1">
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
                      <span className="font-mono text-xs">{value}</span>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col items-center gap-2 py-2">
                <img
                  src={`/images/pals/${pal.id}.webp`}
                  alt={pal.name}
                  loading="lazy"
                  className="size-24 rounded-full border bg-background object-cover"
                />

                <div className="font-medium">{pal.name}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
