import { createFileRoute } from '@tanstack/react-router'
import {BaseLayout} from '../components/layout/BaseLayout.tsx';
import WorkspaceCard from '../components/WorkspaceCard';


export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BaseLayout>
    <WorkspaceCard
        name="Downtown Hub"
        address="123 Main Street, Downtown"
        description="Spacious workspace in the heart of the city. Spacious workspace in the heart of the city. Spacious workspace in the heart of the city."
        imageUrl="https://example.com/images/downtown.png"
        onViewDetails={() => alert('View details clicked')}
    />
  </BaseLayout>
}
