import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import pals from '@/data/pals.json';

export const Route = createFileRoute('/pals/$palId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { palId } = Route.useParams();
  const pal = pals.find((entry) => entry.id === palId);

  if (!pal) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
        <nav className="flex items-center">
          <Link
            to="/pals"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Back to pals
          </Link>
        </nav>

        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-semibold">This pal could not be found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try going back to the collection and selecting another pal.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <nav className="flex items-center">
        <Link
          to="/pals"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to pals
        </Link>
      </nav>

      <Card>
        <CardContent className="p-8 sm:p-10">{pal.name}</CardContent>
      </Card>
    </div>
  );
}
