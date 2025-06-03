import { createFileRoute } from '@tanstack/react-router'
//import {BaseLayout} from '../components/layout/BaseLayout.tsx';


import HomePage from "../components/HomePage.tsx";
import HomeLayout from "../components/layout/HomeLayout.tsx";


export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomeLayout>
   <HomePage/>

  </HomeLayout>
}
