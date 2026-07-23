import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { Pal } from '@/types';

const columnHelper = createColumnHelper<Pal>();

function workSuitabilityColumn(key: keyof Pal['workSuitabilities'], title: string) {
  return columnHelper.accessor((pal) => pal.workSuitabilities[key], {
    id: key,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={<img src={`/images/work/${key}.png`} alt={title} title={title} className="size-6" />}
      />
    ),
    cell: (props) => <span className="font-mono">{props.getValue()}</span>,
  });
}

export const columns = [
  columnHelper.group({
    id: 'overview',
    header: 'Overview',
    columns: [
      columnHelper.accessor('zukanIndex', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
        cell: (props) => <span className="font-mono">#{props.getValue()}</span>,
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
      columnHelper.accessor('foodAmount', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Food" />,
      }),
      columnHelper.accessor('captureRateCorrect', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Capture Rate" />,
      }),
      columnHelper.accessor('price', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sell Price" />,
      }),
    ],
  }),
  columnHelper.group({
    id: 'combat',
    header: 'Combat',
    columns: [
      columnHelper.accessor('hp', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="HP" />,
      }),
      columnHelper.accessor('defense', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Defense" />,
      }),
      columnHelper.accessor('meleeAttack', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Melee" />,
      }),
      columnHelper.accessor('shotAttack', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ranged" />,
      }),
      columnHelper.accessor('support', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Support" />,
      }),
    ],
  }),
  columnHelper.group({
    id: 'mobility',
    header: 'Mobility',
    columns: [
      columnHelper.accessor('walkSpeed', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Walk" />,
      }),
      columnHelper.accessor('runSpeed', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Run" />,
      }),
      columnHelper.accessor('rideSprintSpeed', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ride Sprint" />,
      }),
      columnHelper.accessor('stamina', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stamina" />,
      }),
    ],
  }),
] satisfies ColumnDef<Pal>[];
