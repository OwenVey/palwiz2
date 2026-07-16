import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pals/$palId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { palId } = Route.useParams();
  return <div>Hello {palId}!</div>;
}
