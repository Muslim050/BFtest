import type {PropsWithChildren} from "react";


export default function  DashboardLayout({children}: PropsWithChildren<unknown>) {
  return (
    <div>
      <h1>DashboardLayout</h1>
      {children}
    </div>
  )
}