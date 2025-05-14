import { createFileRoute } from '@tanstack/react-router'
import {BaseLayout} from '../components/layout/BaseLayout.tsx';
import WorkspaceDetails from '../components/WorkspaceDetails';


export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BaseLayout>
    <WorkspaceDetails/>
  </BaseLayout>
}
