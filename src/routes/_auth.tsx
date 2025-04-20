import {createFileRoute, redirect} from '@tanstack/react-router'
import {isAuthenticated} from "../util/client.ts";

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: ()=>{
    if(isAuthenticated()){
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  return <div>Hello "/__authenticated"!</div>
}
