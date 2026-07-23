import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import pals from '@/data/pals.json';
import type { Pal } from '@/types';

const columnHelper = createColumnHelper<Pal>();

type NumericPalKey =
  | 'foodAmount'
  | 'captureRateCorrect'
  | 'price'
  | 'hp'
  | 'defense'
  | 'meleeAttack'
  | 'shotAttack'
  | 'support'
  | 'walkSpeed'
  | 'runSpeed'
  | 'rideSprintSpeed'
  | 'stamina';

function getStatClass(value: number, max: number) {
  if (value === 0) {
    return 'text-muted-foreground/50';
  }

  const ratio = value / max;

  if (ratio >= 0.75) {
    return 'font-semibold text-emerald-600 dark:text-emerald-400';
  }

  if (ratio >= 0.5) {
    return 'font-medium text-amber-600 dark:text-amber-400';
  }

  return 'text-foreground';
}

function workSuitabilityColumn(key: keyof Pal['workSuitabilities'], title: string) {
  const max = Math.max(...pals.map((pal) => pal.workSuitabilities[key]));

  return columnHelper.accessor((pal) => pal.workSuitabilities[key], {
    id: key,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={<img src={`/images/work/${key}.png`} alt={title} title={title} className="size-6" />}
      />
    ),
    cell: (props) => {
      const value = props.getValue();
      const displayValue = value === 0 ? '—' : value;

      return <span className={`font-mono ${getStatClass(value, max)}`}>{displayValue}</span>;
    },
  });
}

function numericColumn(key: NumericPalKey, title: string) {
  const max = Math.max(...pals.map((pal) => pal[key]));

  return columnHelper.accessor(key, {
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: (props) => {
      const value = props.getValue();

      return <span className={`font-mono ${getStatClass(value, max)}`}>{value}</span>;
    },
  });
}

export const columns = [
  columnHelper.group({
    id: 'overview',
    header: 'Overview',
    columns: [
      columnHelper.accessor('zukanIndex', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
        cell: (props) => (
          <span className="font-mono">
            <span className="opacity-30">#</span>
            {props.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: (props) => (
          <div className="flex items-center gap-2">
            <img
              src={`/images/pals/${props.row.original.id}.webp`}
              alt={props.row.original.name}
              className="size-8 rounded-full border"
            />
            <span>{props.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor((row) => `${row.elementType1} ${row.elementType2 ?? ''}`.trim(), {
        id: 'element',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Element" />,
        cell: (props) => {
          const { elementType1, elementType2 } = props.row.original;

          return (
            <div
              className="flex items-center gap-2"
              title={`${elementType1}${elementType2 ? ` / ${elementType2}` : ''}`}
            >
              {elementType1 && (
                <img src={`/images/elements/${elementType1}.png`} alt={elementType1} className="size-6" />
              )}
              {elementType2 && (
                <img src={`/images/elements/${elementType2}.png`} alt={elementType2} className="size-6" />
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('rarity', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Rarity" />,
      }),
      columnHelper.accessor('size', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Size" />,
      }),
    ],
  }),
  columnHelper.group({
    id: 'work-suitability',
    header: 'Work Suitability',
    columns: [
      workSuitabilityColumn('kindling', 'Kindling'),
      workSuitabilityColumn('watering', 'Watering'),
      workSuitabilityColumn('planting', 'Planting'),
      workSuitabilityColumn('generatingElectricity', 'Electricity'),
      workSuitabilityColumn('handiwork', 'Handiwork'),
      workSuitabilityColumn('gathering', 'Gathering'),
      workSuitabilityColumn('lumbering', 'Lumbering'),
      workSuitabilityColumn('mining', 'Mining'),
      workSuitabilityColumn('medicineProduction', 'Medicine'),
      workSuitabilityColumn('cooling', 'Cooling'),
      workSuitabilityColumn('transporting', 'Transporting'),
      workSuitabilityColumn('farming', 'Farming'),
      workSuitabilityColumn('oilExtraction', 'Oil'),
    ],
  }),
  columnHelper.group({
    id: 'economy',
    header: 'Economy',
    columns: [
      numericColumn('foodAmount', 'Food'),
      numericColumn('captureRateCorrect', 'Capture Rate'),
      numericColumn('price', 'Sell Price'),
    ],
  }),
  columnHelper.group({
    id: 'combat',
    header: 'Combat',
    columns: [
      numericColumn('hp', 'HP'),
      numericColumn('defense', 'Defense'),
      numericColumn('meleeAttack', 'Melee'),
      numericColumn('shotAttack', 'Ranged'),
      numericColumn('support', 'Support'),
    ],
  }),
  columnHelper.group({
    id: 'mobility',
    header: 'Mobility',
    columns: [
      numericColumn('walkSpeed', 'Walk'),
      numericColumn('runSpeed', 'Run'),
      numericColumn('rideSprintSpeed', 'Ride Sprint'),
      numericColumn('stamina', 'Stamina'),
    ],
  }),
] satisfies ColumnDef<Pal>[];
