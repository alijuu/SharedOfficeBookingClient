import { createFileRoute } from '@tanstack/react-router'
import {BaseLayout} from '../components/layout/BaseLayout.tsx';
import DeskDetails from "../components/DeskDetails/DeskDetails.tsx";


export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BaseLayout>
    <DeskDetails/>
  </BaseLayout>
}
